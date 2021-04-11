import React from "react";
import { globalStyles } from "../shared/styles";
import { withStyles } from "@material-ui/core/styles";

import MyTable from "./MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LinearProgress from "@material-ui/core/LinearProgress";

const headCells = [
  "Date",
  "device_id",
  "snr",
  "rssi",
  "spf",
  "power",
  "gateway",
  "dc_remaining",
];

const getColumnName = (column) => {
  switch (column) {
    case "Date":
      return "receive_time";
    case "device_id":
      return "node_id";
    case "snr":
      return "snr";
    case "rssi":
      return "rssi";
    case "spf":
      return "spf";
    case "power":
      return "power";
    case "gateway":
      return "gateway_name";
    case "dc_remaining":
      return "duty_cycle_remaining";
    default:
      return "receive_time";
  }
};

export const UplinkMessagesWrapper = ({
  getUplinkMessages,
  messages,
  getCountOfUplinkMessages,
  count,
  refresh,
  cleanAllMessages,
  showPagination = true,
  rowsPerPageInit = 5,
  sortAllowed = true,
  tableTitle = "Uplink messages",
  classes,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageInit);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("desc");
  const [hideId, setHideId] = React.useState(true);

  React.useEffect(() => {
    if (refresh) {
      getCountOfUplinkMessages();
      getUplinkMessages({
        order,
        rowsPerPage,
        page: 1,
        column: getColumnName(headCells[orderBy]),
      });
      setPage(0);
    }
  }, [
    getCountOfUplinkMessages,
    getUplinkMessages,
    order,
    orderBy,
    refresh,
    rowsPerPage,
  ]);

  React.useEffect(() => {
    getCountOfUplinkMessages();
    getUplinkMessages({
      order: "desc",
      rowsPerPage: rowsPerPageInit,
      page: 1,
      column: getColumnName("date"),
    });

    return () => {
      cleanAllMessages();
    };
  }, [
    cleanAllMessages,
    getCountOfUplinkMessages,
    getUplinkMessages,
    rowsPerPageInit,
  ]);

  const rows = messages.map((e, i) => {
    return [
      {
        name: e.receive_time,
        content: e.receive_time,
      },
      {
        name: e.node_id,
        content: hideId ? "*****" : e.node_id,
      },
      {
        name: e.snr,
        content: e.snr,
      },
      {
        name: e.rssi,
        content: e.rssi,
      },
      {
        name: e.spf,
        content: e.spf,
      },
      {
        name: e.power,
        content: e.power,
      },
      {
        name: e.gateway_name,
        content: e.gateway_name,
      },
      {
        name: e.duty_cycle_remaining,
        content: (
          <div className={classes.tableProgressBarWrapper}>
            <LinearProgress
              className={classes.tableProgressBar}
              variant="determinate"
              value={12}
            />{" "}
            {e.duty_cycle_remaining}
          </div>
        ),
      },
    ];
  });

  const handleOnRowClick = (index) => {
    console.log(index);
  };

  return (
    <MyTable
      rows={rows}
      headCells={headCells}
      tableTitle={tableTitle}
      onRowClick={handleOnRowClick}
      countOfRows={count}
      showPagination={showPagination}
      rowsPerPageOptions={[5, 10, 25]}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      page={page}
      setPage={setPage}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      order={order}
      setOrder={setOrder}
      sortAllowed={sortAllowed}
      fetchRecords={({ order, rowsPerPage, page, column }) => {
        getUplinkMessages({
          order,
          rowsPerPage,
          page,
          column: getColumnName(column),
        });
      }}
      rightNode={
        <Tooltip title="Hide device id">
          <Button
            variant="outlined"
            className={classes.tableButton}
            startIcon={hideId ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setHideId(!hideId)}
          >
            device_id
          </Button>
        </Tooltip>
      }
    />
  );
};

export default withStyles(globalStyles)(UplinkMessagesWrapper);
