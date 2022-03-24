import { Context } from "grammy";
import AbstractAction from "./AbstractAction";

export default class DiceAction implements AbstractAction {
  execute(ctx: Context): void {
    console.log(`${ctx.from?.username} diced - ${ctx.message?.dice?.value}`);
  }
}
