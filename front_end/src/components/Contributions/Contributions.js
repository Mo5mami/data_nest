import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Details from "@material-ui/icons/Details";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import {Link} from 'react-router-dom'
const useStyles = makeStyles(styles);

function Contributions(props) {
  const classes = useStyles();

  const { contributions } = props;
  const tableCellClasses = classnames(classes.tableCell);
  return (
    <Table className={classes.table}>
      <TableBody>
        <TableCell className={tableCellClasses}><strong>Number of submissions</strong></TableCell>
        <TableCell className={tableCellClasses}>
          <strong>Number of submissions</strong>
        </TableCell>
        <hr />
        {contributions.map((contribution) => (
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
  );
}
export default Contributions;
