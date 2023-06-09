import GenerateWallet from "./GenerateWallet";
import Transfer from "./Transfer";
import AllAddress from "./AllAddress";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [addressName, setAddressName] = useState("");
  const [generatedWallet, setGeneratedWallet] = useState({
    publicKey: "",
    privateKey: "",
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const {
      data: { balances },
    } = await server.get("balanceAll");
    let formatedList = [];
    for (let i in balances) {
      const { addressName, balance } = balances[i];
      formatedList.push({
        address: i,
        balance,
        addressName: addressName || "Anonymous",
      });
    }
    setList(formatedList);
  }

  async function generate(evt) {
    evt.preventDefault();

    try {
      const {
        data: { privateKey, publicKey },
      } = await server.post(`generateAddress`, {
        amount: parseInt(amount),
        addressName,
      });
      getList();
      setGeneratedWallet({ publicKey, privateKey });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <div className="app">
      <GenerateWallet
        amount={amount}
        setAmount={setAmount}
        addressName={addressName}
        setAddressName={setAddressName}
        generate={generate}
        generatedWallet={generatedWallet}
      />
      <Transfer getList={getList}  />
      <AllAddress list={list} />
    </div>
  );
}

export default App;
