import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { getPDRColor } from "../utils/utils";
import Typography from "@material-ui/core/Typography";

const PDRText = ({ value = 0 }) => {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        style={{
          display: "flex",
          alignItems: "center",
          color: getPDRColor(value),
        }}
      >
        {value === 0 ? "none" : <nobr>{`${value} %`}</nobr>}

        {value < 75 && value !== 0 ? (
          <Tooltip title="Low PDR" arrow>
            <ErrorOutlineIcon
              color="error"
              style={{
                marginLeft: 5,
                height: 20,
                color: getPDRColor(value),
              }}
            />
          </Tooltip>
        ) : null}
      </Typography>
    </React.Fragment>
  );
};

export default PDRText;
