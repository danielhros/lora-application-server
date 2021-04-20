import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Firmware = ({ firmware = "" }) => {
  return (
    <React.Fragment>
      <Typography
        color={
          firmware?.split(".")[0] > 1 ||
          (firmware?.split(".")[0] >= 1 && firmware.split(".")[1] >= 5)
            ? "inherit"
            : "error"
        }
        variant="body2"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <nobr>{`${firmware || "none"}`}</nobr>

        {firmware?.split(".")[0] > 1 ||
        (firmware?.split(".")[0] >= 1 &&
          firmware?.split(".")[1] >= 5) ? null : (
          <Tooltip
            title="Firmware older then (1.15.0), consider upgrading"
            arrow
          >
            <ErrorOutlineIcon
              color="error"
              style={{ marginLeft: 5, height: 20 }}
            />
          </Tooltip>
        )}
      </Typography>
    </React.Fragment>
  );
};

export default Firmware;
