import React,{useContext,useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "components/UModule/Copyright";
import { useForm } from "components/UModule/useForm";
import "assets/css/form.css";
import {validateSignUp} from "components/UModule/validate";
import { Redirect } from "react-router-dom"


//provider of user : 
import {UserContext} from '../context/UserContext'



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


export default function SignIn() {

  
  const {login} = useContext(UserContext)

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validateSignUp,
    "signup"
  );

  function submit(data,register) {
    register(data)
  }

  const classes = useStyles();

  const formInit = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };



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
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            className={`${errors.firstName && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="FirstName"
            
            id="firstName"
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <TextField
            className={`${errors.lastName && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="LastName"
            
            id="lastName"
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          
          <TextField
            className={`${errors.email && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            
            autoFocus
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          
         
          

          <TextField
            onChange={handleChange}
            className={`${errors.password && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            
            id="password"
            autoComplete="current-password"
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <TextField
            className={`${errors.confirmPassword && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="ConfirmPassword"
            type="password"
            
            id="confirmPassword"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
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
      {localStorage.getItem('token') && <Redirect to="/admin" />}
    </Container>
   
   
  );
}
