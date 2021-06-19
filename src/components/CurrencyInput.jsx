import React from 'react';

const CurrencyInput = ({ currency, selectedCurrency, onChangeCurrency, amount, onChangeAmount }) => {
    return (
        <>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currency.map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                    ))}
            </select>
        </>
    );
};

export default CurrencyInput;