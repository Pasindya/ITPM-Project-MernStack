import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Currency.css'; // Import the CSS file

function Currency() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('LKR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const API_KEY = '8f16c1fb556314db81f379da'; // Replace with your API key
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

  // Mapping of 25 popular currency codes to country codes and names
  const currencyToCountry = {
    USD: { code: 'US', name: 'United States' }, // United States
    EUR: { code: 'EU', name: 'European Union' }, // European Union
    GBP: { code: 'GB', name: 'United Kingdom' }, // United Kingdom
    JPY: { code: 'JP', name: 'Japan' }, // Japan
    AUD: { code: 'AU', name: 'Australia' }, // Australia
    CAD: { code: 'CA', name: 'Canada' }, // Canada
    CHF: { code: 'CH', name: 'Switzerland' }, // Switzerland
    CNY: { code: 'CN', name: 'China' }, // China
    SEK: { code: 'SE', name: 'Sweden' }, // Sweden
    NZD: { code: 'NZ', name: 'New Zealand' }, // New Zealand
    KRW: { code: 'KR', name: 'South Korea' }, // South Korea
    SGD: { code: 'SG', name: 'Singapore' }, // Singapore
    NOK: { code: 'NO', name: 'Norway' }, // Norway
    INR: { code: 'IN', name: 'India' }, // India
    LKR: { code: 'LK', name: 'Sri Lanka' }, // Sri Lanka
    THB: { code: 'TH', name: 'Thailand' }, // Thailand
    HKD: { code: 'HK', name: 'Hong Kong' }, // Hong Kong
    MYR: { code: 'MY', name: 'Malaysia' }, // Malaysia
    IDR: { code: 'ID', name: 'Indonesia' }, // Indonesia
    PHP: { code: 'PH', name: 'Philippines' }, // Philippines
    ZAR: { code: 'ZA', name: 'South Africa' }, // South Africa
    BRL: { code: 'BR', name: 'Brazil' }, // Brazil
    RUB: { code: 'RU', name: 'Russia' }, // Russia
    MXN: { code: 'MX', name: 'Mexico' }, // Mexico
    AED: { code: 'AE', name: 'United Arab Emirates' }, // UAE
  };

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(API_URL);
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, [API_URL, baseCurrency]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rates[targetCurrency]) {
      setConvertedAmount((amount * rates[targetCurrency]).toFixed(2));
      setIsSubmitted(true);
    }
  };

  // Function to get flag emoji from country code
  const toFlagEmoji = (countryCode) => {
    if (countryCode === 'EU') return '🇪🇺'; // Special case for Euro
    const flagOffset = 0x1F1E6;
    const asciiOffset = 0x41;
    const firstChar = countryCode.charCodeAt(0) - asciiOffset;
    const secondChar = countryCode.charCodeAt(1) - asciiOffset;
    return String.fromCodePoint(flagOffset + firstChar, flagOffset + secondChar);
  };

  return (
    <div className="currency-container">
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            From:
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              required
            >
              {Object.keys(currencyToCountry).map((currency) => (
                <option key={currency} value={currency}>
                  {currency} {toFlagEmoji(currencyToCountry[currency].code)} ({currencyToCountry[currency].name})
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            To:
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              required
            >
              {Object.keys(currencyToCountry).map((currency) => (
                <option key={currency} value={currency}>
                  {currency} {toFlagEmoji(currencyToCountry[currency].code)} ({currencyToCountry[currency].name})
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="submit-button">
          Convert
        </button>
      </form>

      {isSubmitted && (
        <div className="result">
          <h2>
            {amount} {baseCurrency} {toFlagEmoji(currencyToCountry[baseCurrency].code)} ({currencyToCountry[baseCurrency].name}) = {convertedAmount} {targetCurrency} {toFlagEmoji(currencyToCountry[targetCurrency].code)} ({currencyToCountry[targetCurrency].name})
          </h2>
        </div>
      )}
    </div>
  );
}

export default Currency;