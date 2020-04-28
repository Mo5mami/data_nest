import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
import DefaultTable from 'components/DefaultTable/DefaultTable';
import { TextField, TextareaAutosize, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ImgStream() 
{
  const [state, setstate] = useState({ data:{},option:"", tableHead:[],tableContent:[]})
  
  useEffect(() => {
    Axios
			.get(`https://jsonplaceholder.typicode.com/posts/1`)
			.then(res => {
        //console.log(res.data)
        setstate(
          {
            ...state , 
            tableHead:Object.keys(res.data),
            tableContent:Object.values(res.data),
            data:res.data
          })
        //console.log(state.tableHead)
        console.log(res.data)
			})
      
  }, [])
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const table={
    overview : "ItemOne",
    Specific : "ItemTwo",
  }

  
  const autoC=()=>
  {
    if (state.option in state.data)
    {
      console.log("true : ",state.data[state.option])
      return state.data[state.option]
    }
    return ""
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Specific column" {...a11yProps(1)} />
          
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} align="center">
      <DefaultTable rows={[state.tableContent]}  columns={state.tableHead}>

      </DefaultTable>
      </TabPanel>
      <TabPanel value={value} index={1} align="center" >
        <Grid>
      <Autocomplete
        value={state.option}
        onChange={(event, option) => {
          setstate({...state,option: option})
          console.log("option : ",state.option)
        }}
        id="combo-box-demo"
        options={state.tableHead}
        getOptionLabel={(option) => option}
        style={{ width: 500 ,display: "inline-block"}}
        renderInput={(params) => {
          
          return <TextField {...params} label="Combo box" variant="outlined" align="center"/>
        }}
      />
      </Grid>
     
        <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder={autoC()} style={{width :500}} disabled/>
      </TabPanel>
      
    </div>
  );
}
export default ImgStream;