import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart, totalSub }) => {
    const classes = useStyles();
    
    var user = [{ data : 0 }];
    user = JSON.parse(localStorage.getItem('profile'));
    var userID = 0;

    if(user != null)  userID = user.data.id;
   
    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart,
            <Link to="/home" className={classes.link}> start adding some</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.map((item, key) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item}  onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4" className={classes.subtotal}>Subtotal: {totalSub} $</Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
                { userID ? 
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    : <Button disabled className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
                        Sign in for checkout
                      </Button> 
                }
            </div>
        </div>
        </>
    );

    // if (!cart.length) return 'Loading';

    return (
        <Container>
            <div  className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            <Divider className={classes.divider} gutterBottom />
            { !cart.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
