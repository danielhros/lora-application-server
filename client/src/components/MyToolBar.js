import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../components/Title";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const MyToolBar = ({ tableTitle, rightNode = null }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Title className={classes.title}>{tableTitle}</Title>

      {rightNode}
    </Toolbar>
  );
};

export default MyToolBar;
