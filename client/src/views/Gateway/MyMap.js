import React from "react";
import MyMapWrapper from "../../components/MyMapWrapper";

function MyMap({ markers }) {
  return <MyMapWrapper markers={markers} wrapperStyle={{ minHeight: 420 }} />;
}

export default MyMap;
