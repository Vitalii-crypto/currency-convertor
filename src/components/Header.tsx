import React, {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import {Grid} from "@mui/material";
import axios from "axios";

export type ExchangeRate = {
    base_ccy: string;
    buy: number;
    ccy: string;
    sale: number;
}

const Header = () => {
    const [exchangeRates, setExchangeRates] = useState(Array<ExchangeRate>());


    useEffect(() => {
        axios('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then(response => {
                setExchangeRates(response.data);
            })
    }, []);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Grid container spacing={2}>
                            <Grid item md={4} xs={12}>
                                <Carousel
                                    autoPlay={true}
                                    animation="slide"
                                    navButtonsAlwaysInvisible={true}
                                    interval={4000}
                                    indicators={false}
                                >
                                    {exchangeRates.map(exchangeRate => (
                                        <div key={exchangeRate.buy}>
                                            {exchangeRate.ccy} {exchangeRate.buy} / {exchangeRate.sale}
                                        </div>
                                    ))}
                                </Carousel>
                            </Grid>
                        </Grid>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );

}

export default Header;
