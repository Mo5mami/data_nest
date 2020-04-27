import React, { useState, useEffect,useContext } from "react";
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
import axios from "axios"
import {UserContext} from '../../context/UserContext'

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


  const initialState={
    rows: []
  }

  const [state, setstate] = useState(initialState)
  const {token} = useContext(UserContext)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const getDatasets= ()=>
  { console.log(token)
    axios({
      method: 'get',
      url: 'http://localhost:5000/users/datasets',
      headers: {
        'Content-Type': 'application/json' 
      },
      data:''
      })
      .then( (response)=> {
          if (response.data.success){
            console.log(response.data.datasets)
          }
          
      })
      .catch(e=>{
          console.log(e)
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
            columns = {columns1}
          rows = {state.rows}
          
            
            
            />
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
  );
}
