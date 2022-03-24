import { Context } from "grammy";
export default abstract class AbstractCommand {
  abstract execute(ctx: Context): void;
}
