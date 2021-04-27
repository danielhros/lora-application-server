import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import gatewayApi from "../../api/gatewayApi";
import devConsole from "../../devConsole";
import { useDebounce } from "use-debounce";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export const Upload = ({ gatewayId, refresh }) => {
  const localClasses = useStyles();

  const [files, setFiles] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [debounceKey] = useDebounce(key, 1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (refresh) {
      setFiles([]);
      setKey(debounceKey + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

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
        setLoading(true);
        await gatewayApi.sendSetap({
          setap: JSON.stringify(gatewaySettings),
          gatewayId,
        });
        setFiles([]);
        setKey(debounceKey + 1);
      } catch (error) {
        devConsole.log(error);
      }

      setLoading(false);
    };

    fr.readAsText(fileObj);
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <DropzoneArea
          key={debounceKey}
          showPreviews={true}
          showPreviewsInDropzone={false}
          useChipsForPreview
          previewChipProps={{ classes: { root: localClasses.previewChip } }}
          previewText="Selected files"
          filesLimit={1}
          onChange={handleAddFiles}
          acceptedFiles={["application/JSON"]}
        />
      </MuiThemeProvider>

      <Grid container item justify="flex-end" style={{ marginTop: 10 }}>
        <Button
          onClick={() => {
            setFiles([]);
            setKey(debounceKey + 1);
          }}
          color="primary"
          disabled={files.length === 0 || loading}
          style={{ marginRight: 10 }}
        >
          CANCEL
        </Button>

        <div className={localClasses.wrapper}>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            color="primary"
            disabled={files.length === 0 || loading}
          >
            submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              className={localClasses.buttonProgress}
            />
          )}
        </div>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  previewChip: {
    maxWidth: 150,
    color: "white",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: "relative",
  },
}));

export default Upload;
