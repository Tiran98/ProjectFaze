import React from 'react'
import { Typography, Button, Divider, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ cart, shippingData, backStep, onCaptureCheckout, nextStep, timeout, totalSub }) => {

    const [value, setValue] = React.useState('');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        console.log(value);
      };

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        console.log(shippingData);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if(error) {
            console.log(error + 'cardError');
        } else {
            const orderData = {
                // line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, 
                    email: shippingData.email },
                shipping: { name: 'Primary Shipping', street: shippingData.address1, 
                    town_city: 'San Francisco' },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            {/*const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, 
                    email: shippingData.email },
                shipping: { name: 'Primary Shipping', street: shippingData.address1, 
                    town_city: 'San Francisco', county_state: 'US-CA', postal_zip_code: '94103', 
                    country: shippingData.shippingCountry },
                fulfillment: { shipping_method: 'ship_7RyWOwmK5nEa2V' },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };*/}

            // onCaptureCheckout(checkoutToken.id, orderData);

            // timeout();

            nextStep();
        }
    }

    return (
        <>
            <Review cart={cart} shippingData={shippingData} totalSub={totalSub} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
            <RadioGroup aria-label="payment-method" name="payment-method" value={value} onChange={handleRadioChange}>
                <FormControlLabel value="card-payment" control={<Radio />} label="Card Payment" />
                <FormControlLabel value="mobile-payment" control={<Radio />} label="Add to your mobile bill" />
            </RadioGroup>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {totalSub} $
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm;
