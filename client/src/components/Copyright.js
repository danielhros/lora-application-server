import Typography from "@material-ui/core/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Lora@FIIT Application Server {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
