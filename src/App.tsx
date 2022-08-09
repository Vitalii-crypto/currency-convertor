import './App.css';
import Header from "./components/Header";
import CurrencyConvertor from "./components/CurrencyConvertor";
import {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress} from "@mui/material";

export type Rates = {
    [currency: string]: number,
}

const App = () => {
    const [rates, setRates] = useState<Rates>({'USD': 0});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`https://api.apilayer.com/fixer/latest?base=USD&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                setRates(response.data.rates);
            })
            .catch(e => {
                setError(e.message);
            })
        setLoading(false);
    }, []);

    return (
        <div>
            {loading ? <CircularProgress size={150}/> :
                <div>
                    {error ? <div>{error}</div> :
                        <div>
                            <Header/>
                            <CurrencyConvertor rates={rates}/>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default App;
