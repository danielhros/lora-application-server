import React from "react";
import TopListWrapper from "../../components/TopListWrapper";
import dashboardApi from "../../api/dashboard";
import devConsole from "../../devConsole";

const initialTop = {
  message_type: "loading..",
  frequency: "loading..",
  spf: "loading..",
};

export const TopList = ({ refresh }) => {
  const [top, setTop] = React.useState(initialTop);

  const getTopValues = async () => {
    try {
      const res = await dashboardApi.getTop();
      setTop({
        message_type: res?.data[0].message_type || "none",
        frequency: res?.data[0].frequency || "none",
        spf: res?.data[0].spf || "none",
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

export default TopList;
