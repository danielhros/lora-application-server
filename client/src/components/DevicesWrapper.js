import React from "react";
import Grid from "@material-ui/core/Grid";
import { globalStyles } from "../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import MyTable from "./MyTable";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useRouteMatch, withRouter } from "react-router-dom";

const getColumnName = (column) => {
  switch (column) {
    case "Name":
      return "name";
    case "Firmware":
      return "firmware";
    case "App_name":
      return "application_name";
    case "dc_refresh":
      return "duty_cycle_refresh";
    case "pdr":
      return "pdr";
    default:
      return "id";
  }
};

const headCells = [
  "device_id",
  "Name",
  "Firmware",
  "App_name",
  "pdr",
  "dc_refresh",
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
  let { url } = useRouteMatch();

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
        column: getColumnName(headCells[orderBy]),
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
        name: e.id,
        content: hideId ? "*****" : e.id,
      },
      {
        name: e.name,
        content: e.name,
      },
      {
        name: e.firmware,
        content: e.firmware,
      },
      {
        name: e.application_name,
        content: e.application_name,
      },
      {
        name: e.pdr,
        content: e.pdr,
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
                  startIcon={
                    hideId ? <VisibilityOffIcon /> : <VisibilityIcon />
                  }
                  onClick={() => setHideId(!hideId)}
                >
                  device_id
                </Button>
              </Tooltip>
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(withStyles(globalStyles)(Devices));
