import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label, required, value }) => {
    const { control, errors  } = useFormContext();
    const isError = false;
    
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
                    <TextField
                        fullWidth
                        {...field} 
                        label={label}
                    />
                )}
                defaultValue=""
                rules={{ required: true }}
            />
        </Grid>
    )
}

export default FormInput
