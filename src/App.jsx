import { useState } from "react";

// COMPONENTS
import CurrencyConverter from "./components/CurrencyConverter";
import Drawer from "./components/Drawer";
import ExchangeRate from "./components/ExchangeRate";

// import CurrencyList from './components/CurrencyList';
// import CurrencyConverter from './components/CurrencyConverter';

// const state = {
//   openedDrawer: null,
//   currencies: [],
//   filteredCurrencies: [],
//   base: 'USD',
//   target: 'EUR',
//   rates: {},
//   baseValue: 1,
// };

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main>
      <h1>React Currency Calculator</h1>
      <CurrencyConverter />
      <ExchangeRate />
      <Drawer />
    </main>
  );
}

export default App;
