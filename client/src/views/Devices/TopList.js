/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import TopListWrapper from "../../components/TopListWrapper";
import deviceApi from "../../api/deviceApi";

const initialTop = {
  message_type: "loading..",
  frequency: "loading..",
  spf: "loading..",
};

export const TopList = ({ refresh, deviceId }) => {
  const [top, setTop] = React.useState(initialTop);

  const getTopValues = async () => {
    try {
      const res = await deviceApi.getTop({
        deviceId,
      });
      setTop({
        message_type: res?.data[0]?.message_type || "none",
        frequency: res?.data[0]?.frequency || "none",
        spf: res?.data[0]?.spf || "none",
      });
    } catch (error) {
      setTop({
        message_type: "error",
        frequency: "error",
        spf: "error",
      });
    }
  };

  React.useEffect(() => {
    getTopValues();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      setTop(initialTop);
      getTopValues();
    }
  }, [refresh]);

  return <TopListWrapper top={top} />;
};

const mapStateToProps = ({ result }) => ({
  deviceId: result.selected.data.id,
});

export default connect(mapStateToProps)(TopList);
