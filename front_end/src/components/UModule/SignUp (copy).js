import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  Copyright  from "./Copyright";
import {useState,useEffect} from 'react'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();


const formInit=
{
  firstName : '',
  lastName : '',
  username : '',
  email : '',
  password : '',
  confirmPassword : '',
  address:"",
  birth: "",

}

const [formObject, setFormObject] = useState(formInit)

/*useEffect(() => {
  // POST request using fetch inside useEffect React hook
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form })
  };
  fetch('/signup/result', requestOptions)
      .then(response => response.json())
      .then(data => setPostId(data.id));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
*/


/*onSubmit=(e)=> (
  //e.preventDefault()

  fetch( {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
  }),
  setFormObject(formInit),
)*/





  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign UP
        </Typography>
        <form className={classes.form} noValidate method="GET" action="/signupResult/">
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="FirstName"
            value={formObject.firstName}
            onChange={e=>setFormObject({ ...formObject, firstName: e.target.firstName })}
            id="firstName"
            
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="LastName"
            value={formObject.lastName}
            onChange={e=>setFormObject({ ...formObject, lastName: e.target.lastName })}
            id="lastName"
            
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            value={formObject.username}
            onChange={e=>setFormObject({ ...formObject, username: e.target.username })}
            id="username"
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formObject.email}
            onChange={e=>setFormObject({ ...formObject, email: e.target.email })}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="birth"
            label="Birth"
            name="birth"
            type="date"
            value={formObject.birth}
            onChange={e=>setFormObject({ ...formObject, birth: e.target.birth })}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            value={formObject.address}
            onChange={e=>setFormObject({ ...formObject, address: e.target.address })}
            
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formObject.password}
            onChange={e=>setFormObject({ ...formObject, password: e.target.password })}
            id="password"
            autoComplete="current-password"

          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="ConfirmPassword"
            type="password"
            value={formObject.confirmPassword}
            onChange={e=>setFormObject({ ...formObject, confirmPassword: e.target.confirmPassword })}
            id="confirmPassword"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign UP
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/signin" variant="body2">
                Already have an account?
              </Link>
            </Grid>
            
            
          </Grid>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}