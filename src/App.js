import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
        setRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[toCurrency];
        setRate(rate);
        setResult(amount * rate);
      });
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>

      <div className="converter">
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>

        {result > 0 && (
          <div className="result">
            <h2>{amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}</h2>
            <p>Exchange Rate: 1 {fromCurrency} = {rate} {toCurrency}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
