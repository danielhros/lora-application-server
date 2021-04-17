const globalStyles = (theme) => ({
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
    // display: "flex",
    // flex: "1",
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  tableProgressBar: {
    // height: 2,
    marginBottom: 2,
  },
  breadCrumpsLink: {
    color: "inherit",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  breadCrumpsButton: {
    padding: 0,
  },
  // Table styles
  table: {
    borderCollapse: "collapse",

    "& tr:not(:last-child)": {
      borderBottom: "0.1px solid rgba(255, 255, 255, 0.12)",
    },

    "& td": {
      width: "50%",
    },
  },
  tableHead: {
    "& > th:first-child": {
      textAlign: "right",
      paddingRight: 10,
    },
    "& > th:last-child": {
      textAlign: "left",
      paddingLeft: 10,
    },
    "& > th": {
      paddingBottom: 10,
    },
  },
  tableRow: {
    "& > td:first-child": {
      textAlign: "right",
      paddingRight: 10,
    },
    "& > td:last-child": {
      textAlign: "left",
      paddingLeft: 10,
    },
    "& > td": {
      paddingBottom: 5,
      paddingTop: 5,
    },
  },
});

export { globalStyles };
