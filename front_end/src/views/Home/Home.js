import React from "react";
import { useContext , useEffect,useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { UserContext } from "../../context/UserContext";
import avatar from "assets/img/faces/marc.jpg";
import Table from "components/Table/Table.js";

import DataSets from "components/Datasets/DataSets.js";
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { contributions } from "variables/general.js";
import Contributions from "components/Contributions/Contributions";
import axios from 'axios'
import {Link} from 'react-router-dom'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },

  miniTitre: {
    textAlign: "left",
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#534c4c",
    marginLeft: "20px",
  },
  labelButton: {
    color: "#534c4c",
    fontWeight: "500",
    marginLeft: "10px",
  },
};




const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();
  const [myContributions, setMyContributions] = useState([])
  const [myDatasets, setMyDatasets] = useState([])
  const [allDatasets, setAllDatasets] = useState([])

  useEffect( ()=>{
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //get myDatasets 
     axios({
      method: 'get',
      url: 'http://localhost:5000/api/mydatasets/?number=3',
      headers: {
        'Content-Type': 'application/json' 
      },
      })
      .then( (response)=> {
          if (response.data.success){
            console.log(response.data)
            setMyDatasets(response.data.datasets)
          }
          
      })
      .catch(e=>{
          console.log(e)
      })

    //get all datasets 
     axios({
        method: 'get',
        url: 'http://localhost:5000/api/datasets/?number=3',
        headers: {
          'Content-Type': 'application/json' 
        },
      })
      .then( (response)=> {
            if (response.data.success){
              console.log(response.data)
              setAllDatasets(response.data.datasets)
            }
            
      })
      .catch(e=>{
            console.log(e)
      })

    //get contributions of user connected
     axios({
      method: 'get',
      url: 'http://localhost:5000/api/users/contributions',
      headers: {
        'Content-Type': 'application/json' 
      },
      })
      .then( (response)=> {
          if (response.data.success){
           
            setMyContributions(response.data.contributions)
          }
          
      })
      .catch(e=>{
          console.log(e)
      })
  

  },[])

  

  return (
    
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>My Datasets</h4>
                </CardHeader>
                <CardBody>
                  <DataSets DataSets={myDatasets} />
                </CardBody>
                <CardFooter>
                  <Link to='/admin/datasets'>
                  <Button color="primary">See All</Button>
                  </Link>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>My Contributions</h4>
                </CardHeader>
                <CardBody>
                  <Contributions contributions={myContributions} />
                </CardBody>
                <CardFooter>
                  <Link to='/admin/datasets'>
                  <Button color="primary">See All</Button>
                  </Link>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>All Datasets</h4>
                </CardHeader>
                <CardBody>
                  <DataSets DataSets={allDatasets} />
                </CardBody>
                <CardFooter>
                <Link to='/admin/datasets'>
                  <Button color="primary">See All</Button>
                  </Link>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>



        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Backend Developer</h6>
              <h4 className={classes.cardTitle}>
                
              </h4>
              <p className={classes.description}>
                this is an example how to use UserContext to get variables like
                username or email...
              </p>
              <Button color="primary" round>
                Follow
              </Button>

              <h3 className={classes.miniTitre}>Raccourcis</h3>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <IconButton
                    aria-label="Mes factures"
                    className={classes.tableActionButton}
                  >
                    <DescriptionIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                  <p className={classes.labelButton}>Mes factures</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {" "}
                  <IconButton
                    aria-label="catalog"
                    className={classes.tableActionButton}
                  >
                    <MenuBookIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                  <p className={classes.labelButton}>catalog of Datasets</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <IconButton
                    aria-label="manage my points"
                    className={classes.tableActionButton}
                  >
                    <CardGiftcardIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                  <p className={classes.labelButton}>Manage my points</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {" "}
                  <IconButton
                    aria-label="assistance"
                    className={classes.tableActionButton}
                  >
                    <ContactSupportIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                  <p className={classes.labelButton}>Assistance</p>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>


      </GridContainer>
    
  );
}
