import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import DatasetTable from "components/DatasetTable/DatasetTable"

import axios from "axios"

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
});


export default function Dataset(props) {
  const classes = useStyles();
  const [datasets, setDatasets] = useState([])
  

  
  const getDatasets= ()=>
  { const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/datasets',
      headers: {
        'Content-Type': 'application/json' 
      },
      })
      .then( (response)=> {
          if (response.data.success){
            setDatasets(response.data.datasets)
          }
          
      })
      .catch(e=>{
          console.log(e)
      })
  }
  
  useEffect(()=>
    {
      getDatasets()
      
    },[]
  )

  return (
   <>
   <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Dataset List</h4>
            <h2 className={classes.cardCategoryWhite}>
              Get Your Points !
            </h2>
          </CardHeader>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <DatasetTable title="Dataset Mezyena1" description=" this is juste a static example : description of  datasets description of  
        datasets description of  datasets description of  datasets  " points="2"/>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <DatasetTable title="Dataset Mezyena2" description=" this is juste a static example : description of  datasets description of  
        datasets description of  datasets description of  datasets  " points="2"/>
      </GridItem>
      <h1>Datasets from db </h1>
      {datasets.map(dataset=>
        <GridItem key={dataset._id} xs={12} sm={12} md={12}>
        <DatasetTable title={dataset.name} description={dataset.description} points={dataset.points} percentage={dataset.percentage}/>
      </GridItem>
      )}

      </GridContainer>
   </>
  );
}


