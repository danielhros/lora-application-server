import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  tableProgressBarWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tableProgressBar: {
    height: 5,
    maxWidth: 70,
    width: "100%",
    marginRight: theme.spacing(1),
  },
  tableButton: {
    textTransform: "none",
    minWidth: 100,
    marginLeft: theme.spacing(3),
  },
}));
