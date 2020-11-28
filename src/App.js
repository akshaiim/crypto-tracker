import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Coin } from "./coin";


function App() {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const apiUrl =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    axios
      .get(apiUrl)
      .then((resp) => {
        console.log(resp.data);
        setCoins(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    
  };

  const filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  //
  return (
    
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Crypto-price Tracker</h1>
          <form>
            <input
              type="text"
              placeholder="search a coin"
              className="coin-input"
              onChange={handleChange}
            />
          </form>
        </div>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    
  );
}

export default App;
