import axios from 'axios';

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

export const signIn = (formData) => API.post('/user/signin.json', formData);
export const signUp = (formData) => API.post('/user/signup', formData);