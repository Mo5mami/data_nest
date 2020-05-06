import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Link,BrowserRouter as Router,Switch} from 'react-router-dom'
import { Button } from "@material-ui/core";
import axios from 'axios'

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

  const [downloadStatus, setDownloadStatus] = useState(null)
  const [downloadMessage, setDownloadMessage] = useState(null)
  const classes = useStyles();
  const handleDownload = ()=>{
    console.log('i m here')
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios({
      method: 'get',
      url: `http://localhost:5000/api/datasets/download?name=${props.title}`,
      headers: {
        'Content-Type': 'application/json' 
      },
      })
      .then(  (response)=> {
        if(response.data.success==false){
          setDownloadStatus("failed")
          setDownloadMessage(response.data.message)
        }else{
        const type = response.headers['content-type']
        const url = window.URL.createObjectURL(new Blob([response.data],{ type: type, encoding: 'UTF-8' }));
        console.log(url)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',`${props.title}.csv`); //or any other extension
        document.body.appendChild(link);
        link.click();
        }
      })
      .catch(e=>{
          console.log(e)
      })
  }

  return (
    
      <div className={classes.datasetContainer}>
        
       
      <Link to={`/default/${props.title}`}>
        <div className={classes.titleContainer}>
          <span className={classes.datasetTitle}>{props.title}</span>
        </div>
        
        <div className={classes.descriptionContainer}>
         <span className={classes.datasetDescription}>
          {props.description}
         </span>
        </div>
        </Link>
        
        
        <br/>
        <div className={classes.pointsContainer}>
         <span className={classes.datasetPoints}>
          {props.points}points/row
         </span>
        </div>
        <br/>
        <div className="">
        <Button variant="contained" color="primary" onClick={handleDownload} disabled={props.percentage!==100}>
            Download
        </Button>
        {downloadMessage && <p>{downloadMessage}</p>}
        </div>
      </div>

     
     
      

      
     
   
  );
}
