import React from "react";
import { connect } from "react-redux";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import gatewayApi from "../../api/gatewayApi";
import devConsole from "../../devConsole";

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

export const Upload = ({ gatewayId }) => {
  const classes = useStyles();

  const [files, setFiles] = React.useState([]);

  const handleAddFiles = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    const fileObj = files[0];

    const fr = new FileReader();

    fr.onload = async () => {
      let gatewaySettings = JSON.parse(fr.result);

      gatewaySettings = {
        ...gatewaySettings,
        ap_id: gatewayId,
      };

      try {
        await gatewayApi.sendSetap({
          setap: JSON.stringify(gatewaySettings),
          gatewayId,
        });
      } catch (error) {
        devConsole.log(error);
      }
    };

    fr.readAsText(fileObj);
  };

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
          onChange={handleAddFiles}
          acceptedFiles={["application/JSON"]}
        />
      </MuiThemeProvider>

      <Grid container item justify="flex-end" style={{ marginTop: 10 }}>
        {/* <Button
          onClick={() => setFiles([])}
          color="primary"
          style={{ marginRight: 10 }}
        >
          CANCEL
        </Button> */}
        <Button
          variant="contained"
          onClick={() => handleSubmit()}
          color="primary"
          disabled={files.length === 0}
        >
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
