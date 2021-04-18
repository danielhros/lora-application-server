import React from "react";
import MyMapWrapper from "../../components/MyMapWrapper";

const markers = [
  {
    id: 1,
    name: "Gateway name",
    lat: 49.423781,
    lng: 18.696487,
  },
  {
    id: 2,
    name: "Gateway name 2",
    lat: 49.422507,
    lng: 18.697233,
  },
  {
    id: 3,
    name: "Gateway name 3",
    lat: 49.423414,
    lng: 18.693497,
  },
];

function MyMap() {
  return <MyMapWrapper markers={markers} wrapperStyle={{ minHeight: 370 }} />;
}

export default MyMap;
