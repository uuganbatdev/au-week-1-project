const express = require("express");
const app = express();
const cors = require("cors");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/balanceAll", (req, res) => {
  res.send({ balances });
});

app.post("/generateAddress", (req, res) => {
  const { amount, addressName } = req.body;
  const { privateKey, publicKey } = generateAddress({ amount, addressName });

  res.send({ privateKey, publicKey });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender].balance < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender].balance -= amount;
    balances[recipient].balance += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = { balance: 0, addressName: "" };
  }
}

function generateAddress({ amount, addressName }) {
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey);
  const hexPublic = toHex(publicKey);
  const hexPrivate = toHex(privateKey);
  balances[hexPublic] = { balance: amount || 0, addressName };

  return { privateKey: hexPrivate, publicKey: hexPublic };
}
