import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
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

function DefaultStream() 
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
  
 
  
  const autoC=()=>
  {
    if (state.option in state.data)
    {
      console.log("true : ",state.data[state.option])
      return state.data[state.option]
    }
    return ""
  }
  const features=["1","2","0"] //baddal lenna
  const rowPrice=200 //baddal lenna
  const datasetPrice=22200 //baddal lenna

  

  return (
    <React.Fragment>
      <Stream features={features} rowPrice={rowPrice} datasetPrice={datasetPrice}>
    
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