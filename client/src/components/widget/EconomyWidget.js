import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Widget.css";

const EconomyWidget = ({ id, onSave, input1, input2, Time }) => {
  const [baseCurrency, setBaseCurrency] = useState(input1 || "");
  const [targetCurrency, setTargetCurrency] = useState(input2 || "");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [intervalTime, setIntervalTime] = useState(Time || 5);
  const [validated, setValidated] = useState(false);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setIntervalTime(event.target.value);
  };

  const handleValidate = () => {
    updateExchangeRate();
    setValidated(true);
    onSave && onSave(id, "economy", baseCurrency, targetCurrency, intervalTime);
  };

  const updateExchangeRate = () => {
    axios
      .get(
        `https://exchange-rates.abstractapi.com/v1/live/?api_key=${process.env.REACT_APP_ECO_API_KEY}&base=${baseCurrency}&target=${targetCurrency}`
      )
      .then((response) => {
        setExchangeRate(response.data.exchange_rates[targetCurrency]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (input1 && input2) {
      updateExchangeRate();
      setValidated(true);
    }
  }, [input1, input2]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateExchangeRate();
    }, intervalTime * 60 * 1000);
    return () => clearInterval(interval);
  }, [intervalTime, baseCurrency, targetCurrency]);

  return (
    <div className="widget economy-widget" key={id}>
      {validated ? (
        <div className="economy-info">
          <h4>Exchange rate:</h4>
          <h3>
            {exchangeRate} {targetCurrency} per {baseCurrency}
          </h3>
        </div>
      ) : (
        <>
          <div className="base">
            <div>
              Base currency:
              <input
                type="text"
                value={baseCurrency}
                onChange={handleBaseCurrencyChange}
              />
            </div>
            <div>
              Target currency:
              <input
                type="text"
                value={targetCurrency}
                onChange={handleTargetCurrencyChange}
              />
            </div>
            <div>
              Interval (in minutes):
              <input
                type="number"
                min="1"
                value={intervalTime}
                onChange={handleIntervalChange}
              />
            </div>
          </div>
        </>
      )}
      <div className="widget-title">Widget Economy</div>
      <div className="edit-button-container">
        <button
          onClick={validated ? () => setValidated(false) : handleValidate}
          className="edit-button"
        >
          {validated ? "Edit" : "Validate"}
        </button>
      </div>
    </div>
  );
};

export default EconomyWidget;
