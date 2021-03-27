import { makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import MyTable from "../components/MyTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { getGateways } from "../actions/gateway";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const headCells = [
  {
    id: "id",
    label: "id",
  },
  { id: "name", label: "Name" },
  { id: "stiot", label: "STIOT" },
  { id: "lora", label: "LoRa" },
  { id: "firmware", label: "Firmware" },
  {
    id: "dcRefresh",
    label: "DC_refresh",
  },
];

export const Gateways = ({ gateways, getGateways }) => {
  const classes = useStyles();

  React.useEffect(() => {
    getGateways();
  }, [getGateways]);

  const rows = gateways.map((e, i) => {
    return {
      id: e.id,
      name: "ToDo Name " + i,
      stiot: e.protocol_ver,
      lora: e.lora_protocol_ver,
      firmware: "ToDo firmware",
      dcRefresh: e.duty_cycle_refresh,
    };
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <MyTable
            rows={rows}
            headCells={headCells}
            tableTitle={"List of gateways"}
            rightNode={
              <Tooltip title="Add gateway">
                <Button
                  variant="outlined"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  style={{ textTransform: "none" }}
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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const mapStateToProps = ({ gateway }) => ({
  gateways: gateway.gateways,
});

const mapDispatchToProps = {
  getGateways,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gateways);
