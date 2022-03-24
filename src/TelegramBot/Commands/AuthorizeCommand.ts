import { InlineKeyboard } from "grammy";
import Prando from "prando";
import { BotContext } from "./../bot";
import AbstractCommand from "./AbstractCommand";

export class AutorizeCommand implements AbstractCommand {
  private url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }
  async execute(ctx: BotContext): Promise<void> {
    const generator: Prando = new Prando("some-secret-id");
    let session = ctx.session;
    // if (session.state === undefined) {
    try {
      session.state = generator.nextString(16);

      const url = `${this.url}/login?state\\=${session.state}`;
      const fakeurl = `https://botpad.k3env.site:443/login?state\=${session.state}`;
      // const kb = new InlineKeyboard().url("Login", url);
      // ctx.reply("Click button for login", { reply_markup: kb });
      ctx.reply(`Follow these link: [authorize](${fakeurl})`, {
        parse_mode: "Markdown",
      });
    } catch (error) {
      session.state = undefined;
    }
    // } else {
    //   ctx.reply("You already authorized");
    // }
  }
}
