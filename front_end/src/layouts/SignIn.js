import React,{useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import {validateSignIn} from "components/UModule/validate";
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

  const {login,error} = useContext(UserContext)
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validateSignIn,
    "signin"
  );
  
  function submit(data , flogin) {
    flogin(data)
  }
  const classes = useStyles();

  const formInit = {
    email: "",
    password: ""
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign IN
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
          {error && <p className="error">{error}</p>}
          <FormControlLabel
            control={<Checkbox value={true} color="primary" />}
            label="Remember me"
            name="remember"
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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
