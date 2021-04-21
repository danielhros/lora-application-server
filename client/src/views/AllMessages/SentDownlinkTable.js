import React from "react";
import { connect } from "react-redux";
import {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  cleanAllMessages,
} from "../../actions/messages";
import globalStyles from "../../shared/styles";
import MyTable from "../../components/MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LinearProgress from "@material-ui/core/LinearProgress";
import devConsole from "../../devConsole";

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

const sent = true;

export const SentDownlinkMessages = ({
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  messages,
  count,
  refresh,
  cleanAllMessages,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [hideId, setHideId] = React.useState(false);

  const global = globalStyles();

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
  ]);

  React.useEffect(() => {
    getCountOfDownlinkMessages(sent);
    getDownlinkMessages({
      order: "asc",
      rowsPerPage: 5,
      page: 1,
      column: getColumnName("date"),
      sent,
    });

    return () => {
      cleanAllMessages();
    };
  }, [cleanAllMessages, getCountOfDownlinkMessages, getDownlinkMessages]);

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
        name: e.ack_required,
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
          <div className={global.tableProgressBarWrapper}>
            <LinearProgress
              className={global.tableProgressBar}
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
    devConsole.log(index);
  };

  return (
    <MyTable
      rows={rows}
      headCells={headCells}
      tableTitle={"Sent downlink messages"}
      onRowClick={handleOnRowClick}
      countOfRows={count}
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
            className={global.tableButton}
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

const mapStateToProps = ({ messages }) => ({
  messages: messages.sentDownlink.messages,
  rowsPerPage: messages.sentDownlink.rowsPerPage,
  count: messages.sentDownlink.count,
});

const mapDispatchToProps = {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  cleanAllMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentDownlinkMessages);
