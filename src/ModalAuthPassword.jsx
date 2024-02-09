import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import otp_sms from "./img/bluepassword.png";
import { FormGroup, Form, Input, Row, Col } from "reactstrap";

const ModalAuthPassword = (props) => {
  return (
    <div>
      <Modal isOpen={props.open_v} toggle={props.clicker}>
        <ModalHeader toggle={props.clicker}>Verification</ModalHeader>
        <ModalBody>
          <center>
            <img
              src={otp_sms}
              className="img-fluid"
              style={{ height: "100px" }}
            />
            <br />
          </center>
          <Form onSubmit={props.userPassAuthSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    style={{
                      textAlign: "left",
                      color: "#ff5c5c",
                      fontWeight: "bold",
                    }}
                  >
                    Enter Password
                  </label>
                  <Input
                    required="true"
                    autoComplete="off"
                    placeholder="Enter Here"
                    type="password"
                    onChange={(e)=>props.userPassAuthValueHandler(e.target.value)}
                  />
                </FormGroup>
                <center>
                  <Button
                    type="button"
                    className="btn"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ff5c5c",
                    }}
                    onClick={props.authenticatePassword}
                  >
                    Submit
                  </Button>
                </center>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ModalAuthPassword;
