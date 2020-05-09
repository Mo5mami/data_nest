import React, { useState, useEffect } from 'react'
import { TableCell, makeStyles, TableRow, IconButton, Tooltip, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { Table } from '@material-ui/core';
//import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Details } from '@material-ui/icons';
import axios from 'axios';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CardHeader from 'components/Card/CardHeader';
import Card from '../../components/Card/Card';

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
  


function Contribution() {

    
    const classes = useStyles();
    const tableCellClasses = classNames(classes.tableCell);
    
    const [state, setstate] = useState({contributions:[],displayContribution:[],filterType:"all",})
    useEffect( ()=>{
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
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
               
                setstate({...state,contributions:response.data.contributions})
              }
              
          })
          .catch(e=>{
              console.log(e)
          })
      
    
      },[])
    

    const filter=(type)=>
    {
    if(type==="all")
      setstate({...state,filterType:type,displayContributions:state.contributions})
    
    }
  
  const handleType=(e,val)=>
  {
   
    filter(val)
   
  }

    return (
        <React.Fragment>
             <GridContainer spacing={3}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Contribution list List</h4>
            <BottomNavigation
              value={state.filterType}
              onChange={handleType}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction value="all" label="All Contributions"  />
              
              
            </BottomNavigation>
          </CardHeader>
        </Card>
      </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                        <Table stickyHeader aria-label="sticky table" className={classes.table}>
                            <TableBody>
                                <TableCell className={tableCellClasses}><strong>Dataset</strong></TableCell>
                                <TableCell className={tableCellClasses}>
                                <strong>Number of submissions</strong>
                                </TableCell>
                                <hr />
                                {state.contributions.map((contribution) => (
                                <TableRow key={contribution._id} className={classes.tableRow}>
                                    <TableCell className={tableCellClasses}>
                                    {contribution.name}
                                    </TableCell>
                                    <TableCell className={tableCellClasses}>
                                    {contribution.number}
                                    </TableCell>
                                    <TableCell className={classes.tableActions}>
                                    <Tooltip
                                        id="tooltip-top"
                                        title="see details"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <IconButton
                                        aria-label="Detail"
                                        className={classes.tableActionButton}
                                        >
                                        <Link to={`/default/${contribution.name}`}>
                                        <Details
                                            className={
                                            classes.tableActionButtonIcon + " " + classes.edit
                                            }
                                        />
                                        </Link>
                                        </IconButton>
                                    </Tooltip>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                            </GridItem>
                            </GridContainer>
        </React.Fragment>
    )
}

export default Contribution
