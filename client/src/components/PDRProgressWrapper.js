import React from "react";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { getPDRColor } from "../utils/utils";

export const PDRProgress = ({
  value = 0,
  width,
  loading = false,
  error = false,
  subtitle = "median of last 100 messages",
}) => {
  return (
    <React.Fragment>
      <Title subtitle={subtitle}>PDR</Title>

      <Box
        position="relative"
        display="flex"
        style={{
          flexGrow: 1,
          padding: 20,
          minWidth: 200,
        }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          variant={"determinate"}
          value={loading ? 0 : error ? 100 : value === 0 ? 100 : value}
          style={{
            color: error || value === 0 ? "#EC5B56" : getPDRColor(value),
          }}
          size={isWidthDown("xs", width) ? 130 : 170}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={-5}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant={
              loading || error || value === 0
                ? "h6"
                : isWidthDown("xs", width)
                ? "h6"
                : "h4"
            }
            component="div"
            color="textSecondary"
          >
            {loading
              ? "loading"
              : error
              ? "error"
              : value === 0
              ? "none"
              : `${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default withWidth()(PDRProgress);
