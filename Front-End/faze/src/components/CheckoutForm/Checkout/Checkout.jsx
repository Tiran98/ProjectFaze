import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, error, totalSub, handleEmptyCart, setOrder }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const QontoConnector = withStyles({
        alternativeLabel: {
          top: 10,
          left: 'calc(-50% + 16px)',
          right: 'calc(50% + 16px)',
        },
        active: {
          '& $line': {
            borderColor: '#4a4a4a',
          },
        },
        completed: {
          '& $line': {
            borderColor: '#4a4a4a',
          },
        },
        line: {
          borderColor: '#eaeaf0',
          borderTopWidth: 3,
          borderRadius: 1,
        },
      })(StepConnector);
      
      const useQontoStepIconStyles = makeStyles({
        root: {
          color: '#eaeaf0',
          display: 'flex',
          height: 22,
          alignItems: 'center',
        },
        active: {
          color: '#000000',
        },
        circle: {
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
        completed: {
          color: '#ff0000',
          zIndex: 1,
          fontSize: 18,
        },
      });
      
      function QontoStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const { active, completed } = props;
      
        return (
          <div
            className={clsx(classes.root, {
              [classes.active]: active,
            })}
          >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
          </div>
        );
      }

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    

    const test = (data) => {
        setShippingData(data);

        // dispatch(orderAdd(shippingData, history));

        nextStep();
    };
    
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    console.log(order);

    let Confirmation = () => true ? (
        <>  
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.buyer_firstName} {order.buyer_lastName}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.order_ref}</Typography>
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/home">Back to home</Button>
        </>
    ) : isFinished ? (
        <>  
            <div>
                <Typography variant="h5">Thank you for your purchase!</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/home">Back to home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/home">Back to home</Button>  
        </>
    }

    const Form = () => (activeStep === 0
        ? <AddressForm  nextStep={nextStep} setShippingData={setShippingData} test={test} />
        : <PaymentForm 
            shippingData={shippingData}  
            nextStep={nextStep} 
            backStep={backStep} 
            timeout={timeout}
            cart={cart}
            setOrder={setOrder}
            totalSub={totalSub}
            handleEmptyCart={handleEmptyCart}
          />     
    );

    return (
        <>
        <CssBaseline />
           <div className={classes.body}>
           <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper} connector={<QontoConnector />}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : true && <Form />}
                </Paper>
            </main>
           </div>
        </>
    )
}

export default Checkout
