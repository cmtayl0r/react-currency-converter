function CurrencyConverter({
  base,
  target,
  baseValue,
  rates,
  setBaseValue,
  handleDrawerToggle,
  handleCurrencySwap,
}) {
  const handleInputChange = e => {
    // Update the base value
    // If the input is empty, set the value to 1
    // Otherwise, parse the input value to a float number
    // and set it as the new base value
    setBaseValue(parseFloat(e.target.value) || 1);
  };
  return (
    <div className="controls">
      {/* Base */}
      <div className="control">
        <button onClick={() => handleDrawerToggle("base")}>{base}</button>
        <input
          type="number"
          id="base-input"
          value={baseValue}
          onChange={handleInputChange}
          min="0"
          step="0.01"
        />
      </div>
      {/* Target */}
      <div className="control">
        <button onClick={() => handleDrawerToggle("target")}>{target}</button>
        <input
          type="number"
          id="target-input"
          // Calculate the target value by multiplying the base value
          // with the exchange rate between the base and target currencies
          // and round the result to 4 decimal places
          // base value times exchange rate = target value (base * rate = target)
          value={(baseValue * (rates[base]?.[target] || 1)).toFixed(4)}
          readOnly
        />
      </div>
      {/* Swap button */}
      <button className="swap-btn" id="swap-btn" onClick={handleCurrencySwap}>
        <span className="material-symbols-outlined"> sync_alt </span>
      </button>
      {/* {loading && <div className="skeleton">Loading...</div>} */}
    </div>
  );
}

export default CurrencyConverter;
