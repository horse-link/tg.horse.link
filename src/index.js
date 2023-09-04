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

const market_abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes16",
            name: "nonce",
            type: "bytes16"
          },
          {
            internalType: "bytes16",
            name: "propositionId",
            type: "bytes16"
          },
          {
            internalType: "bytes16",
            name: "marketId",
            type: "bytes16"
          },
          {
            internalType: "uint256",
            name: "wager",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "odds",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "close",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "end",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8"
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
              }
            ],
            internalType: "struct SignatureLib.Signature",
            name: "signature",
            type: "tuple"
          }
        ],
        internalType: "struct IMarket.Back",
        name: "backData",
        type: "tuple"
      }
    ],
    name: "back",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64"
      }
    ],
    name: "getBetByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "bytes16",
        name: "",
        type: "bytes16"
      },
      {
        internalType: "bytes16",
        name: "",
        type: "bytes16"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getInPlayCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getMargin",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wager",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "odds",
        type: "uint256"
      },
      {
        internalType: "bytes16",
        name: "propositionId",
        type: "bytes16"
      },
      {
        internalType: "bytes16",
        name: "marketId",
        type: "bytes16"
      }
    ],
    name: "getOdds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getOracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes16",
        name: "propositionId",
        type: "bytes16"
      },
      {
        internalType: "bytes16",
        name: "marketId",
        type: "bytes16"
      },
      {
        internalType: "uint256",
        name: "wager",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "odds",
        type: "uint256"
      }
    ],
    name: "getPotentialPayout",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalExposure",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalInPlay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getVaultAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64"
      }
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64"
      }
    ],
    name: "settle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes16",
        name: "marketId",
        type: "bytes16"
      }
    ],
    name: "settleMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const TOKEN = process.env.TELEGRAM_TOKEN;
const url = process.env.ENDPOINT || "https://tg.horse.link";
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

app.get("/", (req, res) => {
  res.send("Checkout alpha.horse.link for web3 wagering!");
});

app.post("/test", (req, res) => {
  const { message } = req.body;
  const { text, from, params } = message;
  const args = params.split(" ");

  process_message(text, args, from).then(response => {
    res.send(response);
  });
});

app.post("/test2", async (req, res) => {
  const { message } = req.body;
  const { text, from, params } = message;
  const args = params.split(" ");

  const response = await process_message(text, args, from);
  res.send(response);
});

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

bot.on("message", msg => {
  console.log("Bot has this message: ", msg);

  let response_message = "Run it up!";

  if (msg && msg.text?.startsWith("/")) {
    let args = msg.text.split(" ");
    const command = args[0];
    const from = msg.from.id;

    args.shift();

    response_message = process_message(command.toLowerCase(), args, from).then(
      response => {
        return response;
      }
    );

    response_message.then(response => {
      console.log(response);
      bot.sendMessage(msg.chat.id, response);
    });
  }
});

const process_message = async (command, params, from) => {
  try {
    console.log("Processing command: ", command);
    const r = /\d+/;

    let response_message = "Run it up!";

    console.log("Provider: ", process.env.RPC_URL);
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = ethers.Wallet.fromMnemonic(
      process.env.MNEMONIC,
      `m/44'/60'/0'/0/${from}`
    );

    if (command === "/help") {
      let response = "Commands: \n";
      response += "/allow - Set your allowance for the market \n";
      response += "/allowance - Get your allowance for the market \n";
      response += "/address - Get your address \n";
      response += "/back - Back a horse \n";
      response += "/balance - Get your balance \n";
      response += "/history - Get your betting history \n";
      response += "/odds - Get odds for a horse \n";
      response += "/races - Get todays races \n";
      response += "/runners - Get the runners for a race \n";
      response += "/transfer - Transfer tokens \n";

      return response;
    }

    if (command === "/address" || command === "/account") {
      return signer.address;
    }

    if (command === "/allow") {
      // TODO: Call market and get the underlying token
      const market = "0x47563a2fA82200c0f652fd4688c71f10a2c8DAF3";
      const token = process.env.TOKEN || "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

      const _signer = new ethers.Wallet(signer.privateKey, provider);
      const erc20 = new ethers.Contract(token, abi, _signer);
      const amount = ethers.utils.parseUnits(params[0], 6);

      const tx = await erc20.allow(market, amount);

      return `Done! The transaction hash is ${tx.hash}`;
    }

    if (command === "/allowance") {
      // TODO: Call market and get the underlying token
      const market = "0x47563a2fA82200c0f652fd4688c71f10a2c8DAF3";
      const token = process.env.TOKEN || "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
      const erc20 = new ethers.Contract(token, abi, provider);

      const symbol = await erc20.symbol();

      const allowance = await erc20.allowance(signer.address, market);
      const formatted_allowance = ethers.utils.formatUnits(allowance, 6);

      return `Your allowance is ${formatted_allowance.toString()} ${symbol}`;
    }

    if (command === "/balance") {
      const token = process.env.TOKEN || "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
      const erc20 = new ethers.Contract(token, abi, provider);

      const symbol = await erc20.symbol();

      const balance = await erc20.balanceOf(signer.address);
      const formatted_balance = ethers.utils.formatUnits(balance, 6);

      return `Your balance is ${formatted_balance.toString()} ${symbol}`;
    }

    if (command === "/meets" || command === "/races") {
      const result = await axios.get(
        `https://alpha.horse.link/api/runners/meetings`
      );

      let response = "";
      const meetings = result.data.data.meetings;

      for (let i = 0; i < meetings.length; i++) {
        response += `${meetings[i].location} ${runners[i].name} \n`;
      };

      return response;
    }

    if (command === "/odds") {
      const venue = params[0];

      // Get only number from params[1] using regex
      const race = Number(params[1].match(r)[0]);
      const horse = Number(params[2].match(r)[0]);

      const result = await axios.get(
        `https://alpha.horse.link/api/runners/${venue}/${race}/win`
      );

      const runner = result.data.data.runners.filter(
        r => r.number === horse
      )[0];

      return `The odds for ${runner.name} are ${runner.odds}`;
    }

    if (command === "/runners") {
      const venue = params[0];

      // Get only number from params[1] using regex
      const race = Number(params[1].match(r)[0]);

      const result = await axios.get(
        `https://alpha.horse.link/api/runners/${venue}/${race}/win`
      );

      let response = "";
      const runners = result.data.data.runners;

      for (let i = 0; i < runners.length; i++) {
        response += `${runners[i].number} ${runners[i].name} ${runners[i].odds} \n`;
      };

      return response;
    }

    if (command === "/history") {
      const result = await axios.get(
        "https://alpha.horse.link/api/bets/history?filter=ALL_BETS"
      );

      const bets = result.data?.data?.bets.filter(
        b => b.account === signer.address
      );

      if (bets?.length > 0) {
        const last_bet = bets[bets.length - 1];
        return "Your last bet was";
      }

      return "No previous bets found.";
    }

    if (command === "/back" || command === "/bet") {
      if (params.length < 4) {
        return "Please provide all parameters Race Horse Wager";
      }

      const venue = params[0];

      const race = Number(params[1].match(r)[0]);
      const horse = Number(params[2].match(r)[0]);
      const wager = Number(params[3].match(r)[0]);
      const wager_bigint = ethers.utils.parseUnits(wager.toString(), 6);

      const result = await axios.get(
        `https://alpha.horse.link/api/runners/${venue}/${race}/win`
      );

      const runner = result.data.data.runners.filter(
        r => r.number === horse
      )[0];
      console.log(runner);

      const market = "0x47563a2fA82200c0f652fd4688c71f10a2c8DAF3";

      const _signer = new ethers.Wallet(signer.privateKey, provider);
      const contract = new ethers.Contract(market, market_abi, _signer);

      const tx = await contract.back({
        nonce: runner.nonce,
        propositionId: formatBytes16String(runner.proposition_id),
        marketId: formatBytes16String(runner.market_id),
        wager: wager_bigint,
        odds: ethers.utils.parseUnits(runner.odds.toString(), 6),
        close: runner.close,
        end: runner.end,
        signature: {
          v: 27,
          r: runner.signature.r,
          s: runner.signature.s
        }
      });

      console.log(tx);
      response_message = `You backed ${runner.name} with ${wager_bigint} ${tx}!`;
    }

    if (command === "/transfer" || command === "/send" || command === "/withdraw") {
      if (params.length < 2) {
        return "Please provide all parameters Amount Recipient";
      }

      const token = process.env.TOKEN || "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
      
      const _signer = new ethers.Wallet(signer.privateKey, provider);
      const erc20 = new ethers.Contract(token, abi, _signer);
      const amount = ethers.utils.parseUnits(params[0], 6);

      const balance = await erc20.balanceOf(signer.address);
      if (balance.lt(amount)) {
        return "You don't have enough tokens to send that amount.";
      };

      const to = params[1];
      const tx = await erc20.transfer(to, amount);
      return `Done! The transaction hash is ${tx.hash}`;
    };

    if (command === "/key" || command === "/privatekey") {
      return "Ill DM the private key"; // signer.privateKey;
    };

    console.log(response_message);
    return response_message;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const get_balance = () => {
//   const token = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
//   const erc20 = new ethers.Contract(token, abi, provider);
//   const account = "0xb93F6D1ea9EB588B559155601Ef969d264277B43";

//   response_message = erc20.balanceOf(account).then(balance => {
//     console.log(balance);
//     return `Your balance is ${balance.toString()}`;
//   });
// };

// const process_message = (command, params, from) => {

//   let response_message = "I am alive!";
//   const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
//   const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

//   console.log(signer.address)

//   if (command === "/balance") {

//     const token = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
//     const erc20 = new ethers.Contract(token, abi, provider);
//     const account = "0xb93F6D1ea9EB588B559155601Ef969d264277B43";

//     response_message = erc20.balanceOf(account).then(balance => {
//       console.log(balance);
//       return `Your balance is ${balance.toString()}`;
//     });
//   }

//   if (command === "/odds") {
//     // fetch odds from api with axios

//     const venue = params[0];
//     const race = params[1].substring(1);
//     const horse = Number(params[2].substring(1));

//     response_message = axios.get(`https://alpha.horse.link/api/runners/${venue}/${race}/win`).then(response => {
//       // console.log(response.data.data.runners);
//       console.log(response.data.data.runners[horse - 1]);
//       return response.data.data.runners[horse - 1];
//     });

//     response_message = response_message.then(response => {
//       const odds = response.odds;
//       return `The odds for ${response.name} are ${odds}`;
//     });
//   };

//   if (command === "/back") {
//     // fetch odds from api with axios

//     const venue = params[0];
//     const race = params[1].substring(1);
//     const horse = Number(params[2].substring(1));

//     response_message = axios.get(`https://alpha.horse.link/api/runners/${venue}/${race}/win`).then(response => {
//       // console.log(response.data.data.runners);
//       console.log(response.data.data.runners[horse - 1]);
//       return response.data.data.runners[horse - 1];
//     });
//   };

//   console.log(response_message);

//   return response_message;
// };

const formatBytes16String = text => {
  const bytes = toUtf8Bytes(text);

  console.log(bytes.length);

  // Check we have room for null-termination
  if (bytes.length > 15) {
    throw new Error("bytes16 string must be less than 16 bytes");
  }

  // Zero-pad (implicitly null-terminates)
  return ethers.utils.hexlify(
    ethers.utils.concat([bytes, ethers.constants.HashZero]).slice(0, 16)
  );
};

const toUtf8Bytes = str => {
  let utf8 = [];
  for (let i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return utf8;
};
