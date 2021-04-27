/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import MyMapWrapper from "../../components/MyMapWrapper";
import devConsole from "../../devConsole";
import gatewayApi from "../../api/gatewayApi";

const getCircleColor = (rssi) => {
  if (rssi < -90) {
    return "#EC5B56";
  }

  if (rssi < -60) {
    return "#EFAF41";
  }

  if (rssi < -30) {
    return "#E7F337";
  }
  return "#72C040";
};

function MyMap({ gateway, refresh }) {
  const [circles, setCircles] = React.useState([]);

  const getCircles = async () => {
    setCircles([]);
    try {
      const res = await gatewayApi.getCircles({
        gatewayId: gateway.id,
      });

      const sortedCircles =
        res?.data?.sort((a, b) => a.distance - b.distance) || [];

      setCircles(
        sortedCircles.map((circle) => {
          return {
            distance: circle.distance,
            stroke: getCircleColor(circle.rssi),
          };
        })
      );
    } catch (error) {
      devConsole.log(error);
      setCircles([]);
    }
  };

  React.useEffect(() => {
    getCircles();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      setCircles([]);
      getCircles();
    }
  }, [refresh]);

  return (
    <MyMapWrapper
      markers={[
        {
          id: 1,
          name: gateway.name || "none",
          lat: gateway.lat || 49.423781,
          lng: gateway.lng || 18.696487,
        },
      ]}
      circles={circles}
      wrapperStyle={{ minHeight: 420 }}
    />
  );
}

export default MyMap;
