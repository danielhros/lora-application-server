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
  "ack_req",
  "spf",
  "power",
  "gateway",
  "dc_remaining",
];

const getColumnName = (column) => {
  switch (column) {
    case "Date":
      return "send_time";
    case "device_id":
      return "node_id";
    case "ack_req":
      return "ack_required";
    case "spf":
      return "spf";
    case "power":
      return "power";
    case "gateway":
      return "gateway_name";
    case "dc_remaining":
      return "duty_cycle_remaining";
    default:
      return "send_time";
  }
};

export const DownlinkMessagesWrapper = ({
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  messages,
  count,
  refresh,
  cleanAllMessages,
  sent,
  showPagination = true,
  rowsPerPageInit = 5,
  sortAllowed = true,
  tableTitle = sent ? "Sent downlink messages" : "Scheduled downlink messages",
  classes,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageInit);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("desc");
  const [hideId, setHideId] = React.useState(true);

  React.useEffect(() => {
    if (refresh) {
      getCountOfDownlinkMessages(sent);
      getDownlinkMessages({
        order,
        rowsPerPage,
        page: 1,
        column: getColumnName(headCells[orderBy]),
        sent,
      });
      setPage(0);
    }
  }, [
    getCountOfDownlinkMessages,
    getDownlinkMessages,
    order,
    orderBy,
    refresh,
    rowsPerPage,
    sent,
  ]);

  React.useEffect(() => {
    getCountOfDownlinkMessages(sent);
    getDownlinkMessages({
      order: "desc",
      rowsPerPage: rowsPerPageInit,
      page: 1,
      column: getColumnName("date"),
      sent,
    });

    return () => {
      cleanAllMessages();
    };
  }, [
    cleanAllMessages,
    getCountOfDownlinkMessages,
    getDownlinkMessages,
    rowsPerPageInit,
    sent,
  ]);

  const rows = messages.map((e, i) => {
    return [
      {
        name: e.send_time,
        content: e.send_time,
      },
      {
        name: e.node_id,
        content: hideId ? "*****" : e.node_id,
      },
      {
        name: e.ack_required ? "true" : "false",
        content: e.ack_required ? "true" : "false",
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
        getDownlinkMessages({
          order,
          rowsPerPage,
          page,
          column: getColumnName(column),
          sent,
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

export default withStyles(globalStyles)(DownlinkMessagesWrapper);
