function Drawer({ onCloseDrawer }) {
  return (
    <div id="drawer" className="drawer show">
      <div className="title">
        <button id="dismiss-btn" onClick={onCloseDrawer}>
          <span className="material-symbols-outlined"> west </span>
        </button>
        <h3>Select Currency</h3>
        <span></span>
      </div>
      <div className="search">
        <input type="search" id="search" placeholder="Search" />
      </div>
      <ul className="currency-list" id="currency-list"></ul>
    </div>
  );
}

export default Drawer;
