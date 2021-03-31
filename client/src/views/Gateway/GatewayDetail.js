import React from "react";
import { useParams } from "react-router-dom";

const GatewayDetail = () => {
  let { id } = useParams();

  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
};

export default GatewayDetail;
