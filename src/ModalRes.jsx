import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalRes = (props) => {
  return (
    <div>
      <Modal isOpen={props.open_v} toggle={props.clicker}>
        <ModalHeader toggle={props.clicker}>{props.header}</ModalHeader>
        <ModalBody>
          <center>
            <img
              src={props.img}
              className="img-fluid"
              style={{ height: "50px" }}
            />
            <br />
            <br />
            <p>{props.alert_msg}</p>
            <p>{props.pending_msg}</p>
          </center>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            style={{ backgroundColor: "#ff5c5c" }}
            onClick={props.clicker}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalRes;
