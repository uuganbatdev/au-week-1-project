import { useState } from "react";

function GenerateWallet({
  amount,
  setAmount,
  generate,
  addressName,
  setAddressName,
}) {
  return (
    <form className="container wallet" onSubmit={generate}>
      <h1>Generate wallet</h1>
      <label>
        Address name
        <input
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
        ></input>
      </label>
      <label>
        Balance amount
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
      </label>
      <input type="submit" className="button" value="Generate" />

      {/* <div className="balance">Balance: {balance}</div> */}
    </form>
  );
}

export default GenerateWallet;
