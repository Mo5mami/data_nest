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
  
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //get a single row of the dataset
    axios({
      method: 'get',
      url: `http://localhost:5000/api/users/datasets/${match.params.name}/labeling`,
      config: { headers: {'Content-Type': 'application/json' }},
    
      })
      .then( (res)=> {
          if(res.data.success)
          {
            setstate(
            {
              ...state , 
              tableHead:Object.keys(res.data.row),
              tableContent:Object.values(res.data.row),
              data:res.data.row
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
          console.log(e)
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
 
 console.log(state.data)
  const features=['1','2','3']
  const rowPrice=200 //baddal lenna
  const datasetPrice=22200 //baddal lenna

  

  return (
    
    <React.Fragment>
      {state.error && <p>{state.error}</p>}
      
      <Stream features={features} rowPrice={rowPrice} datasetPrice={datasetPrice} name={match.params.name}>
    
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