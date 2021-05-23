import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.CHECKOUT:
            
            localStorage.setItem('order', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data };
            
        default:
            return state;
    }
  };
  
  export default authReducer;