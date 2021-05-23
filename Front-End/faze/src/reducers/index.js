import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import order from './order';
import products from './products';
import carts from './carts';

export const reducers = combineReducers({
    auth,
    order,
    products,
    carts,
});