import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Divider, RadioGroup, FormControlLabel, Radio, Grid, TextField } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { withStyles } from '@material-ui/core/styles';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
var mobileNumber = "";
var OTP = "";
var resNumber = "";

const PaymentForm = ({ cart, shippingData, backStep, nextStep, timeout, totalSub, handleEmptyCart, setOrder }) => {
    const [value, setValue] = React.useState("card-payment");
    const [mobileInput, setMobileInput] = useState("");
    const [mobile, setMobile] = useState("");
    const [isOTP, setisOTP] = React.useState(false);
    const [uniqueId, setUniqueId] = useState("");
    const [orders, setOrders] = useState();

    const CssTextField = withStyles({
        root: {
          '& .MuiInputLabel-root': {
            color: '#a3a3a3',
          },
          '& .MuiTextField-root': {
            color: '#000000',
          },
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#a3a3a3',
            },
            '&:hover fieldset': {
              borderColor: '#cccccc',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        },
    })(TextField);

    const user = JSON.parse(localStorage.getItem('profile'));
    const userID = user.data.id;

    useEffect(() => {
        setUniqueId("#user-"+ userID + totalSub + "99");
        console.log(uniqueId);
    }, []);

    // setUniqueId("#user-"+ userID + totalSub + "99");

    const handleRadioChange = (event) => {

        setValue(event.target.value);
    };

    const handleChange = (e) => {
        setMobileInput({mobile: {[e.target.id]: e.target.value}});
        console.log(mobileInput);
    };

    var responseData = [];

    //Add order to database
    const addOrder = (orders) => {

        console.log(orders);
        
        axios.post("http://localhost:5000/orderHistory/",
        {
            neworderHistory : orders

        }).then((response)=>{
           
            responseData = response.data;
            console.log(responseData);
            setOrder(responseData);

        }).catch((err)=>{
            console.log(err)
        })
    };


    //Send confirmation email
    const sendEmail = () => {
        
        axios.post("http://localhost:5000/buyer/sendMail/",
        {
            buyerId : userID

        }).then((response)=>{
           
            console.log(response.data);

        }).catch((err)=>{
            console.log(err)
        })
    };

    //Send confirmation sms
    const sendSms = () => {
        
        axios.post("http://localhost:5000/buyer/sendMsg/",
        {
            buyerId : userID

        }).then((response)=>{
           
            console.log(response.data);

        }).catch((err)=>{
            console.log(err)
        })
    };


    const handleOTPClick = (event) => {
        
        axios.post("http://localhost:5000/sendOTP/",
        {
            phonenumber : mobileNumber

        }).then((response)=>{
           
          if(response.data){
                setisOTP(true);
                console.log(response.data.to);
                resNumber = response.data.to;
          }
          else
          {
            console.log(response)
          }
        }).catch((err)=>{
            console.log(err)
        })
    };

    const handleVerifyOTP = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/verifyOTP/",
        {
            phonenumber : resNumber,
            code : OTP

        }).then((response)=>{
           
          if(response.data){
                if(response.data.status == "approved") {
                    setUniqueId("#user-"+ userID + totalSub + "99");
                    const orderData = {
                        cart_items: cart,
                        customer: { id: userID, firstname: shippingData.firstName, lastname: shippingData.lastName, 
                            email: shippingData.email, mobile: shippingData.mobile },
                        shipping: { method: shippingData.shippingOption, street: shippingData.address1, 
                            city: shippingData.city , country : shippingData.shippingCountry },
                        payment: "mobile",
                        final_cost: totalSub,
                        order_ref: uniqueId
                    }
        
                    console.log(orderData);

                    addOrder(orderData);
                    sendEmail();
                    sendSms();

                    handleEmptyCart();
                    nextStep();
                    
                }
          }
          else
          {
            console.log(response)
          }
        }).catch((err)=>{
            console.log(err)
        })
    };

    

    const getValue = (num) =>{
        mobileNumber = num;
    }

    const getValueOTP = (code) =>{
        OTP = code;
    }

    

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        console.log(shippingData);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if(error) {
            console.log(error + 'cardError');
        } else {
            setUniqueId("#user-"+ userID + totalSub + "99");
            console.log(uniqueId);

            const orderData = {
                cart_items: cart,
                customer: { id: userID, firstname: shippingData.firstName, lastname: shippingData.lastName, 
                    email: shippingData.email, mobile: shippingData.mobile },
                shipping: { method: shippingData.shippingOption, street: shippingData.address1, 
                    city: shippingData.city , country : shippingData.shippingCountry },
                payment: "card",
                final_cost: totalSub,
                order_ref: uniqueId
            }
            console.log(orderData);
            setOrders(orderData);

            console.log(orders);

            addOrder(orderData);
            sendEmail();
            sendSms();

            handleEmptyCart();
            nextStep();
            
        }
    }

    const CardPayment = ({ stripePromise, elements, stripe, handleSubmit, backStep, totalSub }) => (
        <Elements stripe={stripePromise}>
                    <ElementsConsumer >
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
    );

    const MobileComponent = ({ handleChange, handleOTPClick }) => (
        <form>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between' }} gutterBottom>
                <Grid item xs={9} > 
                    <CssTextField 
                        fullWidth
                        variant="outlined" 
                        id='mobile-number'
                        name='mobile-number' 
                        label='Mobile Number'
                        size="small"
                        placeholder="+94775574685"
                        onChange={(e)=> {
                           getValue(e.target.value)
                        }}
                    />
                                    
                </Grid>
                <Grid item xs={3} > 
                    <Button variant="contained" onClick={() => handleOTPClick()} >Send OTP</Button>
                </Grid>
            </Grid>
        </form> 
    );

    const OTPComponent = ({ resNumber }) => (
        <form>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between' }} gutterBottom>
                <Grid item xs={9} >
                    <Typography variant="caption"  >Your OTP has sent to { resNumber } this number. You will get it within 5 minutes.</Typography>
                </Grid>
                <Grid item xs={9} > 
                    
                    <CssTextField 
                        fullWidth
                        variant="outlined" 
                        name='otp' 
                        label='OTP'
                        size="small"
                        onChange={(e)=> {
                            getValueOTP(e.target.value)
                         }}
                    />
                    
                </Grid>
                <Grid item xs={3} > 
                    <Button variant="contained" onClick={() => handleVerifyOTP()} color="primary">
                        Pay {totalSub} $
                    </Button>
                </Grid>
            </Grid>
            
        </form>
    );

    const MobilePayment = ({ handleChange, handleOTPClick }) => (
        <div>
            {!isOTP ? <MobileComponent handleChange={handleChange} handleOTPClick={handleOTPClick} /> : <OTPComponent resNumber={resNumber} />}
        </div>
    );

    return (
        <>
            <Review cart={cart} shippingData={shippingData} totalSub={totalSub} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
            <RadioGroup aria-label="payment-method" name="payment-method" value={value} onChange={handleRadioChange} row gutterBottom style={{ 'marginBottom' : '20px' }}>
                <FormControlLabel value="card-payment" control={<Radio size="small" color="inherit"/>} label="Card Payment"/>
                <FormControlLabel value="mobile-payment" control={<Radio size="small" color="inherit" />} label="Add to your mobile bill" />
            </RadioGroup>
            { value == "card-payment" ? <CardPayment stripePromise={stripePromise}  handleSubmit={handleSubmit} backStep={backStep} totalSub={totalSub} />
                 : <MobilePayment handleChange={handleChange} handleOTPClick={handleOTPClick}/> }
        </>
    )
}

export default PaymentForm;
