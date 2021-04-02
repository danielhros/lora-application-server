import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetSelected } from "../../actions/gateway";

const GatewayDetail = ({ resetSelected }) => {
  let { id } = useParams();

  React.useEffect(() => {
    return () => {
      resetSelected();
    };
  });

  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  resetSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(GatewayDetail);
