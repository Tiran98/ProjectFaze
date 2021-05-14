import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';

import { Products, Navbar } from './components';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // get all products
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
    
        setProducts(data);
    }

    // get cart items
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    } 

    // add items to cart
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <div>
            {/* change cart item quantity */}
            <Navbar totalItems={cart.total_items} /> 
            <Products products={products} onAddToCart={handleAddToCart} />
        </div>
    )
}

export default App
