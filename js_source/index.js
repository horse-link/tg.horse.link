/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

require("dotenv").config();

const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const TOKEN = process.env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";
const url = "https://008a-203-12-0-167.ngrok-free.app";
const port = process.env.PORT || 3002;

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);
const { ethers } = require("ethers");

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

app.post("/test", (req, res) => {

  // console.log(req.body);
  const { message } = req.body;
  const { text, from } = message;

  process_message(text, from).then(response => {
    res.send(response);
    res.end();
  });
});

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  console.log(req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on("message", msg => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

  let response = "I am alive!";

  if (msg.message) {
    if (msg.message?.text === "/balance") {

      const token = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
      const erc20 = new ethers.Contract(token, abi, provider);
      const account = "cullen.eth";

      let response = erc20.balanceOf(account).then(balance => {
        return `Your balance is ${balance.toString()}`;
      });
    }
  }

  console.log(msg);
  bot.sendMessage(response);
});

const process_message = (text, from) => {

  let response = "I am alive!";
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

  if (text === "/balance") {

    const token = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
    const erc20 = new ethers.Contract(token, abi, provider);
    const account = "0xb93F6D1ea9EB588B559155601Ef969d264277B43";

    response = erc20.balanceOf(account).then(balance => {
      console.log(balance);
      return `Your balance is ${balance.toString()}`;
    });
  }

  return response;
};
