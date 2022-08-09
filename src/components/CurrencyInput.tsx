const CurrencyInput = (props: {
    onAmountChange: (amount: string) => void;
    onCurrencyChange: (currency: string) => void;
    currencies: Array<string>;
    currency: string;
    amount: number;
}) => {

    return (
        <div className="group">
            <input type="number" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
            <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
            </select>
        </div>
    );
}

export default CurrencyInput;
