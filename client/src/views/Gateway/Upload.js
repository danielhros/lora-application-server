import React from "react";
import { connect } from "react-redux";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  overrides: {
    MuiDropzoneArea: {
      root: {
        backgroundColor: "#424242",
        minHeight: 0,
        height: "auto",
        marginBottom: 5,
      },
      text: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.4)",
      },
    },
  },
});

export const Upload = (props) => {
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <DropzoneArea
          showPreviews={true}
          showPreviewsInDropzone={false}
          useChipsForPreview
          previewChipProps={{ classes: { root: classes.previewChip } }}
          previewText="Selected files"
          filesLimit={1}
        />
      </MuiThemeProvider>

      <Grid container item justify="flex-end" style={{ marginTop: 10 }}>
        <Button onClick={() => {}} color="primary" style={{ marginRight: 10 }}>
          CANCEL
        </Button>
        <Button variant="contained" onClick={() => {}} color="primary">
          submit
        </Button>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  previewChip: {
    // minWidth: 120,
    maxWidth: 150,
    color: "white",
    // maxWidth: "100%",
  },
}));

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
