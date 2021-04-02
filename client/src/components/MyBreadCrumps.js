import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const SimpleBreadcrumbs = ({ children }) => {
  const classes = useStyles();
  return (
    <Route>
      <Breadcrumbs aria-label="Breadcrumb" className={classes.margin}>
        {children}
      </Breadcrumbs>
    </Route>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default SimpleBreadcrumbs;
