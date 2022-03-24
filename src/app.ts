import { Config } from "./Config";
import { MongoClient } from "mongodb";
import { MongoDS } from "./Datasources/Datasource";
import { App } from "./TelegramBot/bot";
import { Web } from "./Web/web";

type Command = "help" | "bot" | "web" | "all";

let args = process.argv.slice(2);
const cmd: Command = args.length === 0 ? "help" : (args[0] as Command);
args = args.slice(1);

let conf = Config.load("../config.json");

const ds: MongoDS = new MongoDS(
  conf.mongo.user,
  conf.mongo.password,
  conf.mongo.proto,
  conf.mongo.address,
  conf.mongo.db,
  conf.mongo.params
);

const dsClient: MongoClient = new MongoClient(ds.uri);
dsClient.connect();
const db = dsClient.db(ds.db);

const clientId = conf.spotify.clientId;
const clientSecret = conf.spotify.clientSecret;

switch (cmd) {
  case "bot":
    App.start(db, conf.app.baseUrl);
    break;
  case "web":
    Web.start(conf.app.port, db, clientId, clientSecret);
    break;
  case "all":
    App.start(db, conf.app.baseUrl);
    Web.start(conf.app.port, db, clientId, clientSecret);
    break;
  case "help":
    console.log(`
Usage:
  bot         - for bot runner
  web <port>  - for web server`);
    break;
}

function stop(s: NodeJS.Signals) {
  switch (cmd) {
    case "bot":
      App.stop(s);
      break;
    case "web":
      Web.stop();
      break;
    case "all":
      App.stop(s);
      Web.stop();
      break;
  }
  dsClient.close();
}

process.once("SIGINT", stop);
process.once("SIGTERM", stop);
