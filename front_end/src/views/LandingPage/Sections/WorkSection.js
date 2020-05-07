import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/home/jss/material-kit-react/views/landingPageSections/workStyle.js";
import axios from 'axios'
const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  const [state, setstate] = useState({name:"",email:"",message:""})

  const onSubmit = (e)=>{
    e.preventDefault()
  
        axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/sendMail',
        config: { headers: { 'Content-Type': 'application/json' } },
        data:state
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


const onChange=(e)=>{
  
    const {id,value} = e.target
    setstate({
        ...state,
        [id]:value
    })

}
  return (
    <div className={classes.section}>
      
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>
          <form onSubmit={onSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput 
                  onChange={onChange}
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput 
                  onChange={onChange}
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput 
                onChange={onChange}
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                  <Button type="submit" color="primary">Send Message</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
