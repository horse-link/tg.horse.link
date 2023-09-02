const TOKEN = process.env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TOKEN);

bot.on("message", msg => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
