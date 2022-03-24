import { BotContext } from "../bot";
import AbstractCommand from "./AbstractCommand";

export default class StartCommand implements AbstractCommand {
  async execute(ctx: BotContext): Promise<void> {
    if (ctx.chat?.type !== "private") {
      ctx.reply(`Бот может использоваться только в личных сообщениях.`);
    } else {
      let msg = await ctx.reply(`Hello ${ctx.from?.username}`);
      let session = await ctx.session;
      let _used = session.isActive;
      if (_used) {
        msg.editText(`@${ctx.chat.username}, Вы уже ранее использовали бота.`);
      } else {
        ctx.session.isActive = true;
        ctx.reply(`Пользователь зарегистрирован`);
      }
    }
  }
}
