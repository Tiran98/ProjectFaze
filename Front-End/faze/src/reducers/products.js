const reducer = (products = [], action) => {

    switch (action.type) {
        case 'FETCH_ALL':
            return action.paylod;
        case 'CREATE':
            return products;
        default:
            return products;
    }
};

export default reducer;