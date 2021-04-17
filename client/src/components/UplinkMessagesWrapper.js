import React from "react";
import { globalStyles } from "../shared/styles";
import { withStyles } from "@material-ui/core/styles";

import MyTable from "./MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LinearProgress from "@material-ui/core/LinearProgress";
import UplinkMessageModal from "./UplinkMessageModal";
import moment from "moment";

const headCells = [
  { name: "Date", content: "Date" },
  { name: "device_id", content: "device_id" },
  { name: "snr", content: "snr" },
  { name: "rssi", content: "rssi" },
  { name: "spf", content: "spf" },
  { name: "power", content: "power" },
  { name: "gateway", content: "gateway" },
  { name: "dc_remaining", content: "dc_remaining" },
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

  const [selectedMessage, setSelectedMessage] = React.useState({
    openModal: false,
    message: null,
  });

  React.useEffect(() => {
    if (refresh) {
      getCountOfUplinkMessages();
      getUplinkMessages({
        order,
        rowsPerPage,
        page: 1,
        column: getColumnName(headCells[orderBy].name),
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
        name: e.hasOwnProperty("receive_time")
          ? moment(e.receive_time).format("DD.MM.YY, HH:mm:ss")
          : "none",
        content: e.hasOwnProperty("receive_time")
          ? moment(e.receive_time).format("DD.MM.YY, HH:mm:ss")
          : "none",
      },
      {
        name: e?.node_id || "none",
        content: hideId ? "*****" : e?.node_id || "none",
      },
      {
        name: e?.snr || "none",
        content: e?.snr || "none",
      },
      {
        name: e?.rssi || "none",
        content: e?.rssi || "none",
      },
      {
        name: e?.spf || "none",
        content: e?.spf || "none",
      },
      {
        name: e.hasOwnProperty("power") ? `${e.power} dBm` : "none",
        content: e.hasOwnProperty("power") ? `${e.power} dBm` : "none",
      },
      {
        name: e?.gateway_name || "none",
        content: e?.gateway_name || "none",
      },
      {
        name: e.hasOwnProperty("duty_cycle_remaining")
          ? `${e.duty_cycle_remaining} ms`
          : "none",
        content: e.hasOwnProperty("duty_cycle_remaining") ? (
          <div className={classes.tableProgressBarWrapper}>
            <LinearProgress
              className={classes.tableProgressBar}
              variant="determinate"
              value={e.duty_cycle_remaining / 360}
            />
            {`${e.duty_cycle_remaining} ms`}
          </div>
        ) : (
          "none"
        ),
      },
    ];
  });

  const handleOnRowClick = (index) => {
    setSelectedMessage({
      openModal: true,
      message: messages[index],
    });
  };

  const handleClose = () => {
    setSelectedMessage({
      openModal: false,
      message: null,
    });
  };

  return (
    <React.Fragment>
      <UplinkMessageModal
        open={selectedMessage.openModal}
        handleClose={handleClose}
        message={selectedMessage.message}
      />
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
    </React.Fragment>
  );
};

export default withStyles(globalStyles)(UplinkMessagesWrapper);
