import * as api from '../api';

// export const getCart = () => async(dispatch) => {
//     try {
//         const { data } = await api.fetchCart();

//         dispatch({ type: 'FETCH_ALL', paylod: data });

//     } catch (error) {
//         console.log(error.message);
//     }
// };

// export const addToCart = (productId, quantity) => async(dispatch) => {
//     try {
//         const { data } = await api.addToCart(productId, quantity);

//         dispatch({ type: 'CREATE', paylod: data });

//     } catch (error) {
//         console.log(error.message);
//     }
// };