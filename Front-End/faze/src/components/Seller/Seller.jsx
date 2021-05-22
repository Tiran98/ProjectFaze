import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
//import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
//import { createPost, updatePost } from '../../actions/posts';

const Seller = () => { 
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    
    const classes = useStyles();

    const handleSubmit = () => {

    }

    const clear = () => {

    }
  
    return (
        <div>
    <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h3">Adding a Product</Typography>
      <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
      <TextField name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
      <TextField name="details" variant="outlined" label="Details" fullWidth value={postData.details} onChange={(e) => setPostData({ ...postData, details: e.target.value })} />
      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
        </div>
    )
}

export default Seller;
