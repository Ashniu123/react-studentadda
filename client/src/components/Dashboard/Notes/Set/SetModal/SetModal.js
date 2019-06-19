import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { GithubPicker } from 'react-color';

import { startAddSet, startEditSet, startRemoveSet } from '../../../../../actions/note';

import './SetModal.css';

export class SetModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.data.title || '',
      description: props.data.description || '',
      color: props.data.color || '#9c27b0',
      isHandlingAction: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleSubmit(e, type = this.props.type) {
    e.preventDefault();
    console.log(type);
    this.setState(
      {
        error: '',
        isHandlingAction: true
      },
      () => {
        switch (type) {
          case 'add': {
            const setObj = {
              title: this.state.title,
              description: this.state.description,
              color: this.state.color
            };
            this.props
              .startAddSet(setObj)
              .then(() => {
                this.setState({
                  isHandlingAction: false
                });
                this.props.toggle();
              })
              .catch((err) => {
                this.setState({
                  error: 'Error adding set!',
                  isHandlingAction: false
                });
              });
            break;
          }
          case 'edit':
            const setObj = {
              id: this.props.data.id,
              title: this.state.title,
              description: this.state.description,
              color: this.state.color
            };
            this.props
              .startEditSet(setObj)
              .then(() => {
                this.setState({
                  isHandlingAction: false
                });
                this.props.toggle();
              })
              .catch((err) => {
                this.setState({
                  error: 'Error editing set!',
                  isHandlingAction: false
                });
              });
            break;
          case 'remove':
            this.props
              .startRemoveSet(this.props.data.id)
              .then(() => {
                this.setState({
                  isHandlingAction: false
                });
                this.props.toggle();
              })
              .catch((err) => {
                console.log(err);
                this.setState({
                  error: 'Error removing set!',
                  isHandlingAction: false
                });
              });
            break;
          default:
            console.log('Invalid type');
        }
      }
    );
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleColorChange(color, event) {
    this.setState({
      color: color.hex
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.type === 'add' ? 'Add Set' : 'Edit Set'}
          {this.state.isHandlingAction && <FontAwesome name="spinner" spin size="lg" />}
        </ModalHeader>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
            {this.state.error && (
              <div>
                <span className="text-danger">{this.state.error + ' Try Again!'}</span>
              </div>
            )}
            <FormGroup>
              <Label for="setTitle" className="mb-0">
                Title
              </Label>
              <Input
                name="set-title"
                type="text"
                id="setTitle"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="setDescription" className="mb-0">
                Description
              </Label>
              <Input
                name="set-description"
                type="textarea"
                id="setDescription"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Color</Label>
              <GithubPicker
                width="50%"
                color={this.state.color}
                onChange={this.handleColorChange}
                colors={[
                  '#B80000',
                  '#DB3E00',
                  '#008B02',
                  '#006B76',
                  '#1273DE',
                  '#004DCF',
                  '#5300EB',
                  '#9C27B0'
                ]}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="warning" block>
              {this.props.type === 'add' ? 'Add' : 'Update'}
            </Button>
            {this.props.type === 'edit' && (
              <Button
                color="danger"
                block
                onClick={this.handleSubmit.bind(this, { preventDefault: () => null }, 'remove')}
              >
                {' '}
                Remove
              </Button>
            )}
            <Button onClick={this.props.toggle} color="secondary" block>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddSet: (setObj) => dispatch(startAddSet(setObj)),
  startRemoveSet: (id) => dispatch(startRemoveSet(id)),
  startEditSet: (setObj) => dispatch(startEditSet(setObj))
});

export default connect(
  undefined,
  mapDispatchToProps
)(SetModal);
