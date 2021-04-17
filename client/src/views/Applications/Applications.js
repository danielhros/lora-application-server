import React from "react";
import { connect } from "react-redux";
import MyTable from "../../components/MyTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import {
  getApplications,
  getCountOfApplications,
} from "../../actions/application";
import {
  setRowsPerPage,
  cleanResults as cleanApplications,
} from "../../actions/shared";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import applicationApi from "../../api/applicationApi";
import { truncate } from "../../utils/utils";
import moment from "moment";

import { withRouter } from "react-router-dom";
import devConsole from "../../devConsole";

const getColumnName = (column) => {
  switch (column) {
    case "created":
      return "created";
    case "name":
      return "name";
    case "description":
      return "description";
    case "devices":
      return "num_of_devices";
    case "uplink":
      return "num_of_uplink_messages";
    case "downlink":
      return "num_of_downlink_messages";
    default:
      return "id";
  }
};

const headCells = [
  { name: "id", content: "id" },
  { name: "created", content: "created" },
  { name: "name", content: "name" },
  { name: "description", content: "description" },
  { name: "devices", content: "devices" },
  { name: "uplink", content: "uplink" },
  { name: "downlink", content: "downlink" },
];

export const Applications = ({
  applications,
  getApplications,
  getCountOfApplications,
  countOfApplications,
  refresh,
  history,
  setRowsPerPage,
  rowsPerPage,
  cleanApplications,
  classes,
  callRefresh,
}) => {
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);
  const [order, setOrder] = React.useState("asc");

  React.useEffect(() => {
    if (refresh) {
      getCountOfApplications();
      getApplications({
        order,
        rowsPerPage,
        page: 1,
        column: getColumnName(headCells[orderBy]),
      });
      setPage(0);
    }
  }, [
    getApplications,
    getCountOfApplications,
    order,
    orderBy,
    page,
    refresh,
    rowsPerPage,
  ]);

  React.useEffect(() => {
    getCountOfApplications();
    getApplications({ order: "asc", rowsPerPage, page: 1, column: "id" });

    return () => {
      cleanApplications();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanApplications, getApplications, getCountOfApplications]);

  const handleAddApplication = async () => {
    try {
      await applicationApi.addApplication();
      callRefresh();
    } catch (error) {
      devConsole.log(error);
    }
  };

  const handleOnRowClick = (index) => {
    history.push(`/applications/${applications[index].id}`);
  };

  const rows = applications.map((e, i) => {
    return [
      {
        name: e?.id || "none",
        content: e?.id || "none",
      },
      {
        name: e.hasOwnProperty("created")
          ? moment(e.created).format("DD.MM.YY, HH:mm:ss")
          : "none",
        content: e.hasOwnProperty("created")
          ? moment(e.created).format("DD.MM.YY, HH:mm:ss")
          : "none",
      },
      {
        name: e?.name || "none",
        content: e?.name || "none",
      },
      {
        name: e?.description || "none",
        content: e.hasOwnProperty("description")
          ? truncate(e.description, 40)
          : "none",
      },
      {
        name: e?.num_of_devices || "none",
        content: e?.num_of_devices || "none",
      },
      {
        name: e?.num_of_uplink_messages || "none",
        content: e?.num_of_uplink_messages || "none",
      },
      {
        name: e?.num_of_downlink_messages || "none",
        content: e?.num_of_downlink_messages || "none",
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
            tableTitle={"List of applications"}
            onRowClick={handleOnRowClick}
            countOfRows={countOfApplications}
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
              getApplications({
                order,
                rowsPerPage,
                page,
                column: getColumnName(column),
              });
            }}
            rightNode={
              <Tooltip title="Add application">
                <Button
                  variant="outlined"
                  className={classes.tableButton}
                  startIcon={<AddIcon />}
                  onClick={handleAddApplication}
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
  applications: result.results,
  countOfApplications: result.countOfResults,
  rowsPerPage: result.rowsPerPage,
});

const mapDispatchToProps = {
  getApplications,
  getCountOfApplications,
  setRowsPerPage,
  cleanApplications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(globalStyles)(Applications)));
