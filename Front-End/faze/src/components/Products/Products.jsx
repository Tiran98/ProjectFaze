import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';

// const products = [
//     { id: 1, name: 'Shoes', description: 'Running shoes.', price: '$5', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f9b52c1f-ca36-4492-8836-7a84c6bfd789/quest-3-running-shoe-jQ8mdN.png'},
//     { id: 2, name: 'Macbook', description: 'Apple macbook.', price: '$10', image: 'https://www.greenware.lk/wp-content/uploads/2020/12/MacBook-Air.jpg'},
// ];

const Products = ( { products, onAddToCart } ) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>    
                ))}
            </Grid>
        </main>
    );
    
}

export default Products;