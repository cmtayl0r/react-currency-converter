import { useState, useEffect } from "react";

// API
import { apiClient, API_LATEST, API_CURRENCIES } from "./services";

// COMPONENTS
import CurrencyConverter from "./components/CurrencyConverter";
import Drawer from "./components/Drawer";
import ExchangeRate from "./components/ExchangeRate";

function App() {
  // 1. STATE

  // State for the latest data
  const [currenciesData, setCurrenciesData] = useState([]);
  // State for the filtered currencies when searching
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  // State for the exchange rates
  const [rates, setRates] = useState({});
  // State for the base and target currencies
  const [base, setBase] = useState("EUR");
  const [target, setTarget] = useState("USD");
  // State for the base value
  const [baseValue, setBaseValue] = useState(1);
  // State to show/hide the drawer and the type of drawer (base or target)
  const [openedDrawer, setOpenedDrawer] = useState(null);
  // State for loading
  // const [loading, setLoading] = useState(false);

  // 2. SIDE EFFECTS (API CALLS)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await apiClient.get(API_LATEST);
        // setLatestData(response.data);
        // console.log("Exchange rates:", response.data);
        setRates(prevRates => ({
          // Spread the previous rates
          ...prevRates,
          // Add the new rates with the base currency as the key
          //
          [base]: response.data.data,
        }));
        console.log("Rates data:", rates);
      } catch (error) {
        console.error("Error fetching latest data:", error);
      }
    };

    const fetchCurrencies = async () => {
      try {
        const response = await apiClient.get(API_CURRENCIES);
        const currencies = Object.values(response.data.data);
        setCurrenciesData(currencies); // Set the currencies data
        setFilteredCurrencies(currencies); // Set the filtered currencies
      } catch (error) {
        console.error("Error fetching currencies data:", error);
      }
    };

    fetchExchangeRate();
    fetchCurrencies();
  }, [base]); // Ensure useEffect runs only once after the first render,dependency array includes base

  // 3. EVENT HANDLERS

  const handleDrawerToggle = (drawerId = null) => {
    console.log("Drawer ID:", drawerId);
    if (drawerId) {
      //open drawer
      setOpenedDrawer(drawerId);
    } else {
      //close drawer
      setOpenedDrawer(null);
      setFilteredCurrencies(currenciesData);
    }
  };

  const handleCurrencySelect = code => {
    if (openedDrawer === "base") setBase(code);
    if (openedDrawer === "target") setTarget(code);
    handleDrawerToggle();
  };

  const handleCurrencyFilter = keyword => {
    setFilteredCurrencies(
      currenciesData.filter(
        ({ code, name }) =>
          code.toLowerCase().includes(keyword.toLowerCase()) ||
          name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  const handleSwap = () => {};

  // 4. RENDER

  return (
    <main>
      <h1>React Currency Calculator</h1>
      <CurrencyConverter
        base={base}
        target={target}
        baseValue={baseValue}
        setBaseValue={setBaseValue}
        rates={rates}
        handleDrawerToggle={handleDrawerToggle}
        handleSwap={handleSwap}
      />
      <ExchangeRate base={base} target={target} rates={rates} />
      {openedDrawer && (
        <Drawer
          filteredCurrencies={filteredCurrencies}
          handleDrawerToggle={handleDrawerToggle}
          handleCurrencySelect={handleCurrencySelect}
          handleCurrencyFilter={handleCurrencyFilter}
        />
      )}
    </main>
  );
}

export default App;
