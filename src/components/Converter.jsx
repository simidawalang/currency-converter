import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyInput from './CurrencyInput.jsx';

const Converter = () => {
    const [currency, setCurrency] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState();
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = (amount * exchangeRate).toFixed(2);
    } else {
        toAmount = amount;
        fromAmount = (amount / exchangeRate).toFixed(2);
    }

    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=2cf4be6641a7209809732885c930292a&format=1';

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                const currencyData = response.data;
                const firstCurrency = Object.keys(currencyData.rates)[0];
                setCurrency([...Object.keys(currencyData.rates)]);
                setFromCurrency(currencyData.base);
                setToCurrency(firstCurrency);
                setExchangeRate(currencyData.rates[firstCurrency]);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }
    const handleToAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            axios.get(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then(response => {
                    const currencyData = response.data;
                    setExchangeRate(currencyData.rates[toCurrency]);
                })
        }
    }, [fromCurrency, toCurrency]);

    return (
        <div className="centered-div">
            <div className="converter-container">
                <h3 className="text-center">Currency Converter</h3>
                <p>Real-time exchange rates. All rates are referenced from the European
                    Central Bank published exchange rates.
                </p>
                <div className="converter-body">
                    <CurrencyInput
                        currency={currency}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={e => setFromCurrency(e.target.value)}
                        amount={fromAmount}
                        onChangeAmount={handleFromAmountChange} />

                    <div className="equal-to text-center">=</div>

                    <CurrencyInput
                        currency={currency}
                        selectedCurrency={toCurrency}
                        onChangeCurrency={e => setToCurrency(e.target.value)}
                        amount={toAmount}
                        onChangeAmount={handleToAmountChange} />
                </div>
            </div>
        </div>
    );
};

export default Converter;