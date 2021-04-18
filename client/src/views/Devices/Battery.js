import React from "react";
import Battery20Icon from "@material-ui/icons/Battery20";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Title from "../../components/Title";

function BatteryComponent() {
  return (
    <React.Fragment>
      <Title
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Battery
      </Title>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <div
          style={{
            position: "relative",
            width: 100,
            minWidth: 100,
            height: 40,
          }}
        >
          <Battery20Icon
            style={{
              fontSize: 80,
              transform: "rotate(90deg)",
              top: -20,
              left: 0,
              right: 0,
              position: "absolute",
            }}
          />
        </div>

        <Typography variant="h4" component="div" color="textSecondary">
          <nobr>66 %</nobr>
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default BatteryComponent;
