import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 1000,
    //minHeight:400,
  },
});

export default function DefaultTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { columns,rows } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addHref=(row,column,name) => {
    const value = row[column.id];
    if (column.id===name)
    {
      return (
        <a href="#">
        <TableCell key={column.id} align={column.align}>
          {value}
        </TableCell>
        </a>
      )

    }

    return (
      <TableCell key={column.id} align={column.align}>
        {value}
      </TableCell>
    )
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" style={{ height: 'auto !important' }}>
          <TableHead >
            <TableRow >
              {columns.map((column,id) => (
                <TableCell
                  key={id}
                  align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ height: 'auto !important' }}>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,id) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id} style={{height:300}}>
                  {row.map((value,ind)=>(
                    <TableCell  key={ind} align="center" style={{ height: 'auto !important' }}>
                    {value}
                  </TableCell>
                  )
                    )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />*/}
    </Paper>
  );
}