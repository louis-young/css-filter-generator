import React from "react";
import PropTypes from "prop-types";

import "./Message.scss";

const Message = ({ message }) => {
  if (!message) {
    return <></>;
  }

  return (
    <>
      <p className="message">{message}</p>
    </>
  );
};

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
