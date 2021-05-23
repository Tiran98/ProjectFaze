import { CHECKOUT } from '../constants/actionTypes';
import * as api from '../api/index';

export const order = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.order(formData);

        dispatch({ type: CHECKOUT, data });

        history.push('/');

    } catch (error) {
        console.log(error);
    }
};