import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import SellerD from './SellerD/SellerD';
import useStyles from './styles';

const SellerDash = ( ) => {
  const sellerdash = useSelector((state) => state.sellerdash);
  const classes = useStyles();

  return (
    <div>Seller Dashboard</div>
  );
};

export default SellerDash;