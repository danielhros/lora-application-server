/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { globalStyles } from "../../shared/styles";
import { withStyles } from "@material-ui/core/styles";
import pdrApi from "../../api/pdrApi";

export const PRDList = ({ classes, refresh, gatewayId }) => {
  const [pdr, setPdr] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const getPDR = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await pdrApi.getPDRGateway({
        gatewayId,
      });
      setPdr(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getPDR();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      getPDR();
    }
  }, [refresh]);

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.tableHead}>
          <th>channel</th>
          <th>PDR</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classes.tableRow}>
          <td>7</td>
          <td>{loading ? "loading" : error ? "error" : `${pdr[0].pdr} %`}</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>8</td>
          <td>{loading ? "loading" : error ? "error" : `${pdr[1].pdr} %`}</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>9</td>
          <td>{loading ? "loading" : error ? "error" : `${pdr[2].pdr} %`}</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>10</td>
          <td>{loading ? "loading" : error ? "error" : `${pdr[3].pdr} %`}</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>11</td>
          <td>{loading ? "loading" : error ? "error" : `${pdr[4].pdr} %`}</td>
        </tr>
        <tr className={classes.tableRow}>
          <td>13</td>
          <td>{loading ? "loading" : error ? "error" : `${pdr[5].pdr} %`}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(globalStyles)(PRDList);
