import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Title(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={!props.subtitle}
        {...props}
      >
        {props.children}
      </Typography>

      {props.subtitle ? (
        <Typography
          color="textSecondary"
          className={classes.pdrContext}
          gutterBottom
        >
          {props.subtitle}
        </Typography>
      ) : null}
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  pdrContext: {
    marginBottom: 5,
  },
});
