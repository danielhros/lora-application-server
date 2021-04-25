import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Firmware = ({ firmware = "" }) => {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        style={{
          display: "flex",
          alignItems: "center",
          color:
            firmware?.split(".")[0] > 1 ||
            (firmware?.split(".")[0] >= 1 && firmware.split(".")[1] >= 5)
              ? "inherit"
              : "#EC5B56",
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
              style={{ marginLeft: 5, height: 20, color: "#EC5B56" }}
            />
          </Tooltip>
        )}
      </Typography>
    </React.Fragment>
  );
};

export default Firmware;
