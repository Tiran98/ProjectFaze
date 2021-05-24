import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Icon, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => { 
    const classes = useStyles();
    
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.item_image} title={product.item_name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <div>
                            <Typography variant="h6" gutterBottom>
                                {product.item_name}
                            </Typography>
                            <Typography variant="caption" className={classes.seller_id} gutterBottom>
                                By Adidas
                            </Typography>
                        </div>
                        <Typography variant="h5" className={classes.price}>
                            {product.unit_price} $
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{ __html: product.item_description }} variant="body2" color="textSecondary" />
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart({product:product, quantity: 1, subtotal: 1 * product.unit_price})}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product
