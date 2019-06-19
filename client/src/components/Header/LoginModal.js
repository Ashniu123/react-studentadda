import React, { Component } from 'react';
import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { startLogin } from '../../actions/auth';

export class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      pass: '',
      rememberMe: true
    };

    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.error.length === 0 &&
      this.state.email.length > 0 &&
      this.state.pass.length > 0
    ) {
      const loginObj = {
        email: this.state.email,
        password: this.state.pass,
        rememberMe: this.state.rememberMe
      };
      this.props.startLogin(loginObj);
    }
  }

  render() {
    return (
      <React.Fragment>
        <ModalHeader toggle={this.props.toggle}>Login</ModalHeader>
        <Form onSubmit={this.handleSubmit} autoComplete="on">
          <ModalBody className="pb-0">
            <FormGroup>
              <Label for="loginEmail" className="sr-only">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="loginEmail"
                placeholder="Enter Email"
                required
                onChange={(e) => this.setState({ email: e.target.value.trim() })}
                disabled={this.props.isLogging}
              />
            </FormGroup>
            <FormGroup>
              <Label for="loginPassword" className="sr-only">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="loginPassword"
                placeholder="Enter password"
                required
                onChange={(e) => this.setState({ pass: e.target.value })}
                disabled={this.props.isLogging}
              />
            </FormGroup>
            <div className="custom-control custom-checkbox mb-3">
              <Input
                type="checkbox"
                className="custom-control-input"
                id="rememberMe"
                checked={this.state.rememberMe}
                onChange={(e) => this.setState({ rememberMe: e.target.checked })}
                disabled={this.props.isLogging}
              />
              <label htmlFor="rememberMe" className="custom-control-label">
                Remember Password
              </label>
            </div>
            {this.props.message && <Alert color="warning">{this.props.message}</Alert>}
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="warning"
              block
              disabled={!!this.state.error || this.props.isLogging}
            >
              {this.props.isLogging ? (
                <span>
                  <FontAwesome name="spinner" spin size="lg" /> Logging In
                </span>
              ) : (
                'Login'
              )}
            </Button>
          </ModalFooter>
        </Form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogging: state.auth.isLogging,
  message: state.auth.message
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (loginObj) => dispatch(startLogin(loginObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
