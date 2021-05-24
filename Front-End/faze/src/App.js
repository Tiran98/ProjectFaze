import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { Products, Navbar, Cart, Checkout, UserAuth, Home, Seller, SellerDash, SellerD } from './components';
import { getProducts } from './actions/products';
import { getCart } from './actions/carts';

var totalSub;

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
   
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const productsNew = useSelector((state) => state.products);
    // const cartNew = useSelector((state) => state.carts);

    // console.log(cartNew);

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#ffffff',
            },
            secondary: {
                light: '#0066ff',
                main: '#FF0000',
                contrastText: '#ffffff',
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
        },
        spacing: 8,
    });

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // get cart items
    const fetchCart = async() => {
        // setCart(await commerce.cart.retrieve());
    };

    var array = [];
    var arrayLength = 0;

    // add items to cart
    const handleAddToCart = async({product : product, quantity : quantity, subtotal : subtotal}) => {

        // console.log(productId, quantity);
        
        cart.push({product : product, quantity : quantity, subtotal : subtotal })

        console.log(cart);
       
    };

    useEffect(() => {
        setCart(cart);
        totalSub = cart.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    }, []);

    

    // update cart item quantity
    const handleUpdateCartQty = async(productId, quantity) => {

        var arr3 = Object.values(cart);

        let item = arr3.find((item) => item.product.id == productId);

        let newCart = arr3.filter((item) => item.product.id != productId);

        item.quantity = quantity;
        item.subtotal = item.product.unit_price * quantity;
    
        newCart.push(item);

        setCart(newCart);
        totalSub = cart.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
        console.log(totalSub);

    };

    
    // remove cart items
    const handleRemoveFromCart = async(productId) => {

        var arr3 = Object.values(cart);
        
        arr3 = arr3.filter((item) => item.product.id !== productId);
        console.log(arr3);

        setCart(arr3);
        totalSub = cart.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    };


    // empty the cart
    const handleEmptyCart = async() => {
        setCart([]);
        
    };

    //refresh the cart
    const refreshCart = async() => {
        // const newCart = await commerce.cart.refresh();

        // setCart(newCart);
    };

    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }


    return (
        <Router>
            <ThemeProvider theme={theme}>
                {/* change cart item quantity */}
                <Navbar totalItems={ cart.length } />
                <Switch>
                    <Route exact path="/">
                        <Products products={productsNew} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/home">
                        <Home products={productsNew} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/user-auth">
                        <UserAuth />
                    </Route>
                    <Route exact path="/cart">                
                        <Cart 
                            cart={cart}
                            totalSub={totalSub}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                            cart={cart}
                            order={order}
                            totalSub={totalSub}
                            onCaptureCheckout={handleCaptureCheckout} 
                            error={errorMessage}
                        />
                    </Route>
                    <Route exact path="/seller">                
                        <Seller 
                        />
                    </Route>
                    <Route exact path="/sellerdash">                
                        <SellerDash 
                        />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
        
    )
}

export default App