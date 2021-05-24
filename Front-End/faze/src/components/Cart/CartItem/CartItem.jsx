import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const classes = useStyles();

    return (
        <Card>
          
            <CardMedia image={item.product.item_image} alt={item.product.item_name} className={classes.media} />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5">{item.product.item_name}</Typography>
              <Typography variant="h5" style={{ 'fontWeight' : '600' }} >{item.product.unit_price * item.quantity} $</Typography>
            </CardContent> 
            <CardActions className={classes.cartActions}>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}>+</Button>
              </div>
              <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.product.id)}>Remove</Button>
            </CardActions> 
        </Card>
    )
}

export default CartItem
