import React from "react";
import { connect } from "react-redux";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

export const PDRProgress = ({ value = 0, width }) => {
  return (
    <React.Fragment>
      <Title subtitle={"median of all messages"}>PDR</Title>

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
          variant="determinate"
          value={value === 0 ? value + 1 : value}
          style={{}}
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
            variant={isWidthDown("xs", width) ? "h6" : "h4"}
            component="div"
            color="textSecondary"
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withWidth()(PDRProgress);
