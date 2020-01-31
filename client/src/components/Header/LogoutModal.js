import React, { Component } from "react";
import { ModalBody, ModalHeader, ModalFooter, Button, Form } from "reactstrap";
import { connect } from "react-redux";

import { startLogout } from "../../actions/auth";

export class LogoutModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.startLogout();
  }

  render() {
    return (
      <>
        <ModalHeader toggle={this.props.toggle}>Logout</ModalHeader>
        <Form onSubmit={this.handleSubmit} autoComplete="on">
          <ModalBody>Are you sure you want to logout?</ModalBody>
          <ModalFooter>
            <Button type="submit" color="warning" block>
              Logout
            </Button>
            <Button type="button" color="secondary" block onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(LogoutModal);
