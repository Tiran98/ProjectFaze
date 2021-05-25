import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { Products, Navbar, Cart, Checkout, UserAuth, Home, Seller, SellerDash, SellerD } from './components';
import { getProducts } from './actions/products';

var totalSub = 0;

const App = () => {
    // const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [resultProduct, setResultProduct] = useState([]);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const productsNew = useSelector((state) => state.products);
    totalSub = cart.reduce((total, currentValue) => total = total + currentValue.subtotal,0);

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
            neutral: {
                light: '#0066ff',
                main: '#5c6ac4',
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
        },
        spacing: 8,
    });

    useEffect(() => {
        dispatch(getProducts());
        setSearchKey(searchKey);
        setCartLength(cart.length);
        totalSub = cart.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    }, [dispatch]);

    // useEffect(() => {
        
    // }, []);

    //Seach Product

    // console.log(searchKey);

    // const itemName = "Adidas 4DFWD Shoes";
    
    const searchProduct = () => {

        axios.post("http://localhost:5000/itemfind/",
        {
            itemName : searchKey

        }).then((response)=>{
           
          if(response.data){
                console.log(response.data);
                setResultProduct(response.data);
          }
          else
          {
            console.log(response.status)
          }
        }).catch((err)=>{
            console.log("Search " + err)
            setIsAvailable(false);
        })
    };

    const resetSearch = () => {
        setResultProduct([]);
        setIsAvailable(true);
        // alert("test");
        // history.push('/home');

    }

    // add items to cart
    const handleAddToCart = async({product : product, quantity : quantity, subtotal : subtotal}) => {

        var arr3 = Object.values(cart);
        
        arr3.push({product : product, quantity : quantity, subtotal : subtotal });

        setCart(arr3);
        totalSub = cart.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
       
    };
    

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
        totalSub = 0;
        
    };

    //search

    return (
        <Router>
            <ThemeProvider theme={theme}>
                {/* change cart item quantity */}
                <Navbar totalItems={ cart.length } setSearchKey={setSearchKey} searchKey={searchKey} searchProduct={searchProduct} resetSearch={resetSearch} isAvailable={isAvailable}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={productsNew} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/home">
                        <Home products={productsNew} onAddToCart={handleAddToCart} resultProduct={resultProduct} searchKey={searchKey} resetSearch={resetSearch} isAvailable={isAvailable} />
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
                            setOrder={setOrder}
                            totalSub={totalSub}
                            error={errorMessage}
                            handleEmptyCart={handleEmptyCart}
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