import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Container } from '@material-ui/core';
import LabelingCsv from "components/Labeling/LabelingCsv"
import Header from "components/Labeling/Header"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
      url: `url`,
      config: { headers: { 'Content-Type': 'application/json' } },

    })
      .then((res) => {
        if (res.data.success) {
          setstate(
            {
              ...state,
              dataset: res.data,
            })
        }
        else {
          setstate(
            {
              ...state,
              error: res.data.message
            }
          )
        }
      })
      .catch(e => {
        //console.log(e),
        setstate(
          {
            ...state,
            dataset: {
              name: "name",
              description: "this is a dataset with the name dataset blllllllaaaaaaaaa blllllllllaaaaaaaaaaa bllllllllllllllllaaaaaaa",
              rowPrice: "200",
              completionRate: "0",
              features: ['1', '2', '3'],
              type: "text"
            },

          }
        )
      })

  }, [])



  return (

    <React.Fragment>
      {state.error && <p>{state.error}</p>}
      <Container maxWidth="false" className={classes.flex_center}>
        <Header name={match.params.name} dataset={state.dataset}> </Header>
      </Container>

      <LabelingCsv name={match.params.name} dataset={state.dataset}>
      </LabelingCsv>
    </React.Fragment>
  );
}
export default Labeling;