import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Skeleton from "@material-ui/lab/Skeleton";

import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import MyTableHead from "./MyTableHead";
import MyToolBar from "./MyToolBar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy].name < a[orderBy].name) {
    return -1;
  }
  if (b[orderBy].name > a[orderBy].name) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const MyTable = ({
  rows,
  headCells,
  tableTitle = "No title",
  rightNode,
  onRowClick,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, index) => {
    const isAsc = orderBy === index && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(index);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <MyToolBar tableTitle={tableTitle} rightNode={rightNode} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <MyTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />

          <TableBody>
            {rows.length === 0 ? (
              Array.from(Array(rowsPerPage)).map((x, i) => {
                return (
                  <TableRow key={i} hover>
                    {headCells.map((name) => {
                      return (
                        <TableCell key={name}>
                          <Skeleton />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <React.Fragment>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((arr, index) => {
                    const arrLength = arr.length;

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                        onClick={() => onRowClick(index + page * rowsPerPage)}
                      >
                        {arr.map((el, index) => {
                          return (
                            <TableCell
                              align={index + 1 === arrLength ? "right" : "left"}
                              key={index}
                              title={el.name}
                            >
                              {el.content}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </React.Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default MyTable;
