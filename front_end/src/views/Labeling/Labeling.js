import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Container } from '@material-ui/core';
import LabelingCsv from "components/Labeling/LabelingCsv"
import Header from "components/Labeling/Header"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
}));

function Labeling({ match }) {

  const [labeling, setlabeling] = useState(false)
  const [state, setstate] = useState({ dataset: {}, error: null, })
  const classes = useStyles();

    useEffect(() => {
      const token = localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //get a single row of the dataset
      axios({
        method: 'get',
        url: `http://localhost:5000/api/datasets/${match.params.name}`,
        config: { headers: { 'Content-Type': 'application/json' } },
  
      })
        .then((res) => {
          if (res.data.success) {
            
            setstate(
              {
                ...state,
                dataset: res.data.dataset
              })
          }
          else {
            console.log("error" , res.data.message)
            setstate(
              {
                ...state,
                error: res.data.message
              }
            )
          }
        })
        .catch(e => {
          console.log("error",e)
        })
  
    }, [])



  return (

    <div className={classes.root}>
      {state.error && <p>{state.error}</p>}
      <Container  className={classes.flex_center}>
        <Header name={match.params.name} dataset={state.dataset}> </Header>
      </Container>

      <LabelingCsv name={match.params.name} dataset={state.dataset}>
      </LabelingCsv>
    </div>
  );
}
export default Labeling;