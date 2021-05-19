import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Products, Navbar, Cart, Checkout } from './components';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    // get all products
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
    
        setProducts(data);
    };

    // get cart items
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }; 

    // add items to cart
    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);

        setCart(response.cart);
    };

    // update cart item quantity
    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });

        setCart(response.cart);
    };

    // remove cart items
    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);

        setCart(response.cart);
    };

    // empty the cart
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();

        setCart(response.cart);
    };

    //refresh the cart
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <Router>
            <div>
                {/* change cart item quantity */}
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
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
                </Switch>
            </div>
        </Router>
        
    )
}

export default App
