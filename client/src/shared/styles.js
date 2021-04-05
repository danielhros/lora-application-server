import { makeStyles } from "@material-ui/core/styles";

const useGlobalStyles = makeStyles((theme) => ({
  tableButton: {
    textTransform: "none",
    minWidth: 120,
    marginLeft: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
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
}));

export { useGlobalStyles };
