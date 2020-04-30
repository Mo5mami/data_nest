import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Link,BrowserRouter as Router,Switch,Redirect} from 'react-router-dom'


const styles = {
 
  datasetContainer:{
    display: "block",
    padding: "28px 84px 28px 14px",
    position: "relative",
    backgroundColor:"white",
    boxShadow: "none !important",
    marginBottom: "25px",
    borderBottom: "1px solid #dadada",
  },
  datasetTitle:{
    color:"black",
    fontSize:"30px",
    "&:hover" :{
      textDecoration:"underline"
    }
    
  },
  datasetDescription:{
    color:"#352d2d"

  },
  datasetPoints:{
    color:"#02c4ff",
    fontSize:"22px"
  }
  
};
const useStyles = makeStyles(styles);

export default function DatasetTable(props) {

  const classes = useStyles();

  return (
    
      <Router>
        <Switch>
      <Link to={`/default/${props.title}`}  className={classes.datasetContainer}>
        <div className={classes.titleContainer}>
          <span className={classes.datasetTitle}>{props.title}</span>
        </div>
        
        <div className={classes.descriptionContainer}>
         <span className={classes.datasetDescription}>
          {props.description}
         </span>
        </div>
        <br/>
        <div className={classes.pointsContainer}>
         <span className={classes.datasetPoints}>
          {props.points}points/row
         </span>
        </div>

      </Link>
      </Switch>
      </Router>

      
     
   
  );
}
