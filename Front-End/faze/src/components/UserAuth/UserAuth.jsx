import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Radio, RadioGroup, FormLabel, FormControlLabel, Paper } from '@material-ui/core/';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = { username: '', email: '', password: '', confirmPassword: '', age: '', usertype: 'Buyer', mobile_number: '' };
  
const UserAuth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState('Buyer');
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            if (formData.password == formData.confirmPassword) {
                dispatch(signup(formData, history));
                console.log(formData);
            } else {
                setError(true);
                setErrorMessage("Passwords does not match.");
                console.log("Passwords does not match.");
            }
           
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {

        setValue(e.target.value);

        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        setErrorMessage("");
        setError(false);

        // if (formData.email === "") {
        //     setErrorMessage("Please enter a email");
        //     setError(true);
        // }

        if (!(formData.password + 1)) {
            setError(false);
        } else {
            if (formData.password.length >= 6) {
                // passwordIsValid = true;
                setError(false);
                setErrorMessage("");
            } else if (formData.password.length < 6)  {
                setError(true);
                setErrorMessage("Your password must be at least 7 characters");
            } else if (!formData.password.length){
                setError(true);
                setErrorMessage("Please enter a password.");
            } 
        }

    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    return (
        <div className={classes.body}>
        <div className={classes.toolbar} />
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="primary" gutterBottom>{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                        <Input
                            name="username"
                            label="Full Name"
                            handleChange={handleChange}            
                        />
                    </>
                    )}
                        <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
                        <Input name="password" label="Password" handleChange={handleChange} helperText={errorMessage} error={error} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && 
                            <Input name="confirmPassword" label="Repeat Password" error={error} type="password" handleChange={handleChange} />
                        }
                        { isSignup && 
                            <>
                                <Input name="age" label="Age" handleChange={handleChange} half />
                                <Input name="mobile_numbe" label="Mobile Number" handleChange={handleChange} half />
                            </>
                        }
                        { isSignup && 
                            <>
                                <Typography variant="h8" color="primary" className={classes.radiogroup}>Choose account type</Typography>
                                <Grid container justify="center" spacing={2} gutterBottom>
                                    <RadioGroup aria-label="usertype" name="usertype" row value={value} onChange={handleChange}>
                                        <Grid item xs>
                                            <FormControlLabel value="Buyer" control={<Radio color="primary" />} label="Buyer" />
                                        </Grid>
                                        <Grid item xs>
                                            <FormControlLabel value="Seller" control={<Radio color="primary" />} label="Seller" />
                                        </Grid>
                                    </RadioGroup>
                                </Grid>
                            </>
                        }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={error}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode} color="primary" size="small">
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
           
        </div>
    );
}
export default UserAuth;
