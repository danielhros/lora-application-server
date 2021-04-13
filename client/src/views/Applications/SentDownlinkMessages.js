import React from "react";
import { connect } from "react-redux";
import { cleanAllMessages } from "../../actions/messages";
import {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
} from "../../actions/application";
import DownlinkMessagesWrapper from "../../components/DownlinkMessagesWrapper";

export const SentDownlinkMessages = (props) => {
  return <DownlinkMessagesWrapper {...props} sent={true} />;
};

const mapStateToProps = ({ messages }) => ({
  messages: messages.sentDownlink.messages,
  rowsPerPage: messages.sentDownlink.rowsPerPage,
  count: messages.sentDownlink.count,
});

const mapDispatchToProps = {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  cleanAllMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentDownlinkMessages);
