import { Api, Bot, Context, FilterQuery, session, SessionFlavor } from "grammy";
import AbstractAction from "./Actions/AbstractAction";
import AbstractCommand from "./Commands/AbstractCommand";

import * as Commands from "./Commands";
import * as Actions from "./Actions";

import {
  hydrateApi,
  HydrateApiFlavor,
  hydrateContext,
  HydrateFlavor,
} from "@grammyjs/hydrate";
import { MongoDBAdapter, ISession } from "@satont/grammy-mongodb-storage";
import { Db } from "mongodb";
import SessionData from "../Datasources/SessionData";

export type BotContext = HydrateFlavor<Context> & SessionFlavor<SessionData>;
export type BotApi = HydrateApiFlavor<Api>;

export class ListenLaterBot {
  private _telegram: Bot<BotContext, BotApi>;
  private _log: (data: any) => void;

  constructor(token: string, ds: Db, log: (message: any) => void = (m) => {}) {
    this._log = log;
    this._telegram = new Bot(token, {
      client: {
        canUseWebhookReply: (m) => m === "sendChatAction",
      },
    });
    const sessions = ds.collection<ISession>("users");

    //create storage

    this._telegram.use(hydrateContext());
    this._telegram.api.config.use(hydrateApi());
    this._telegram.use(
      session({
        initial: SessionData.initial,
        storage: new MongoDBAdapter({ collection: sessions }),
      })
    );
  }
  registerCommand(command: string, action: AbstractCommand) {
    this._telegram.command(command, (ctx) => action.execute(ctx));
  }

  registerAction(event: FilterQuery, action: AbstractAction) {
    this._telegram.on(event, (ctx) => action.execute(ctx));
  }

  registerWebhook() {}

  public get bot(): Bot<BotContext, BotApi> {
    return this._telegram;
  }

  stop(signal: string) {
    this._log(signal);
    this._telegram.stop();
  }
  run() {
    this._telegram.start().then(() => this._log("Bot started"));
  }
}

export class App {
  private static bot: ListenLaterBot;
  static start(db: Db, baseUrl: string): void {
    App.bot = new ListenLaterBot(
      process.env.TG_TOKEN as string,
      db,
      console.log
    );

    App.bot.registerCommand("start", new Commands.StartCommand());
    App.bot.registerCommand("help", new Commands.HelpCommand());
    App.bot.registerCommand("authorize", new Commands.AutorizeCommand(baseUrl));
    App.bot.registerAction(":dice", new Actions.DiceAction());
    App.bot.registerAction("message:text", new Actions.TextAction());

    App.bot.run(); // Start bot
  }
  static stop(signal: NodeJS.Signals) {
    App.bot.stop(signal);
  }
}
