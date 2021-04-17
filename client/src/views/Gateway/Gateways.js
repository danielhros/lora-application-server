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
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import moment from "moment";

import { withRouter } from "react-router-dom";

const getColumnName = (column) => {
  switch (column) {
    case "name":
      return "name";
    case "stiot":
      return "protocol_ver";
    case "lora":
      return "lora_protocol_ver";
    case "firmware":
      return "firmware";
    case "bandwidth":
      return "bandwidth";
    case "dc_refresh":
      return "duty_cycle_refresh";
    default:
      return "id";
  }
};

const headCells = [
  { name: "id", content: "id" },
  { name: "name", content: "name" },
  { name: "stiot", content: "stiot" },
  { name: "lora", content: "lora" },
  { name: "firmware", content: "firmware" },
  { name: "bandwidth", content: "bandwidth" },
  {
    name: "dc_refresh",
    content: (
      <React.Fragment>
        <Tooltip
          title="The time when the duty cycle of gateway is planned. It tells you the minute and second of refresh of this or upcoming hour based on the actual time. Example: Imagine actual time is 16:20:00 and the value of the row is 25:00, the refresh is then planned to 16:25:00. If the value would be set to 15:00, the refresh is planned to 17:15:00."
          arrow
        >
          <HelpOutlineOutlinedIcon style={{ marginLeft: 5 }} />
        </Tooltip>
        dc_refresh
      </React.Fragment>
    ),
  },
];

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
        column: getColumnName(headCells[orderBy].name),
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
        name: e?.id || "none",
        content: e?.id || "none",
      },
      {
        name: e?.name || "none",
        content: e?.name || "none",
      },
      {
        name: e?.protocol_ver || "none",
        content: e?.protocol_ver || "none",
      },
      {
        name: e?.lora_protocol_ver || "none",
        content: e?.lora_protocol_ver || "none",
      },
      {
        name: e?.firmware || "none",
        content: e?.firmware || "none",
      },
      {
        name: e.hasOwnProperty("bandwidth")
          ? `${e.bandwidth / (1.0 * 1000)} kHz`
          : "none",
        content: e.hasOwnProperty("bandwidth")
          ? `${e.bandwidth / (1.0 * 1000)} kHz`
          : "none",
      },
      {
        name: e?.duty_cycle_refresh || "none",
        content: e.hasOwnProperty("duty_cycle_refresh")
          ? moment(e.duty_cycle_refresh, "HH:mm:ss").format("mm:ss")
          : "none",
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
