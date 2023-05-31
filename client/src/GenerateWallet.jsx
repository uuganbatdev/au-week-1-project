function GenerateWallet({
  amount,
  setAmount,
  generate,
  addressName,
  setAddressName,
  generatedWallet,
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
      {generatedWallet.privateKey && generatedWallet.publicKey && (
        <div style={{ marginTop: 20 }}>
          <div>Your private key: (save!)</div>
          <div className="item-right" style={{ width: 400 }}>
            {generatedWallet.privateKey} 
          </div>
          <div>Your public key:</div>
          <div className="item-right" style={{ width: 400 }}>
            <div>{generatedWallet.publicKey}</div>
          </div>
        </div>
      )}
      {/* <div className="balance">Balance: {balance}</div> */}
    </form>
  );
}

export default GenerateWallet;
