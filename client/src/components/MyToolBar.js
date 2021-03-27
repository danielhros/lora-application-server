import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const MyToolBar = ({ tableTitle, rightNode = null }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableTitle}
      </Typography>

      {rightNode}
    </Toolbar>
  );
};

export default MyToolBar;
