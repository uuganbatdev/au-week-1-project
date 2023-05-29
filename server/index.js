const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

let addressCounter = 0;
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
  const generatedAddress = `0x${addressCounter}`;
  addressCounter++;
  balances[generatedAddress] = { balance: amount, addressName };

  res.send({ newAddress: balances[generatedAddress] });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
