import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const CssTextField = withStyles({
    root: {
      '& .MuiInputLabel-root': {
        color: '#a3a3a3',
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#a3a3a3',
        },
        '&:hover fieldset': {
          borderColor: '#cccccc',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
})(TextField);

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    
    <Grid item xs={12} sm={half ? 6 : 12}>
      <CssTextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
      />
    </Grid>
  );
  
  export default Input;