import React from "react";
import { connect } from "react-redux";
import {
  getDownlinkMessages,
  getCountOfDownlinkMessages,
  cleanAllMessages,
} from "../../actions/messages";
import DownlinkMessagesWrapper from "../../components/DownlinkMessagesWrapper";

export const SentDownlinkMessages = (props) => {
  return (
    <DownlinkMessagesWrapper
      {...props}
      sent={true}
      showPagination={false}
      rowsPerPageInit={3}
      sortAllowed={false}
      tableTitle={"Latest sent downlink messages"}
    />
  );
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
