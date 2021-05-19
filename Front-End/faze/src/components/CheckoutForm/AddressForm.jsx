import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider, useFormContext  } from 'react-hook-form';
import { Link } from 'react-router-dom';

import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken,  test }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const onSubmit = data => console.log(data);

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId); 
        
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const options = shippingOptions.map((sO) => ({ id: sO.value, label: `${sO.label} - (${sO.price})`}));

    const fetchShippingOptions = async () => {

        const shippingCompanies = [
            { label: "Domestic Post", value: "DP", price: 0 },
            { label: "Express Post", value: "EP", price: 10 },
            { label: "FedEx", value: "FD", price: 20 },
            { label: "DHL", value: "DL", price: 20 },
        ];

        setShippingOptions(shippingCompanies);
        setShippingOption(shippingCompanies[0].value);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

    useEffect(() => {
        fetchShippingOptions()
    }, []);


    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
           <FormProvider {...methods}>
           <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingOption }))}>
                    <Grid container spacing={3}>
                        {/* <FormInput {...register("test")} label='Test' name='test'/> */}
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address1' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='Zip / Postal Code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shippping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shippping Options</InputLabel>
                            <Select value={shippingOption} fullWidth  onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((options) => (
                                    <MenuItem key={options.id} value={options.id}>
                                        {options.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary"> Next</Button>
                    </div>
               </form>
           </FormProvider>
        </>
    )
}

export default AddressForm;
