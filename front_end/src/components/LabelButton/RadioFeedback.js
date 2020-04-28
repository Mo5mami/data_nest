import React, { useState, useContext } from 'react'
import { FormControlLabel, Radio, makeStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'

//import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import { FiberManualRecord } from '@material-ui/icons';

const useStyles = makeStyles({});




function RadioFeedback(props) {

    const [features ,label,setLabel]=[props.features,props.label,props.setLabel]

    

    const classes = useStyles();
    const handleChange =(event)=>
    {
        setLabel(event.target.value)
    }
    return (
        <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Label
        </InputLabel>
        <Select
          
          id="demo-simple-select-placeholder-label"
          value={label}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
         

          {features.map((value,key)=>
          {
              return  <MenuItem key={key} value={value}>{value}</MenuItem>
          }
          )}
          
        </Select>
        <FormHelperText>Choose the right label</FormHelperText>
      </FormControl>
    )
}

export default RadioFeedback