import React from "react";
import { connect } from "react-redux";
import {
  getUplinkMessages,
  getCountOfUplinkMessages,
  cleanAllMessages,
} from "../../actions/messages";
import globalStyles from "../../shared/styles";
import MyTable from "../../components/MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
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

// todo refresh
export const UplinkTable = ({
  getUplinkMessages,
  messages,
  getCountOfUplinkMessages,
  count,
  refresh,
  cleanAllMessages,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("asc");

  const global = globalStyles();

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
      order: "asc",
      rowsPerPage: 5,
      page: 1,
      column: getColumnName("date"),
    });

    return () => {
      cleanAllMessages();
    };
  }, [getCountOfUplinkMessages, getUplinkMessages]);

  const rows = messages.map((e, i) => {
    return [
      {
        name: e.receive_time,
        content: e.receive_time,
      },
      {
        name: e.node_id,
        content: e.node_id,
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
    console.log(index);
  };

  return (
    <MyTable
      rows={rows}
      headCells={headCells}
      tableTitle={"Uplink messages"}
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
            className={global.tableButton}
            startIcon={<VisibilityIcon />}
            onClick={() => console.log("hello")}
          >
            device_id
          </Button>
        </Tooltip>
      }
    />
  );
};

const mapStateToProps = ({ messages }) => ({
  messages: messages.uplink.messages,
  rowsPerPage: messages.uplink.rowsPerPage,
  count: messages.uplink.count,
});

const mapDispatchToProps = {
  getUplinkMessages,
  getCountOfUplinkMessages,
  cleanAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UplinkTable);
