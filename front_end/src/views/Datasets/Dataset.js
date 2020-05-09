import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import DatasetTable from "components/DatasetTable/DatasetTable"

import axios from "axios"
import { BottomNavigation, Container } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';

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
  const [state, setstate] = useState({datasetType:"all",displayDataset:[]})

  
  const getDatasets= ()=>
  { const token = localStorage.getItem('token')
    //console.log("token : ",token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let url='http://localhost:5000/api/datasets'
    
    
    axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json' 
      },
      })
      .then( (response)=> {
          if (response.data.success){
            setDatasets(response.data.datasets)
            setstate({...state,displayDataset:response.data.datasets})
          }
          
      })
      .catch(e=>{
          console.log(e)
      })
  }
  
  useEffect(()=>
    { console.log(localStorage)
      getDatasets()
      
    },[]
  )
  const filterDataset=(type)=>
  {
    if(type==="all")
      setstate({...state,datasetType:type,displayDataset:datasets})
    if(type==="me")
    {
      let user=JSON.parse( localStorage.getItem('user'))
      
      setstate({...state,datasetType:type,displayDataset:datasets.filter(element => 
        {
         
          return element.owner===user["_id"]
        }
      )})
    }
  }
  const handleType=(e,val)=>
  {
   
    filterDataset(val)
   
  }

  return (
   <React.Fragment>
   <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Dataset List</h4>
            
          </CardHeader>
        </Card>
      </GridItem>
      <GridItem xs={8} sm={8} md={8}></GridItem>
      <GridItem style={{marginBottom:"20px"}} xs={4} sm={4} md={4}>
        <BottomNavigation style={{backgroundColor:"#00acc1"}}
              value={state.datasetType}
              onChange={handleType}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction className="text-white ml-3" value="all" label="All Datasets"  />
              <BottomNavigationAction className="text-white ml-3" value="me" label="My Datasets"  />
              
            </BottomNavigation>
         
      </GridItem>

     
      {state.displayDataset.map(dataset=>
        <GridItem key={dataset._id} xs={12} sm={12} md={12}>
        <DatasetTable title={dataset.name} description={dataset.description} points={dataset.points} percentage={dataset.percentage}/>
      </GridItem>
      )}

      </GridContainer>
      
      </React.Fragment>
  );

}


