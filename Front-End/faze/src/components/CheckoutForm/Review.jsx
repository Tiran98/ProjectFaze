import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ cart, shippingData, totalSub }) => {

    console.log(cart);

    return (
        <>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {cart.map((product) => (
                    <ListItem style={{ padding: '10px 0' }} key={product.product.item_name}>
                        <ListItemText primary={product.product.item_name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant="body2">{product.subtotal} $</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {totalSub} $
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review;
