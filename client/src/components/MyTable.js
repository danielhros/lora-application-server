import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Skeleton from "@material-ui/lab/Skeleton";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import MyTableHead from "./MyTableHead";
import MyToolBar from "./MyToolBar";

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
  countOfRows,
  fetchRecords,
  showPagination = true,
  rowsPerPageOptions,
  rowsPerPage = 5,
  setRowsPerPage,
  page,
  setPage,
  orderBy,
  setOrderBy,
  order,
  setOrder,
  width,
  sortAllowed = true,
}) => {
  const classes = useStyles();

  const handleRequestSort = (event, index) => {
    const isAsc = orderBy === index && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(index);
    setPage(0);

    fetchRecords({
      order: isAsc ? "desc" : "asc",
      rowsPerPage,
      page: 1,
      column: headCells[index].name,
    });
  };

  const handleChangePage = (event, newPage) => {
    fetchRecords({
      order,
      rowsPerPage,
      page: newPage + 1,
      column: headCells[orderBy].name,
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchRecords({
      order,
      rowsPerPage: newRowsPerPage,
      page: 1,
      column: headCells[orderBy].name,
    });
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length);

  return (
    <React.Fragment>
      <MyToolBar tableTitle={tableTitle} rightNode={rightNode} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
          style={{ marginBottom: showPagination ? 0 : 20 }}
        >
          <MyTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            sortAllowed={sortAllowed}
          />

          {parseInt(countOfRows) === 0 ? (
            <TableBody>
              <TableRow style={{ height: 53 * rowsPerPage }}>
                <TableCell
                  align={isWidthUp("md", width) ? "center" : "left"}
                  colSpan={12}
                >
                  No data..
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows.length === 0 ? (
                Array.from(Array(rowsPerPage)).map((x, i) => {
                  return (
                    <TableRow key={i} hover>
                      {headCells.map((cell) => {
                        return (
                          <TableCell key={cell.name}>
                            <Skeleton />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <React.Fragment>
                  {rows.map((arr, index) => {
                    const arrLength = arr.length;

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                        onClick={() => onRowClick(index)}
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
                      <TableCell colSpan={12} />
                    </TableRow>
                  )}
                </React.Fragment>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {showPagination ? (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={parseInt(countOfRows) || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </React.Fragment>
  );
};

export default withWidth()(MyTable);
