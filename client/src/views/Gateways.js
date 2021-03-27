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

export const Gateways = ({ gateways, getGateways }) => {
  const classes = useStyles();

  React.useEffect(() => {
    getGateways();
  }, [getGateways]);

  const headCells = ["id", "Name", "STIOT", "LoRa", "Firmware", "DC_refresh"];
  const rows = gateways.map((e, i) => {
    return [
      {
        name: e.id,
        content: e.id,
      },
      {
        name: "ToDo Name " + i,
        content: "ToDo Name " + i,
      },
      {
        name: e.protocol_ver,
        content: e.protocol_ver,
      },
      {
        name: e.lora_protocol_ver,
        content: e.lora_protocol_ver,
      },
      {
        name: "ToDo firmware",
        content: "ToDo firmware",
      },
      {
        name: e.duty_cycle_refresh,
        content: e.duty_cycle_refresh,
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
            tableTitle={"List of gateways"}
            onRowClick={(rowIndex) => console.log(rowIndex)}
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
