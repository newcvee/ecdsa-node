const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04502690ce3c909e9ddbf5f65a072f80c6d5b0c79f3d68b60dfb7440e6f3ed8d149a66f7ab114dc7a654aaa84e36b8eef86fa74d19ac825ef3697efc872f8259c0": 100,
  "0462b17f1b96d581f2855e3680777388a448fdf147a4cbda6c991dc538f64129ae4a27916a5ee0736316916eca73d1467beb12da9607b5177203f7e6c60f468a8b": 50,
  "04de4ff442f05d63180d0c1a1f62651cf374674bca91488e2cd89339866b7ace050ecdd7001f9e9a388707c300c28d218877f7f22e00b545606961f41d4aece681": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
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
