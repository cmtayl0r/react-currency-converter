import Control from "./Control";

function CurrencyConverter({ onClick, base, target }) {
  return (
    <div className="controls">
      {/* Base */}
      <Control onClick={onClick} dataFocus={base} />
      {/* Target */}
      <Control onClick={onClick} dataFocus={target} />
      {/* Swap button */}
      <button className="swap-btn" id="swap-btn">
        <span className="material-symbols-outlined"> sync_alt </span>
      </button>
    </div>
  );
}

export default CurrencyConverter;
