import { Avatar, Button, Container, Grid,Paper, Typography} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style.js'
import Input from './Input.js'
import { useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { signIn, signUp } from '../../actions/auth.js';
    const initalForm={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    }
const Auth = () => {
  const classes=useStyles();
  const [showPassword,setShowPassword]=React.useState(false);
  const [isSignup,setIsSignup]=React.useState(false);
  const [userForm,setUserForm]=React.useState(initalForm);
 const [ user, setUser ] = useState([]);
 const navigate=useNavigate();
  const dispatch=useDispatch();
 const handleShowPassword=()=>{
  setShowPassword((previ)=>!previ)
 }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignup) dispatch(signIn(userForm,dispatch));
    if(!isSignup) dispatch(signUp(userForm,dispatch));
  }

  const switchMode=()=>{
      setIsSignup((prev)=>!prev)
  }
  const handleChange=(e)=>{
    setUserForm({...userForm,[e.target.name]:e.target?.value})
  }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                      dispatch({type:"AUTH",data:res.data});
                      navigate('/')
                    })  
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
   
  return (
     <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        

        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
            <Button onClick={() => login()}>Sign in with Google 🚀 </Button>

          <Grid container justify="flex-end" >
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>

            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth