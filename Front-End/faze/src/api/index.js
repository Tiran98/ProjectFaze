import axios from 'axios';

const url = "http://localhost:5000"; //Change url here

const API = axios.create({
    baseURL: 'http://localhost:5000',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // }

});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

//Change paths here
export const signIn = (formData) => API.post(url + '/login', formData);
export const signUp = (formData) => API.post(url + '/sign-up', formData);

export const orderAdd = (formData) => API.post('/order/signin.json', formData);
export const fetchProducts = () => API.get(url + '/item');
export const createProduct = (newProduct) => API.post(url + '/item', newProduct);

export const fetchCart = () => API.get(url + '/cartItems');
