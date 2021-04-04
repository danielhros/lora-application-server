import React from "react";
import { connect } from "react-redux";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

export const PDRProgress = ({ value = 0 }) => {
  return (
    <React.Fragment>
      <Title subtitle={"median of all messages"}>PDR</Title>
      <Box
        position="relative"
        display="inline-flex"
        style={{ marginTop: 15 }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          variant="determinate"
          value={value === 0 ? value + 1 : value}
          size={150}
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
            variant="h4"
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

export default connect(mapStateToProps, mapDispatchToProps)(PDRProgress);
