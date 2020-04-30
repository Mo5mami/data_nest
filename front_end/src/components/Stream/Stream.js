import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
  const [state, setstate] = useState({ data:{},option:"", tableHead:[],tableContent:[],dataset:{}})
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(props.name)
    //get dataset (row price , price,description , labels ...)
    axios({
      method: 'get',
      url: `http://localhost:5000/api/users/datasets/${props.name}`,
      config: { headers: {'Content-Type': 'application/json' }},
    
      })
      .then( (res)=> {
          if(res.data.success)
          { 
            setstate({...state,dataset:res.data.dataset})
            
          }
          
      })
      .catch(e=>{
          console.log(e)
      })
      
  }, [])
  const classes = useStyles();
  
 
  
  
  console.log("ahmed")

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