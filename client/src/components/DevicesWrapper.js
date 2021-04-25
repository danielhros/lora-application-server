import React from "react";
import { globalStyles } from "../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import MyTable from "./MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { truncate, getPDRColor } from "../utils/utils";

const getColumnName = (column) => {
  switch (column) {
    case "name":
      return "name";
    case "firmware":
      return "firmware";
    case "app_name":
      return "application_name";
    case "dc_refresh":
      return "duty_cycle_refresh";
    case "upstream_power":
      return "upstream_power";
    case "downstream_power":
      return "downstream_power";
    case "pdr":
      return "pdr";
    default:
      return "id";
  }
};

const headCells = [
  { name: "device_id", content: "device_id" },
  { name: "name", content: "name" },
  { name: "firmware", content: "firmware" },
  { name: "app_name", content: "app_name" },
  { name: "upstream_power", content: "upstream_power" },
  { name: "downstream_power", content: "downstream_power" },
  { name: "pdr", content: "pdr" },
  {
    name: "dc_refresh",
    content: (
      <React.Fragment>
        <Tooltip
          title="The time when the duty cycle of device is planned. It tells you the minute and second of refresh of this or upcoming hour based on the actual time. Example: Imagine actual time is 16:20:00 and the value of the row is 25:00, the refresh is then planned to 16:25:00. If the value would be set to 15:00, the refresh is planned to 17:15:00."
          arrow
        >
          <HelpOutlineOutlinedIcon style={{ marginLeft: 5, height: 20 }} />
        </Tooltip>
        dc_refresh
      </React.Fragment>
    ),
  },
];

export const Devices = ({
  classes,
  getDevices,
  getCountOfDevices,
  setRowsPerPage,
  cleanDevices,
  rowsPerPage,
  countOfDevices,
  devices,
  history,
  refresh,
}) => {
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [hideId, setHideId] = React.useState(true);

  React.useEffect(() => {
    if (refresh) {
      getCountOfDevices();
      getDevices({
        order,
        rowsPerPage,
        page: 1,
        column: getColumnName(headCells[orderBy].name),
      });
      setPage(0);
    }
  }, [
    getCountOfDevices,
    getDevices,
    order,
    orderBy,
    page,
    refresh,
    rowsPerPage,
  ]);

  React.useEffect(() => {
    getCountOfDevices();
    getDevices({ order: "asc", rowsPerPage, page: 1, column: "id" });

    return () => {
      cleanDevices();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanDevices, getCountOfDevices, getDevices]);

  const handleOnRowClick = (index) => {
    history.push(`/devices/${devices[index].dev_id}`);
  };

  const rows = devices.map((e, i) => {
    return [
      {
        name: e?.id || "none",
        content: hideId ? "*****" : e?.id || "none",
      },
      {
        name: e?.name || "none",
        content: e.hasOwnProperty("name") ? truncate(e.name, 20) : "none",
      },
      {
        name: "",
        content: (
          <React.Fragment>
            {e.hasOwnProperty("firmware") ? (
              <React.Fragment>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color:
                      e.firmware.split(".")[0] > 1 ||
                      (e.firmware.split(".")[0] >= 1 &&
                        e.firmware.split(".")[1] >= 5)
                        ? "inherit"
                        : "#EC5B56",
                  }}
                >
                  <nobr>{`${e.firmware}`}</nobr>

                  {e.firmware.split(".")[0] > 1 ||
                  (e.firmware.split(".")[0] >= 1 &&
                    e.firmware.split(".")[1] >= 5) ? null : (
                    <Tooltip
                      title="Firmware older then (1.15.0), consider upgrading"
                      arrow
                    >
                      <ErrorOutlineIcon
                        style={{ marginLeft: 5, height: 20, color: "#EC5B56" }}
                      />
                    </Tooltip>
                  )}
                </Typography>
              </React.Fragment>
            ) : (
              "none"
            )}
          </React.Fragment>
        ),
      },
      {
        name: e?.application_name || "none",
        content: e?.application_name || "none",
      },
      {
        name: e.hasOwnProperty("upstream_power")
          ? `${e.upstream_power} dBm`
          : "none",
        content: e.hasOwnProperty("upstream_power")
          ? `${e.upstream_power} dBm`
          : "none",
      },
      {
        name: e.hasOwnProperty("upstream_power")
          ? `${e.downstream_power} dBm`
          : "none",
        content: e.hasOwnProperty("upstream_power")
          ? `${e.downstream_power} dBm`
          : "none",
      },
      {
        name: e.hasOwnProperty("pdr")
          ? e.pdr < 75
            ? ""
            : `${e.pdr} %`
          : "none",
        content: (
          <React.Fragment>
            {e.hasOwnProperty("pdr") ? (
              <React.Fragment>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: getPDRColor(e.pdr),
                  }}
                >
                  <nobr>{`${e.pdr} %`}</nobr>

                  {e.pdr < 75 ? (
                    <Tooltip title="Low PDR" arrow>
                      <ErrorOutlineIcon
                        color="error"
                        style={{
                          marginLeft: 5,
                          height: 20,
                          color: getPDRColor(e.pdr),
                        }}
                      />
                    </Tooltip>
                  ) : null}
                </Typography>
              </React.Fragment>
            ) : (
              "none"
            )}
          </React.Fragment>
        ),
      },
      {
        name: e.hasOwnProperty("duty_cycle_refresh")
          ? moment(e.duty_cycle_refresh, "HH:mm:ss").format("mm:ss")
          : "none",
        content: e.hasOwnProperty("duty_cycle_refresh")
          ? moment(e.duty_cycle_refresh, "HH:mm:ss").format("mm:ss")
          : "none",
      },
    ];
  });

  return (
    <MyTable
      rows={rows}
      headCells={headCells}
      tableTitle={"List of devices"}
      onRowClick={handleOnRowClick}
      countOfRows={countOfDevices}
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
        getDevices({
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

export default withRouter(withStyles(globalStyles)(Devices));
