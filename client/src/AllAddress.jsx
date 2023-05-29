export default function AllAddress({ list }) {
  return (
    <div className="container all-address">
      <div>All address list</div>
      <div style={{ marginTop: 20 }}>
        {!list.length && <div style={{ fontWeight: "bold" }}>Empty</div>}
        <div style={{ display: "flex", flexWrap: 'wrap' }}>
          {list.map((i) => (
            <div key={i.address} className="address-item">
              <div>
                <span className="item-left">Address name:</span>
                <span className="item-right">{i.addressName}</span>
              </div>
              <div>
                <span className="item-left">Address:</span>
                <span className="item-right">{i.address}</span>
              </div>
              <div>
                <span className="item-left">Balance:</span>
                <span className="item-right">{i.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
