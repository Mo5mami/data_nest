import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Paper,Grid,  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  like_btn: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function Header(props) {
  const classes = useStyles();



  return (

    <React.Fragment>
      <div className={"jumbotron text-center " + classes.bg}>
        <h1 className={classes.like_btn}>Labeling data as easy as it never was</h1>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}> <h4 className={classes.like_btn}>Dataset Name</h4>  {props.dataset.name}</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}> <h4 className={classes.like_btn}>Dataset Row Price</h4>  {props.dataset.rowPrice}</Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}><h4 className={classes.like_btn}>Dataset Description </h4> {props.dataset.description}</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}> <h4 className={classes.like_btn}>Dataset Completion Rate</h4>  {props.dataset.completionRate} %</Paper>
            </Grid>

          </Grid>
        </div></div>
    </React.Fragment>
  )
}

export default Header