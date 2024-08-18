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
  const [base, setBase] = useState("GBR");
  const [target, setTarget] = useState("EUR");
  // State for the base value
  const [baseValue, setBaseValue] = useState(1);
  // State to show/hide the drawer
  const [openedDrawer, setOpenedDrawer] = useState(null);
  // State for loading
  const [loading, setLoading] = useState(false);

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
  }, []); // Ensure useEffect runs only once after the first render

  // 3. EVENT HANDLERS

  // const handleShowDrawer = () => {
  //   // FIXME: Animation is not working
  //   showDrawer ? console.log("Hide drawer") : console.log("Show drawer");
  //   setShowDrawer(!showDrawer);
  //   // Reset the filtered currencies when closing the drawer
  //   if (!showDrawer) setFilteredCurrencies(currenciesData);
  // };

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
      />
      <ExchangeRate base={base} target={target} rates={rates} />
      {openedDrawer && (
        <Drawer
          currencies={currenciesData}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
    </main>
  );
}

export default App;
