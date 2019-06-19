import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CustomInput,
  FormGroup,
  Label,
  Form
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import { startAddNote } from '../../../../../actions/note';

export class NoteNested extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHandlingAction: false,
      file: '',
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
    this.setState(
      {
        isHandlingAction: true,
        error: ''
      },
      () => {
        // add switch case here
        setTimeout(() => {
          this.setState(
            {
              isHandlingAction: false
            },
            () => {
              this.props.toggle();
            }
          );
        }, 1000);
      }
    );
  }

  handleFileUpload(e) {
    // e.persist();
    // console.log(e);
    const file = e.target.files[0];
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      console.log('File is valid');
      this.setState({
        file,
        error: ''
      });
    } else {
      this.setState({
        error: 'Invalid file type. Only images allowed.'
      });
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader>
            {this.props.type}{' '}
            {this.state.isHandlingAction && <FontAwesome name="spinner" spin size="lg" />}
          </ModalHeader>
          <ModalBody>
            {this.state.error && <div className="text-danger">{this.state.error}</div>}
            {this.props.type === 'Remove' ? (
              'Confirm delete note?'
            ) : (
              <FormGroup>
                <Label for="noteUpload">File Browser</Label>
                <CustomInput
                  type="file"
                  id="noteUpload"
                  name="add-note"
                  onChange={this.handleFileUpload}
                />
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color={this.props.type === 'Remove' ? 'danger' : 'warning'}>
              {this.props.type}
            </Button>
            <Button onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  startAddNote: (noteObj) => dispatch(startAddNote(noteObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteNested);
