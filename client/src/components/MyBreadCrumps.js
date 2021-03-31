import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SimpleBreadcrumbs = () => {
  const classes = useStyles();
  return (
    <Route>
      {({ location }) => {
        const pathNames = location.pathname.split("/").filter((x) => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.margin}>
            {pathNames.map((value, index) => {
              const last = index === pathNames.length - 1;
              const to = `/${pathNames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="textPrimary" key={to}>
                  {capitalizeFirstLetter(value)}
                </Typography>
              ) : (
                <RouterLink className={classes.link} to={to} key={to}>
                  {capitalizeFirstLetter(value)}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
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
