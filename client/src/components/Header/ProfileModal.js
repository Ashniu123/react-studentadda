import React, { Component } from "react";
import { Col, ModalBody, ModalHeader, ModalFooter, Button, Form } from "reactstrap";
import { connect } from "react-redux";

export class ProfileModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // fetch profile details here
    setTimeout(() => {
      this.setState({ isLoading: false, profileimg: "/images/couple.png" });
    }, 1000);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <ModalHeader toggle={this.props.toggle}>Profile</ModalHeader>
        {this.state.isLoading ? (
          <ModalBody className="align-self-center">
            <div className="lds-hourglass" />
          </ModalBody>
        ) : (
          <Form onSubmit={this.handleSubmit} autoComplete="on">
            <ModalBody>
              <Col xs="12">
                <img src={this.state.profileimg} alt="Profile" className="avatar" />
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="warning" block>
                Save
              </Button>
              <Button type="button" color="secondary" block onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        )}
      </>
    );
  }
}

export default connect(undefined, undefined)(ProfileModal);
