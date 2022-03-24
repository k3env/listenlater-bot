import { Context } from "grammy";
import AbstractAction from "./AbstractAction";

export default class TextAction implements AbstractAction {
  execute(ctx: Context): void {
    console.log(`${ctx.from?.username} - ${ctx.message?.text}`);
  }
}
