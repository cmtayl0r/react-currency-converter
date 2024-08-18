function CurrencyConverter() {
  return (
    <div className="controls">
      <div className="control">
        <button id="base" data-drawer>
          USD
        </button>
        <input type="number" id="base-input" value="0" min="0" step="0.01" />
      </div>
      <div className="control">
        <button id="target" data-drawer>
          EUR
        </button>
        <input type="number" id="target-input" value="0" readonly />
      </div>
      <button className="swap-btn" id="swap-btn">
        <span className="material-symbols-outlined"> sync_alt </span>
      </button>
    </div>
  );
}

export default CurrencyConverter;
