import React from "react";

const Notifier = ({ status, message }) => {
  return (
    <>
      <div className="messagestatus">{status}</div>
      <div className="message">{message}</div>
    </>
  );
};

export default Notifier;
