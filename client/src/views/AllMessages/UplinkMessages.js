import React from "react";
import { connect } from "react-redux";
import {
  getUplinkMessages,
  getCountOfUplinkMessages,
  cleanAllMessages,
} from "../../actions/messages";
import UplinkMessageWrapper from "../../components/UplinkMessagesWrapper";

export const UplinkMessages = (props) => {
  return <UplinkMessageWrapper {...props} />;
};

const mapStateToProps = ({ messages }) => ({
  messages: messages.uplink.messages,
  rowsPerPage: messages.uplink.rowsPerPage,
  count: messages.uplink.count,
});

const mapDispatchToProps = {
  getUplinkMessages,
  getCountOfUplinkMessages,
  cleanAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UplinkMessages);
