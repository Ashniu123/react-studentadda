import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CustomInput,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { startAddNote, startRemoveNote } from "../../../../../actions/note";

export class NoteNested extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHandlingAction: false,
      note: "",
      error: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(
      {
        isHandlingAction: true,
        error: "",
      },
      () => {
        switch (this.props.type) {
          case "Add": {
            this.props
              .startAddNote({
                id: this.props.setId,
                note: this.state.note,
                pageno: this.props.pageno,
              })
              .then(() => {
                this.setState({ isHandlingAction: false });
                this.props.toggle();
              })
              .catch(() => {
                this.setState({ isHandlingAction: false, error: "Error adding note" });
              });
            break;
          }
          case "Remove": {
            this.props
              .startRemoveNote({
                id: this.props.setId,
                pageno: this.props.pageno,
              })
              .then(() => {
                this.setState({ isHandlingAction: false });
                this.props.toggle();
              })
              .catch(() => {
                this.setState({ isHandlingAction: false, error: "Error removing note" });
              });
            break;
          }
          default: {
          }
        }
      },
    );
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          note: reader.result,
          error: "",
        });
      };
    } else {
      this.setState({
        error: "Invalid file type. Only images allowed.",
      });
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader>
            {this.props.type}{" "}
            {this.state.isHandlingAction && <FontAwesomeIcon icon={faSpinner} spin size="lg" />}
          </ModalHeader>
          <ModalBody>
            {this.state.error && <div className="text-danger">{this.state.error}</div>}
            {this.props.type === "Remove" ? (
              "Confirm delete note?"
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
            <Button type="submit" color={this.props.type === "Remove" ? "danger" : "warning"}>
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
  startAddNote: (noteObj) => dispatch(startAddNote(noteObj)),
  startRemoveNote: (noteObj) => dispatch(startRemoveNote(noteObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteNested);
