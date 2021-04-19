import React from "react";
import MyMapWrapper from "../../components/MyMapWrapper";

function MyMap({ markers }) {
  return (
    <MyMapWrapper
      defaultZoom={16}
      markers={markers}
      wrapperStyle={{ minHeight: 370 }}
    />
  );
}

export default MyMap;
