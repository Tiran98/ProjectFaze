import * as api from '../api';

//Action Creators
export const getProducts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchProducts();

        console.log(data);

        dispatch({ type: 'FETCH_ALL', paylod: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const createProduct = (product) => async(dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch({ type: 'CREATE', paylod: data });

    } catch (error) {
        console.log(error.message);
    }
};