import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import SellerD from './SellerD/SellerD';
import useStyles from './styles';

const SellerDash = ( ) => {
  const sellerdash = useSelector((state) => state.sellerdash);
  const classes = useStyles();

  return (
    !sellerdash.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {sellerdash.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <SellerD post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default SellerDash;