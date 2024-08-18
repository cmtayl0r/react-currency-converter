function Drawer({ currencies, handleDrawerToggle }) {
  const flagURL = code => {
    return `https://flagcdn.com/${code.slice(0, 2).toLowerCase()}.svg`;
  };

  return (
    <div id="drawer" className="drawer show">
      <div className="title">
        <button id="dismiss-btn" onClick={() => handleDrawerToggle()}>
          <span className="material-symbols-outlined"> west </span>
        </button>
        <h3>Select Currency</h3>
        <span></span>
      </div>
      <div className="search">
        <input type="search" id="search" placeholder="Search" />
      </div>
      <ul className="currency-list" id="currency-list">
        {currencies.map(({ name, code }) => {
          return (
            <li key={code}>
              <img src={flagURL(code)} alt={name} width="64" />
              <div>
                <h4>{code}</h4>
                <p>{name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Drawer;
