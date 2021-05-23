import * as api from '../api';

export const getCart = () => async(dispatch) => {
    try {
        const { data } = await api.fetchCart();

        dispatch({ type: 'FETCH_ALL', paylod: data });

    } catch (error) {
        console.log(error.message);
    }
};

// export const createProduct = (product) => async(dispatch) => {
//     try {
//         const { data } = await api.createProduct(product);

//         dispatch({ type: 'CREATE', paylod: data });

//     } catch (error) {
//         console.log(error.message);
//     }
// };