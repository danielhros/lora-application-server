/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import MyCharWrapper from "../../components/MyChartWrapper";
import chartApi from "../../api/chartApi";
import devConsole from "../../devConsole";

const initialData = [
  ...[1, 2, 3, 4, 5].map((_) => {
    return {
      name: "loading",
      uplink: 0,
      collisions: 0,
      downlink: 0,
    };
  }),
];

const errorData = [
  ...[1, 2, 3, 4, 5].map((_) => {
    return {
      name: "error",
      uplink: 0,
      collisions: 0,
      downlink: 0,
    };
  }),
];

export const MyChart = ({ refresh, deviceId }) => {
  const [data, setData] = React.useState(initialData);

  const getMessages = async () => {
    setData(initialData);

    try {
      const res = await chartApi.getDevice({
        deviceId,
      });
      setData(res.data);
    } catch (error) {
      setData(errorData);
      devConsole.log(error);
    }
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      getMessages();
    }
  }, [refresh]);

  return (
    <MyCharWrapper
      data={data}
      withCollisions={true}
      subtitle={"uplink & downlink & collisions"}
    />
  );
};

export default MyChart;
