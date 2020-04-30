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
<<<<<<< HEAD
  const [state, setstate] = useState({labeling:false, dataset:{},error:null,})


=======
  const [state, setstate] = useState({ dataset:{},error:null,})
  const [labeling,setlabeling]=[props.labeling.labeling,props.labeling.setlabeling]
>>>>>>> 0f0d6ebd35d0148c311742b789b1e3b39eb97107
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //get dataset description ... 
    axios({
      method: 'get',
      url: `http://localhost:5000/api/users/datasets/${props.name}`,
      config: { headers: {'Content-Type': 'application/json' }},
    
      })
      .then( (res)=> {
          if(res.data.success)
          {
            console.log(res.data)
            setstate(
              {
                ...state,
                dataset:{
                  name:res.data.name,
                  description:res.data.description,
                  rowPrice:"200",
                  completionRate:"0",
                  features:res.data.labels,
                  },
             
              }
            )
          }
          else{
            
          }
      })
      .catch(e=>{
          console.log(e)
      })
    },[])

  
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