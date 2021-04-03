import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetSelected, getGatewayDetail } from "../../actions/gateway";
import NoRecourse from "../NoResource";

const GatewayDetail = ({
  refresh,
  resetSelected,
  getGatewayDetail,
  selected,
}) => {
  let { id } = useParams();

  React.useEffect(() => {
    getGatewayDetail({ id });
    return () => {
      resetSelected();
    };
  }, [getGatewayDetail, id, resetSelected]);

  React.useEffect(() => {
    if (refresh) {
      getGatewayDetail({ id });
    }
  }, [getGatewayDetail, id, resetSelected, refresh]);

  if (selected === null) {
    return (
      <div>
        <h3>Loading</h3>
      </div>
    );
  }

  if (selected === undefined) {
    return <NoRecourse recourse={id} />;
  }

  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
};

const mapStateToProps = ({ gateway }) => ({
  selected: gateway.selected,
});

const mapDispatchToProps = {
  resetSelected,
  getGatewayDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(GatewayDetail);
