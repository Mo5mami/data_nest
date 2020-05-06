import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TextField, TextareaAutosize, Grid, Container, ButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, FormHelperText, Select, MenuItem, DialogActions } from '@material-ui/core';
//import ControlButton from 'components/ControlButtons/ControlButton';
import DefaultTable from 'components/DefaultTable/DefaultTable';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bg: {
    //backgroundColor: "#ffe8df",
    //background: "rgb(255,255,255)",
    //background: "linear-gradient(0deg, rgba(255,255,255,0) 32%, rgba(255,210,147,1) 80%, rgba(255,198,118,1) 100%)",
  },
  flex_center: {
    display: "inline-flex",
    "justify-content": "center",
  },
  like_btn: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function LabelingCsv(props) {
  const [state, setstate] = useState({ row_id:null,data: {}, option: "", error: null, dataset: {} })
  const [labeling, setlabeling] = useState(false)
  const [label, setlabel] = useState("")
  const [redirect, setredirect] = useState(false)
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const updateLabel=(label,callback)=>{
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //get a single row of the dataset
    axios({
      method: 'put',
      url: `http://localhost:5000/api/datasets/${props.name}/labeling/${state.row_id}`,
      config: { headers: { 'Content-Type': 'application/json' } },
      data:{label:label}

    })
      .then((res) => {
        if (res.data.success) {
          setstate(
            {
              ...state,
              message:res.data.message
            })
            let user = JSON.parse(localStorage.getItem('user'))
            user.points += props.dataset.points
            localStorage.setItem('user',JSON.stringify(user))
            callback()
          
        }
        else {
          setstate(
            {
              ...state,
              error: res.data.message,
            })
          console.log("data error : ", res.data)
        }
      })
      .catch(e => {
        console.log("erreur : ", e)
      })
  }

  const getRow = () => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //get a single row of the dataset
    axios({
      method: 'get',
      url: `http://localhost:5000/api/datasets/${props.name}/labeling`,
      config: { headers: { 'Content-Type': 'application/json' } },

    })
      .then((res) => {
        if (res.data.success) {
          setstate(
            {
              ...state,
              data: res.data.row,
              row_id: res.data._id
            })
             
        }
        else {
          setstate(
            {
              ...state,
              data:{},
              error: res.data.message,
            })
          console.log("data error : ", res.data)
        }
      })
      .catch(e => {
        console.log("erreur : ", e)
      })
  }

  
  const body = () => {
    if (props.dataset.type === "2d") {
      return (
        <React.Fragment>
          <div className={classes.root}>
          <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
            <Grid item >
              <DefaultTable rows={[Object.values(state.data)]} columns={Object.keys(state.data)}>
              </DefaultTable>
            </Grid>
            <Grid item >
              <Autocomplete
                value={state.option}
                onChange={(event, option) => {
                  setstate({ ...state, option: option })
                  console.log("option : ", state.option)
                }}
                id="combo-box-demo"
                options={Object.keys(state.data)}
                getOptionLabel={(option) => option}
                style={{ width: 500, display: "inline-block" }}
                renderInput={(params) => {
                  return <TextField {...params} label="Columns box" variant="outlined" align="center" />
                }}
              />
            </Grid>
            <Grid item  >
              <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder={autoC()} style={{ width: 500 }} inputprops={{ readOnly: true, }} />
            </Grid>
            </Grid>
          </div>
        </React.Fragment>
      )
    }
    if (props.dataset.type === "images") {
      return (
        <React.Fragment>
          <img src={String(state.data.URL).substring(10)} className="img-fluid" alt="image test" style={{height:"300px",width:"300px"}}/>
      </React.Fragment>
      )
    }
  }



  const submitOff = () => {
    if (label === false)
      return (
        <Button onClick={handleSubmit} color="primary" disabled>
          Submit
        </Button>
      )

    return (
      <Button onClick={handleSubmit} color="primary" >
        Submit
      </Button>
    )
  }

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setlabel("no")
    setOpen(false);
  };
  const handleSkip = () => {
    getRow()

  };

  const handleExit = () => {
   
    setredirect(true)
  }

  const handleSubmit = (event) => {
    setOpen(false)
    updateLabel(label,getRow)
  }

  const handleChange = (event) => {
    
    setlabel(event.target.value)
  }


  const labelingHandeling = () => {
    
    if (labeling === false) {
      return (
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
          <Grid item >
            <Button variant="contained" color="secondary" onClick={handleLabeling}>
              Start Labeling
            </Button>
          </Grid>
        </Grid>
      )
    }
    return (
      <React.Fragment> 
        {body()}
        <br /><br />
        <Container>
          <div >
            <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
              <Grid item >
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                  <Button onClick={handleSkip}>Skip</Button>
                  <Button size="large" color="primary" aria-label="large primary button" variant="outlined" onClick={handleClickOpen}>
                    Submit Label
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Submit Label</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Fill with the correct Label
                       </DialogContentText>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                          Label
                        </InputLabel>
                        <Select

                          id="demo-simple-select-placeholder-label"
                          value={label}
                          onChange={handleChange}
                          displayEmpty
                          className={classes.selectEmpty}>
                          {props.dataset.labels.map((value, key) => {
                            return <MenuItem key={key} value={value}>{value}</MenuItem>
                          }
                          )}

                        </Select>
                        <FormHelperText>Choose the right label</FormHelperText>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      {submitOff()}

                    </DialogActions>
                  </Dialog>
                  <Button onClick={handleExit}>Exit</Button>
                </ButtonGroup>
              </Grid></Grid>
          </div>
        </Container>
      </React.Fragment>
    )
  }


  const autoC = () => {
    if (state.option in state.data) {
      console.log("true : ", state.data[state.option])
      return state.data[state.option]
    }
    return ""
  }



  const handleLabeling = () => {
    getRow()
    setlabeling(true)
  }


  return (
    <React.Fragment>
      {state.error && <h1 style={{color:"red"}}>{state.error}</h1>}
      <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
        {labelingHandeling()}
      </Grid>
      {redirect && <Redirect to="/admin"/>}
    </React.Fragment>
  );
}
export default LabelingCsv;