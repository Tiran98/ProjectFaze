import React, { useState } from 'react';
import { Divider, Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';

import Product from '../Products/Product/Product';
import Footer from '../Footer/Footer';
import Carousel from './Carousel';
import useStyles from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = ({ products, onAddToCart, resultProduct, searchKey, resetSearch, isAvailable }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const productsData = JSON.parse(products);
    console.log(resultProduct.length);

    const SearchResult = ({ resultProduct, onAddToCart, searchKey, isAvailable }) => (
        <div>
            <div className={classes.body}>
                    <>  
                        <Typography variant="subtitle1" align="center" color="inherit" display="block" gutterBottom>Search result for {searchKey}.</Typography>
                        <Grid container justify="center" spacing={4} className={classes.products}>
                            
                            {resultProduct.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <Product product={product} onAddToCart={onAddToCart} />
                                </Grid>    
                            ))}
                        </Grid>
                    </> 
                       
            </div>
        </div>
    );

    const AllProducts = ({ products, onAddToCart }) => (
        <div>
            <Carousel />
            <div className={classes.body}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <LocalShippingIcon className={classes.localShippingIcon} />
                        <Typography variant="subtitle1" m={4} color="primary">Free delivery for over 30$ items</Typography>
                    </Paper>
                </Grid>
                { products.length ? 
                    <>
                        <Grid container justify="center" spacing={4} className={classes.products}>
                            {products.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <Product product={product} onAddToCart={onAddToCart} />
                                </Grid>    
                            ))}
                        </Grid>
                    </> :
                        <div className={classes.spinner}>
                            <CircularProgress color="texrPrimary"/>
                        </div> 
                }
            </div>
        </div>
    );

let AfterSearch = ({ resultProduct, onAddToCart, searchKey, isAvailable }) => !isAvailable  ? (
        <div>
            <br /> <br />
            <Alert severity="error" variant="filled">
                <AlertTitle>No Search Result :</AlertTitle>
                No products found. Please check the product name again.
            </Alert>
        </div> ) : (
        <SearchResult resultProduct={resultProduct} onAddToCart={onAddToCart} searchKey={searchKey} isAvailable={isAvailable} /> 
    ) 

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            { !isAvailable || resultProduct.length != 0 ? <AfterSearch resultProduct={resultProduct} onAddToCart={onAddToCart} searchKey={searchKey} isAvailable={isAvailable}/> 
                : <AllProducts products={products} onAddToCart={onAddToCart} />  }
            <Footer />
        </main>
    )
}

export default Home
