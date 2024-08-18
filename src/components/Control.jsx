function Control({ onClick, dataFocus }) {
  return (
    <div className="control">
      <button onClick={onClick}>{dataFocus}</button>
      <input type="number" id="base-input" value="0" min="0" step="0.01" />
    </div>
  );
}

/*
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
*/

export default Control;
