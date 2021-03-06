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


const App = () => {
    // const [products, setProducts] = useState([]);
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

    
    // const fetchProducts = async() => {
    //     const { data } = await commerce.products.list();

    //     setProducts(data);
    // };

    // get cart items
    const fetchCart = async() => {
        setCart(await commerce.cart.retrieve());
    };

    // console.log(JSON.stringify(cart));

    // add items to cart
    const handleAddToCart = async(productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);

        setCart(response.cart);
    };

    // update cart item quantity
    const handleUpdateCartQty = async(productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });

        setCart(response.cart);
    };

    // remove cart items
    const handleRemoveFromCart = async(productId) => {
        const response = await commerce.cart.remove(productId);

        setCart(response.cart);
    };

    // empty the cart
    const handleEmptyCart = async() => {
        const response = await commerce.cart.empty();

        setCart(response.cart);
    };

    //refresh the cart
    const refreshCart = async() => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
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

    useEffect(() => {
        fetchCart();
        // fetchProducts();
    }, []);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                {/* change cart item quantity */}
                <Navbar totalItems={cart.total_items} />
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
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                            cart={cart}
                            order={order} 
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