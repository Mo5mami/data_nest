<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React from "react";
>>>>>>> origin
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DatasetTable from "components/DatasetTable/DatasetTable";
<<<<<<< HEAD
import axios from "axios"
=======
>>>>>>> origin

const styles = {
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
};

const useStyles = makeStyles(styles);

export default function Dataset() {
<<<<<<< HEAD


  const initialState={
    rows: []
  }

  const [state, setstate] = useState(initialState)
  
  const getDatasets= ()=>
  {
    const url="https://jsonplaceholder.typicode.com/posts"
    axios.get(url).then(
      response =>
      {
        console.log("status 200")
        console.log("response ",response.data)
        setstate({...state,rows:response.data})
      }).catch(err=>
        {
          console.log("error ",err)
      })

    
  }
  
  useEffect(()=>
    {
      getDatasets()
      
    },
    []
  )

  const columns=[
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
   
    {
      id: 'type',
      label: 'type',
      minWidth: 170,
      align: 'right',
      
    },
    {
      id: 'Price',
      label: 'Price',
      minWidth: 170,
      align: 'right',
      
    },
  ]
  const columns1=[
    { id: 'userId', label: 'userId', minWidth: 170 },
    { id: 'id', label: 'id', minWidth: 100 },
   
    {
      id: 'title',
      label: 'title',
      minWidth: 170,
      align: 'right',
      
    },
    {
      id: 'body',
      label: 'body',
      minWidth: 170,
      align: 'right',
      
    },
  ]
=======
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
>>>>>>> origin

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Datasets List</h4>
            <p className={classes.cardCategoryWhite}>
              Hi
            </p>
          </CardHeader>
          <CardBody>
            <DatasetTable 
<<<<<<< HEAD
            columns = {columns1}
          rows = {state.rows}
=======
            columns = {[
              { id: 'name', label: 'Name', minWidth: 170 },
              { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
              {
                id: 'population',
                label: 'Population',
                minWidth: 170,
                align: 'right',
                
              },
              {
                id: 'size',
                label: 'Size\u00a0(km\u00b2)',
                minWidth: 170,
                align: 'right',
                
              },
              {
                id: 'density',
                label: 'Density',
                minWidth: 170,
                align: 'right',
                
              },
            ]
          }
          rows = {[
            createData('India', 'IN', 1324171354, 3287263),
            createData('China', 'CN', 1403500365, 9596961),
            createData('Italy', 'IT', 60483973, 301340),
            createData('United States', 'US', 327167434, 9833520),
            createData('Canada', 'CA', 37602103, 9984670),
            createData('Australia', 'AU', 25475400, 7692024),
            createData('Germany', 'DE', 83019200, 357578),
            createData('Ireland', 'IE', 4857000, 70273),
            createData('Mexico', 'MX', 126577691, 1972550),
            createData('Japan', 'JP', 126317000, 377973),
            createData('France', 'FR', 67022000, 640679),
            createData('United Kingdom', 'GB', 67545757, 242495),
            createData('Russia', 'RU', 146793744, 17098246),
            createData('Nigeria', 'NG', 200962417, 923768),
            createData('Brazil', 'BR', 210147125, 8515767),
          ]
        }
>>>>>>> origin
          
            
            
            />
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
  );
}
