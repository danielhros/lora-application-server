import React from "react";
import { connect } from "react-redux";
import {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  cleanAllMessages,
} from "../../actions/messages";
import DownlinkMessagesWrapper from "../../components/DownlinkMessagesWrapper";

export const ScheduledDownlinkMessages = (props) => {
  return <DownlinkMessagesWrapper {...props} sent={false} />;
};

const mapStateToProps = ({ messages }) => ({
  messages: messages.scheduledDownlink.messages,
  rowsPerPage: messages.scheduledDownlink.rowsPerPage,
  count: messages.scheduledDownlink.count,
});

const mapDispatchToProps = {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  cleanAllMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledDownlinkMessages);
