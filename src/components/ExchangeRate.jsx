function ExchangeRate({ base, target, rates }) {
  const rate = rates[base]?.[target]?.toFixed(4) || "Loading...";

  return (
    <div className="exchange-rate">
      <h5>Exchange Rate</h5>
      <span id="exchange-rate">
        1 {base} = {rate} {target}
      </span>
    </div>
  );
}

export default ExchangeRate;
