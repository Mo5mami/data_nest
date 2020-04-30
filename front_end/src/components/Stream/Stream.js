import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TextField, TextareaAutosize, Grid, Container, ButtonGroup, Button } from '@material-ui/core';
import ControlButton from 'components/ControlButtons/ControlButton';
import StreamHead from "./StreamHead"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bg :{
    //backgroundColor: "#ffe8df",
    //background: "rgb(255,255,255)",
    //background: "linear-gradient(0deg, rgba(255,255,255,0) 32%, rgba(255,210,147,1) 80%, rgba(255,198,118,1) 100%)",
    
  },
  flex_center:{
    display: "inline-flex",
    "justify-content": "center",
  },
  like_btn: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function Stream(props) 
{
 
  const classes = useStyles();
  const [state, setstate] = useState({ dataset:{},error:null,})
  const [labeling,setlabeling]=[props.labeling.labeling,props.labeling.setlabeling]
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //get a single row of the dataset
    axios({
      method: 'get',
      url: `url`,
      config: { headers: {'Content-Type': 'application/json' }},
    
      })
      .then( (res)=> {
          if(res.data.success)
          {
            setstate(
            {
              ...state , 
              dataset:res.data,
            })
          }
          else{
            setstate(
              {
                ...state,
                error:res.data.message
              }
            )
          }
      })
      .catch(e=>{
          //console.log(e),
          setstate(
              {
                ...state,
                dataset:{
                  name:"name",
                  description:"this is a dataset with the name dataset blllllllaaaaaaaaa blllllllllaaaaaaaaaaa bllllllllllllllllaaaaaaa",
                  rowPrice:"200",
                  completionRate:"0",
                  features:['1','2','3'],
                  },
             
              }
            )
      })
    
  }, [])
  
  const handleLabeling=()=>
  {
    setlabeling(true)
  }
  
  
  const labelingHandeling=()=>
  {
    console.log("labeling : ",labeling)
    if(labeling===false){
      return (
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
      <Grid item >

    <Button variant="contained" color="secondary" onClick={handleLabeling}>
      Start Labeling
    </Button>
      
    </Grid></Grid>
        
      )
    }

    return(
      <React.Fragment>
      <Container maxWidth="false" className={classes.flex_center}>
    {props.children}
    </Container>
    <br /> <br /> 
    <ControlButton features={state.dataset.features}> </ControlButton>
    </React.Fragment>
    )
  }

  return (
    <React.Fragment>

    <div className={"jumbotron text-center "+classes.bg}>
      <h1 className={classes.like_btn}>Labeling data as easy as it never was</h1>
      
      <StreamHead dataset={state.dataset}> </StreamHead>
    </div>
    {labelingHandeling()}
    </React.Fragment>
  );
}
export default Stream;