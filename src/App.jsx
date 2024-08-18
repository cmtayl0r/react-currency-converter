import { useState, useEffect } from "react";

// API
import { apiClient, API_LATEST, API_CURRENCIES } from "./services";

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
  // State for the latest data
  const [latestData, setLatestData] = useState(null);
  const [currenciesData, setCurrenciesData] = useState(null);

  // State for the base and target currencies
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");

  // State to show/hide the drawer
  const [showDrawer, setShowDrawer] = useState(false);
  // State to store the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  // Handlers

  const handleShowDrawer = () => {
    // FIXME: Animation is not working
    showDrawer ? console.log("Hide drawer") : console.log("Show drawer");
    setShowDrawer(!showDrawer);
  };

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await apiClient.get(API_LATEST);
        setLatestData(response.data);
        console.log("Latest data:", response.data);
      } catch (error) {
        console.error("Error fetching latest data:", error);
      }
    };

    const fetchCurrenciesData = async () => {
      try {
        const response = await apiClient.get(API_CURRENCIES);
        setCurrenciesData(response.data);
        console.log("Currencies data:", response.data);
      } catch (error) {
        console.error("Error fetching currencies data:", error);
      }
    };

    fetchLatestData();
    fetchCurrenciesData();
  }, []);

  return (
    <main>
      <h1>React Currency Calculator</h1>
      <CurrencyConverter
        base={base}
        target={target}
        onClick={handleShowDrawer}
      />
      <ExchangeRate />
      {showDrawer && <Drawer onCloseDrawer={handleShowDrawer} />}
    </main>
  );
}

export default App;
