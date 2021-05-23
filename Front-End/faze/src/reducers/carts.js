const reducer = (carts = [], action) => {

    switch (action.type) {
        case 'FETCH_ALL':
            return action.paylod;
        case 'CREATE':
            return carts;
        default:
            return carts;
    }
};

export default reducer;