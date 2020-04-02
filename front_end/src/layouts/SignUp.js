import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
import { useState, useEffect } from "react";
import { useForm } from "components/UModule/useForm";
import "assets/css/form.css";
import validate from "components/UModule/validateLogin";
import {
  Select,
  option,
  InputLabel,
  FormControl,
  NativeSelect
} from "@material-ui/core";


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
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );
  function submit() {
    console.log("Submitted Succesfully");
  }

  const classes = useStyles();

  const formInit = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    birth: "",
    gender: "None"
  };

  const axios = require("axios").default;
  //const { register } = useForm();

  /*const onSubmit = (data, e) => {
    //console.log('Submit event', e)
    console.log(JSON.stringify(data))
    axios.post(
      "http://127.0.0.1:8000/result",
      data).then(
        response=> console.log(response)
      )
    

  };*/

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
            // inputRef={register}
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
            // inputRef={register}
            id="lastName"
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <TextField
            className={`${errors.username && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            // inputRef={register}
            id="username"
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

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
            //inputRef={register}
            autoFocus
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <TextField
            className={`${errors.birth && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="birth"
            label="Birth"
            name="birth"
            //inputRef={register}
            type="date"
            onChange={handleChange}
          />
          {errors.birth && <p className="error">{errors.birth}</p>}

          <TextField
            className={`${errors.address && "inputError"}`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            //inputRef={register}
            id="address"
            onChange={handleChange}
          />

          {errors.address && <p className="error">{errors.address}</p>}

          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
            required
          >
            <InputLabel htmlFor="outlined-Gender-native-simple">
              Gender
            </InputLabel>
            <Select
              native
              label="Gender"
              //inputRef={register}
              inputProps={{
                name: "gender",
                id: "outlined-Gender-native-simple"
              }}
            >
              <option value="None">None</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>

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
            //inputRef={register}
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
            //inputRef={register}
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
    </Container>
  );
}
