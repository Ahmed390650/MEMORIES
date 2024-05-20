import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from "./style";
import memories from '../../images/memories.png'
import React, { useEffect, useState } from 'react'
import { useNavigate ,Link, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const classes = useStyles();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const logout=()=>{
    navigate("/");
    dispatch({type:"LOGOUT"});
    setUser(null)
  }

  useEffect(()=>{
    const token=user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")))
  },[location])
  return (
     <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
         <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} alt="icon" src={memories} height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
            {
            user ? <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>
                {user.name}
              </Typography>
              <Button onClick={logout} variant='contained' className={classes.logout} color='secondary'>Logout</Button>
            </div> : 
              <Button component={Link} to='/auth' variant='contained' className={classes.logout} color='primary'>Sign in</Button>
            }
      </Toolbar>
      </AppBar>
  )
}

export default Navbar;