import { Context } from "grammy";
export default abstract class AbstractAction {
  abstract execute(ctx: Context): void;
}
