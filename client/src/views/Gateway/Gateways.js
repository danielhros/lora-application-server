import React from "react";
import { connect } from "react-redux";
import MyTable from "../../components/MyTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import { getGateways, getCountOfGateways } from "../../actions/gateway";
import {
  setRowsPerPage,
  cleanResults as cleanGateways,
} from "../../actions/shared";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";

import { withRouter } from "react-router-dom";

const getColumnName = (column) => {
  switch (column) {
    case "Name":
      return "name";
    case "STIOT":
      return "protocol_ver";
    case "LoRa":
      return "lora_protocol_ver";
    case "Firmware":
      return "firmware";
    case "DC_refresh":
      return "duty_cycle_refresh";
    default:
      return "id";
  }
};

const headCells = ["id", "Name", "STIOT", "LoRa", "Firmware", "DC_refresh"];

export const Gateways = ({
  gateways,
  getGateways,
  getCountOfGateways,
  countOfGateways,
  refresh,
  history,
  setRowsPerPage,
  rowsPerPage,
  cleanGateways,
  classes,
}) => {
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("asc");

  React.useEffect(() => {
    if (refresh) {
      getCountOfGateways();
      getGateways({
        order,
        rowsPerPage,
        page: 1,
        column: getColumnName(headCells[orderBy]),
      });
      setPage(0);
    }
  }, [
    getCountOfGateways,
    getGateways,
    order,
    orderBy,
    page,
    refresh,
    rowsPerPage,
  ]);

  React.useEffect(() => {
    getCountOfGateways();
    getGateways({ order: "asc", rowsPerPage, page: 1, column: "id" });

    return () => {
      cleanGateways();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanGateways, getCountOfGateways, getGateways]);

  const handleOnRowClick = (index) => {
    history.push(`/gateways/${gateways[index].dev_id}`);
  };

  const rows = gateways.map((e, i) => {
    return [
      {
        name: e.id,
        content: e.id,
      },
      {
        name: e.name,
        content: e.name,
      },
      {
        name: e.protocol_ver,
        content: e.protocol_ver,
      },
      {
        name: e.lora_protocol_ver,
        content: e.lora_protocol_ver,
      },
      {
        name: e.firmware,
        content: e.firmware,
      },
      {
        name: e.duty_cycle_refresh,
        content: (
          <div className={classes.tableProgressBarWrapper}>
            <LinearProgress
              className={classes.tableProgressBar}
              variant="determinate"
              value={12}
            />{" "}
            {e.duty_cycle_refresh}
          </div>
        ),
      },
    ];
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <MyTable
            rows={rows}
            headCells={headCells}
            tableTitle={"List of gateways"}
            onRowClick={handleOnRowClick}
            countOfRows={countOfGateways}
            showPagination={true}
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            order={order}
            setOrder={setOrder}
            fetchRecords={({ order, rowsPerPage, page, column }) => {
              getGateways({
                order,
                rowsPerPage,
                page,
                column: getColumnName(column),
              });
            }}
            rightNode={
              <Tooltip title="Add gateway">
                <Button
                  variant="outlined"
                  className={classes.tableButton}
                  startIcon={<AddIcon />}
                  onClick={() => console.log("hello")}
                >
                  add
                </Button>
              </Tooltip>
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ result }) => ({
  gateways: result.results,
  countOfGateways: result.countOfResults,
  rowsPerPage: result.rowsPerPage,
});

const mapDispatchToProps = {
  getGateways,
  getCountOfGateways,
  setRowsPerPage,
  cleanGateways,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(globalStyles)(Gateways)));
