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
const axios = require("axios");

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

app.post("/test", (req, res) => {

  // console.log(req.body);
  const { message } = req.body;
  const { text, from, params } = message;
  const args = params.split(" ");

  process_message(text, args, from).then(response => {
    res.send(response);
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

const process_message = (command, params, from) => {

  let response_message = "I am alive!";
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

  if (command === "/balance") {

    const token = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
    const erc20 = new ethers.Contract(token, abi, provider);
    const account = "0xb93F6D1ea9EB588B559155601Ef969d264277B43";

    response_message = erc20.balanceOf(account).then(balance => {
      console.log(balance);
      return `Your balance is ${balance.toString()}`;
    });
  }

  if (command === "/odds") {
    // fetch odds from api with axios

    const venue = params[0];
    const race = params[1].substring(1);
    const horse = Number(params[2].substring(1));

    response_message = axios.get(`https://alpha.horse.link/api/runners/${venue}/${race}/win`).then(response => {
      // console.log(response.data.data.runners);
      console.log(response.data.data.runners[horse - 1]);
      return response.data.data.runners[horse - 1];
    });

    response_message = response_message.then(response => {
      const odds = response.odds;
      return `The odds for ${response.name} are ${odds}`;
    });
  };

  if (command === "/back") {
    // fetch odds from api with axios

    const venue = params[0];
    const race = params[1].substring(1);
    const horse = Number(params[2].substring(1));

    response_message = axios.get(`https://alpha.horse.link/api/runners/${venue}/${race}/win`).then(response => {
      // console.log(response.data.data.runners);
      console.log(response.data.data.runners[horse - 1]);
      return response.data.data.runners[horse - 1];
    });
  };

  console.log(response_message);

  return response_message;
};
