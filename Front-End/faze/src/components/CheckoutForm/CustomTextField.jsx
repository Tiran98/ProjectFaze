import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const FormInput = ({ name, label, required, value }) => {
    const { control, errors  } = useFormContext();
    const isError = false;

    const CssTextField = withStyles({
        root: {
          '& .MuiInputLabel-root': {
            color: '#a3a3a3',
          },
          '& .MuiTextField-root': {
            color: '#a3a3a3',
          },
          '& label.Mui-focused': {
            color: '#a3a3a3',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#a3a3a3',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#a3a3a3',
            },
            '&:hover fieldset': {
              borderColor: '#cccccc',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        },
        input: {
          color: "white"
        }
    })(TextField);
    
    return (
        <Grid item xs={12} sm={6}>
            <Controller 
                control={control}
                name={name}
                render = {
                    ({ field }) => (
                    // <TextField 
                    //     fullWidth
                    //     label={label}
                    // />
                    <CssTextField
                        fullWidth
                        {...field} 
                        label={label}
                        color="primary"
                    />
                )}
                defaultValue=""
                rules={{ required: true }}
            />
        </Grid>
    )
}

export default FormInput;
