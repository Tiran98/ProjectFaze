import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';

import logo from '../../assets/fazeLogo2.png';
import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import { getProducts } from '../../actions/products';
import { getCart } from '../../actions/carts';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // const cartNew = useSelector((state) => state.carts);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    
        history.push('/');
    
        setUser(null);
    };

    // useEffect(() => {
    //     dispatch(getCart());
    // }, [dispatch]);

    

    useEffect(() => {
        const token = user?.token;
    
        // if (token) {
        //   const decodedToken = decode(token);
    
        //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        // }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                    </Typography>
                    <SearchBar
                        className={classes.search}
                        placeholder="Type the product name to search"
                    />
                    <div className={classes.grow} />
                    <div>
                        {user ? (
                            <div className={classes.profile}>
                                <Typography className={classes.userName} variant="h6" color="primary">{user?.result.name}</Typography>
                                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button component={Link} to="/user-auth" variant="outlined" className={classes.button} color="primary">Login / Register</Button>
                        )}
                    </div>
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="primary">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> 
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
