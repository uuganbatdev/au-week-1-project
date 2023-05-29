import { useEffect, useState } from "react";
import server from "./server";

export default function AllAddress() {
  const [list, setList] = useState([]);

  async function getList() {
    const {
      data: { balances },
    } = await server.get("balanceAll");
    let formatedList = [];
    for (let i in balances) {
      const { addressDomainName, balance } = balances[i];
      formatedList.push({
        address: i,
        balance,
        addressDomainName: addressDomainName || "Anonymous",
      });
    }
    setList(formatedList);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container all-address">
      <div>All address list</div>
      <div style={{ marginTop: 20 }}>
        {!list.length && <div style={{ fontWeight: "bold" }}>Empty</div>}
        <div style={{ display: "flex" }}>
          {list.map((i) => (
            <div key={i.address} className="address-item">
              <div>
                <span>Domain name:</span>
                <span className='item-right'>{i.addressDomainName}</span>
              </div>
              <div>
                <span>Address:</span>
                <span className='item-right'>{i.address}</span>
              </div>
              <div>
                <span>Balance:</span>
                <span className='item-right'>{i.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
