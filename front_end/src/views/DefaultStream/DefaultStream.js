import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import DefaultTable from 'components/DefaultTable/DefaultTable';
import { TextField, TextareaAutosize, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Stream from 'components/Stream/Stream';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function DefaultStream({match}) 
{
  const [state, setstate] = useState({ data:{},option:"", tableHead:[],tableContent:[],error:null,dataset:{}})
  
  
 


  
  const classes = useStyles();
  
 
  
  const autoC=()=>
  {
    if (state.option in state.data)
    {
      console.log("true : ",state.data[state.option])
      return state.data[state.option]
    }
    return ""
  }
 
 console.log(state.data)
  
  

  return (
    
    <React.Fragment>
      {state.error && <p>{state.error}</p>}
      
      <Stream name={match.params.name}>
    
    <div className={classes.root}>

    
    <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
      <Grid item >
        <DefaultTable rows={[state.tableContent]}  columns={state.tableHead}>

        </DefaultTable>
        </Grid>
      


      
        <Grid item >
         
      <Autocomplete
        value={state.option}
        onChange={(event, option) => {
          setstate({...state,option: option})
          console.log("option : ",state.option)
        }}
        id="combo-box-demo"
        options={state.tableHead}
        getOptionLabel={(option) => option}
        style={{ width: 500 ,display: "inline-block"}}
        renderInput={(params) => {
          
          return <TextField {...params} label="Columns box" variant="outlined" align="center"/>
        }}
      />
      </Grid>
      
    
      
      <Grid item  justify="center" alignItems="center">
        <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder={autoC()} style={{width :500}} InputProps={{readOnly: true,}}/>
        
      </Grid>
      </Grid>
      
    </div>
   
    </Stream>
    </React.Fragment>
  );
}
export default DefaultStream;