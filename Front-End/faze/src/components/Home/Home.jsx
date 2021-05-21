import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Products/Product/Product';
import Carousel from './Carousel';
import useStyles from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Carousel />
        </main>
    )
}

export default Home
