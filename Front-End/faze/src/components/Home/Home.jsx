import React from 'react';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import Product from '../Products/Product/Product';
import Footer from '../Footer/Footer';
import Carousel from './Carousel';
import useStyles from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Carousel />
            <div className={classes.body}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <LocalShippingIcon className={classes.localShippingIcon} />
                        <Typography variant="subtitle1" m={4} color="primary">Free delivery for over 30$ items</Typography>
                    </Paper>
                </Grid>
                <Grid container justify="center" spacing={4} className={classes.products}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} onAddToCart={onAddToCart} />
                        </Grid>    
                    ))}
                </Grid>
            </div>
            <Footer />
        </main>
    )
}

export default Home
