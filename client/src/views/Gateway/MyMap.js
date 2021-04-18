import React from "react";
import MyMapWrapper from "../../components/MyMapWrapper";

const markers = [
  {
    id: 1,
    name: "Gateway name",
    lat: 49.423781,
    lng: 18.696487,
  },
];

function MyMap() {
  return <MyMapWrapper markers={markers} wrapperStyle={{ minHeight: 420 }} />;
}

export default MyMap;
