import { Context } from "grammy";
import AbstractCommand from "./AbstractCommand";

export default class HelpCommand implements AbstractCommand {
  execute(ctx: Context): void {
    console.log(ctx.message);
  }
}
