import React from "react";
import { globalStyles } from "../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import MyTable from "./MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LinearProgress from "@material-ui/core/LinearProgress";
import DownlinkMessageModal from "./DownlinkMessageModal";
import moment from "moment";

const headCells = [
  { name: "Date", content: "Date" },
  { name: "device_id", content: "device_id" },
  { name: "ack_req", content: "ack_req" },
  { name: "spf", content: "spf" },
  { name: "power", content: "power" },
  { name: "gateway", content: "gateway" },
  { name: "dc_remaining", content: "dc_remaining" },
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

  const [selectedMessage, setSelectedMessage] = React.useState({
    openModal: false,
    message: null,
  });

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
        name: e.hasOwnProperty("send_time")
          ? moment(e.send_time).format("DD.MM.YY, HH:mm:ss")
          : "none",
        content: e.hasOwnProperty("send_time")
          ? moment(e.send_time).format("DD.MM.YY, HH:mm:ss")
          : "none",
      },
      {
        name: e?.node_id || "none",
        content: hideId ? "*****" : e?.node_id || "none",
      },
      {
        name: e.hasOwnProperty("ack_required")
          ? e.ack_required
            ? "yes"
            : "no"
          : "none",
        content: e.hasOwnProperty("ack_required")
          ? e.ack_required
            ? "yes"
            : "no"
          : "none",
      },
      {
        name: e?.spf || "none",
        content: e.spf || "none",
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
            />{" "}
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
      <DownlinkMessageModal
        open={selectedMessage.openModal}
        handleClose={handleClose}
        message={selectedMessage.message}
        sent={sent}
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
    </React.Fragment>
  );
};

export default withStyles(globalStyles)(DownlinkMessagesWrapper);
