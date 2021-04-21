import React from "react";
import MyMapWrapper from "../../components/MyMapWrapper";
import dashboardApi from "../../api/dashboard";
import devConsole from "../../devConsole";

function MyMap({ refresh }) {
  const [markers, setMarkers] = React.useState([]);

  const getMarkers = async () => {
    try {
      const res = await dashboardApi.getMarkers();
      setMarkers(res?.data || []);
    } catch (error) {
      devConsole.log(error);
    }
  };
  React.useEffect(() => {
    getMarkers();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      setMarkers([]);
      getMarkers();
    }
  }, [refresh]);

  return (
    <MyMapWrapper
      markers={markers}
      wrapperStyle={{ minHeight: 370 }}
      defaultZoom={11}
      title={"Map of gateways"}
    />
  );
}

export default MyMap;
