import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { TextField, TextareaAutosize, Grid, Container, ButtonGroup, Button } from '@material-ui/core';
import ControlButton from 'components/ControlButtons/ControlButton';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bg :{
    //backgroundColor: "#ffe8df",
    background: "rgb(255,255,255)",
    background: "linear-gradient(0deg, rgba(255,255,255,0) 32%, rgba(255,210,147,1) 80%, rgba(255,198,118,1) 100%)",
    
  },
  flex_center:{
    display: "inline-flex",
    "justify-content": "center",
  },
}));

function Stream(props) 
{
  const [state, setstate] = useState({ data:{},option:"", tableHead:[],tableContent:[]})
  
  useEffect(() => {
    Axios
			.get(`https://jsonplaceholder.typicode.com/posts/1`)
			.then(res => {
        //console.log(res.data)
        setstate(
          {
            ...state , 
            tableHead:Object.keys(res.data),
            tableContent:Object.values(res.data),
            data:res.data
          })
        //console.log(state.tableHead)
        console.log(res.data)
			})
      
  }, [])
  const classes = useStyles();
  
 
  
  
  

  return (
    <React.Fragment>

    <div className={"jumbotron text-center "+classes.bg}>
      <h2>Labeling data as easy as it never was</h2>
      
      <p className="lead">
      <TextField
          id="standard-read-only-input"
          label="Row Price"
          value={props.rowPrice}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Dataset Price"
          value={props.datasetPrice}
          InputProps={{
            readOnly: true,
          }}
        />
      </p>
    </div>
    <Container maxWidth="false" className={classes.flex_center}>
    {props.children}
    </Container>
    <br /> <br /> 
    <ControlButton features={props.features}> </ControlButton>
    </React.Fragment>
  );
}
export default Stream;