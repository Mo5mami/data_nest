import React,{useState} from 'react'
import axios from 'axios'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from '@material-ui/core/styles';


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

function UploadDataset() {
    const [state, setstate] = useState({name:"",type:"",points:"",description:"",files:[],numberOfLabels:0,arrayOfLabels:{}})
    const [total, setTotal] = useState(0)

    const classes = useStyles();
    const onSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        console.log(state.files)
        formData.set('type',state.type)
        formData.set('name',state.name)
        formData.set('description',state.description)
        formData.set('points',state.points)
        //hedha pour le moment khalito statique
        formData.set('labels','1') // riguelhom baad kif tzid win bech yhot l labels taa dataset li possible
        
        Array.from(state.files).forEach(file=>{
            formData.append('files',file)
        })
        console.log(state)
        //appel au backend 
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //upload files to bakend , create new dataset 
            axios({
            method: 'post',
            url: 'http://localhost:5000/api/datasets/upload',
            config: { headers: { 'Content-Type': 'multipart/form_data' } },
            data:formData
            })
            .then((res) => {
                if (res.data.success) {
                
                console.log("data : ", res.data)
                }
                else {
                console.log("data error : ", res.data)
                }
            })
            .catch(e => {
                console.log("erreur : ", e)
            })

    }
    //fct w7adha khater chnaccedi l target.files et non pas target.value
    const onChangeFile = (e)=>{
        setstate({
            ...state,
            files:e.target.files
        })
        setTotal(e.target.files.length)
    }

    const onChange=(e)=>{
        console.log(e.target)
        const {id,value} = e.target
        console.log(id,value)
        setstate({
            ...state,
            [id]:value
        })

    }
  
    return (
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Upload Your Dataset</h4>
        </CardHeader>
      </Card>
    </GridItem>
    <GridItem  xs={2} sm={2} md={2} />
    <GridItem xs={8} sm={8} md={8} >
      <form onSubmit={onSubmit}>

          <div className="form-group">
            <label htmlFor="Dataset Name">Dataset Name</label>
            <input type="text" onChange={onChange} className="form-control" id="name" aria-describedby="emailHelp"/>
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input type="text" onChange={onChange} className="form-control" id="type" aria-describedby="emailHelp" />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input type="text" onChange={onChange} className="form-control" id="description" aria-describedby="emailHelp" />
          </div>

          

          <div className="form-group">
            <label htmlFor="points">Points for each row</label>
            <input type="text" onChange={onChange} className="form-control" id="points" aria-describedby="emailHelp" />
          </div>

          <div className="custom-file">
            <label className="custom-file-label" htmlFor="customFile">{total}</label>
            <input type="file" onChange={onChangeFile} className="custom-file-input" id="customFile"  multiple/>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfLabels">Number Of labels </label>
            <input type="text" onChange={onChange} className="form-control" id="numberOfLabels" aria-describedby="emailHelp"/>
          </div>
        <input type="submit" value="upload" className="btn-btn-primary"/>
       
      </form>
      </GridItem>
      <GridItem  xs={2} sm={2} md={2} />
      </GridContainer>
    )
}

export default UploadDataset
