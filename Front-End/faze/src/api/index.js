import axios from 'axios';

const url = "http://localhost:80/products/products.json"; //Change url here

const API = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

//Change paths here
export const signIn = (formData) => API.post('/user/signin.json', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const orderAdd = (formData) => API.post('/order/signin.json', formData);
export const fetchProducts = () => API.get(url);
export const createProduct = (newProduct) => API.post('/products/products.json', newProduct);

export const fetchCart = () => API.get('/products/cart.json');