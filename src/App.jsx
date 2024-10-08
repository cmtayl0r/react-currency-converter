import { useState, useEffect } from "react";

// API
import { apiClient, API_LATEST, API_CURRENCIES } from "./services";

// COMPONENTS
import CurrencyConverter from "./components/CurrencyConverter";
import Drawer from "./components/Drawer";
import ExchangeRate from "./components/ExchangeRate";

// TODO: Review CSS for unused styles or issues
// TODO: Transform control into component
// TODO: Accessibility improvements
// TODO: Error handling
// TODO: Loading states and skeleton screens
// TODO: Hover, active and focus states
// TODO: Fix drawer animation
// TODO: Flag to display instead of green circle

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
  const [loading, setLoading] = useState(false);

  // 2. SIDE EFFECTS (API CALLS)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // fetch the latest exchange rates for the base currency
        const response = await apiClient.get(
          `${API_LATEST}&base_currency=${base}`
        );
        // Update the rates state with the new rates data for the base currency
        setRates(prevRates => ({
          // Spread the previous rates
          ...prevRates,
          // Add the new rates with the base currency as the key
          [base]: response.data.data,
        }));
        console.log("Rates data:", rates);
      } catch (error) {
        console.error("Error fetching latest data:", error);
      }
    };

    const fetchCurrencies = async () => {
      setLoading(true);
      console.log(loading);
      try {
        const response = await apiClient.get(API_CURRENCIES);
        const currencies = Object.values(response.data.data);
        setCurrenciesData(currencies); // Set the currencies data
        setFilteredCurrencies(currencies); // Set the filtered currencies
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currencies data:", error);
        setLoading(false);
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

  const handleCurrencySwap = () => {
    setBase(target);
    setTarget(base);
  };

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
        handleCurrencySwap={handleCurrencySwap}
      />
      <ExchangeRate
        base={base}
        target={target}
        rates={rates}
        loading={loading}
      />
      {openedDrawer && (
        <Drawer
          filteredCurrencies={filteredCurrencies}
          handleDrawerToggle={handleDrawerToggle}
          handleCurrencySelect={handleCurrencySelect}
          handleCurrencyFilter={handleCurrencyFilter}
          openedDrawer={openedDrawer}
        />
      )}
    </main>
  );
}

export default App;
