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

const useStyles = makeStyles(styles);

function DataSets(props) {
  const classes = useStyles();

  const { DataSets } = props;
  const tableCellClasses = classnames(classes.tableCell);
  return (
    <Table className={classes.table}>
      <TableBody>
        {DataSets.map((dataSet) => (
          <TableRow key={dataSet.id} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>{dataSet.name}</TableCell>
            <TableCell className={tableCellClasses}>{dataSet.desc}</TableCell>
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
                  <Details
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default DataSets;
