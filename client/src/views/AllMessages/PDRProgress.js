import React from "react";
import PDRProgressWrapper from "../../components/PDRProgressWrapper";
import pdrApi from "../../api/pdrApi";

export const PDRProgress = ({ refresh }) => {
  const [pdr, setPdr] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const getPDR = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await pdrApi.getPDRAllMessages();
      setPdr(data.pdr);
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

  return <PDRProgressWrapper value={pdr} loading={loading} error={error} />;
};

export default PDRProgress;
