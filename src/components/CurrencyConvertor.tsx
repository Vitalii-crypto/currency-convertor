import '../App.css';
import {useState, useEffect} from "react";
import CurrencyInput from "./CurrencyInput";
import {Grid, Paper} from "@mui/material";
import {Rates} from "../App";

const CurrencyConvertor = ({rates}: {
    rates: Rates;
}) => {
    const [amountFrom, setAmountFrom] = useState(1);
    const [amountTo, setAmountTo] = useState(1);
    const [currencyTo, setCurrencyTo] = useState('CAD');
    const [currencyFrom, setCurrencyFrom] = useState('UAH');

    console.log(rates);

    useEffect(() => {
        if (!!rates) {
            handleCountAmountTo('1');
        }
    }, [rates]);


    const format = (number: number) => {
        return Number(number.toFixed(4));
    }

    const handleCountAmountTo = (amountTo: string) => {
        setAmountTo(format(Number(amountTo) * rates[currencyFrom] / rates[currencyTo]));
        setAmountFrom(Number(amountTo));
    }

    const handleCountCurrencyTo = (currencyTo: string) => {
        setAmountTo(format(amountFrom * rates[currencyFrom] / rates[currencyTo]));
        setCurrencyTo(currencyTo);
    }

    const handleCountAmountFrom = (amountFrom: string) => {
        setAmountFrom(format(Number(amountFrom) * rates[currencyTo] / rates[currencyFrom]));
        setAmountTo(Number(amountFrom));
    }

    const handleCountCurrencyFrom = (currencyFrom: string) => {
        setAmountFrom(format(amountTo * rates[currencyTo] / rates[currencyFrom]));
        setCurrencyFrom(currencyFrom);
    }


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Paper className={'paper-container'} elevation={16}>
                <h1>Currency Converter</h1>
                <CurrencyInput
                    onAmountChange={handleCountAmountTo}
                    onCurrencyChange={handleCountCurrencyTo}
                    currencies={Object.keys(rates)}
                    amount={amountFrom}
                    currency={currencyTo}/>
                <CurrencyInput
                    onAmountChange={handleCountAmountFrom}
                    onCurrencyChange={handleCountCurrencyFrom}
                    currencies={Object.keys(rates)}
                    amount={amountTo}
                    currency={currencyFrom}/>
            </Paper>
        </Grid>
    );
}

export default CurrencyConvertor;
