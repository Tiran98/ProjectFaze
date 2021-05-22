import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Icon, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => { 
    const classes = useStyles();
    
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.media.source} title={product.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <div>
                            <Typography variant="h6" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="caption" className={classes.seller} gutterBottom>
                                By Adidas
                            </Typography>
                        </div>
                        <Typography variant="h5" className={classes.price}>
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    {/* <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" /> */}
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product
