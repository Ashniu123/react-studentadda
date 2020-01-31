import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import NestedModal from "./NoteNestedModal";
import { startNoteFetch } from "../../../../../actions/note";

import "./NoteModal.scss";

export class NoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      currentImage: 0,
      isHandlingAction: false,
      nestedModal: false,
    };

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.startNoteFetchHelper = this.startNoteFetchHelper.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

  componentDidMount() {
    this.startNoteFetchHelper(0);
  }

  toggleNested(type) {
    this.setState({
      nestedModal: !this.state.nestedModal,
      modalType: type,
    });
  }

  handleNextClick() {
    if (!this.props.notes[this.state.currentImage]) {
      return;
    }
    this.setState(
      {
        currentImage: this.state.currentImage + 1,
      },
      () => {
        if (!this.props.notes[this.state.currentImage]) {
          this.startNoteFetchHelper(this.state.currentImage);
        }
      },
    );
  }

  handlePrevClick() {
    if (this.state.currentImage === 0) {
      return;
    }
    this.setState(
      {
        currentImage: this.state.currentImage - 1,
      },
      () => {
        if (!this.props.notes[this.state.currentImage]) {
          this.startNoteFetchHelper(this.state.currentImage);
        }
      },
    );
  }

  startNoteFetchHelper(pageno) {
    const noteObj = {
      id: this.props.data.id,
      pageno,
    };
    this.setState(
      {
        isHandlingAction: true,
        error: "",
      },
      () => {
        this.props
          .startNoteFetch(noteObj)
          .then(() => {
            this.setState({
              isHandlingAction: false,
            });
          })
          .catch(() => {
            this.setState({
              isHandlingAction: false,
              error: "Error fetching note",
            });
          });
      },
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        size="lg"
        backdropClassName="notemodal__backdrop"
        modalClassName="text-white"
        contentClassName="notemodal__content"
      >
        <ModalHeader toggle={this.props.toggle} className="notemodal__border__none">
          {this.props.data.title}
        </ModalHeader>
        <ModalBody className="notemodal__body">
          {this.props.notes.length > 0 ? (
            <>
              {this.state.isHandlingAction ? (
                <FontAwesomeIcon icon={faSpinner} spin size="lg" />
              ) : (
                <img
                  src={this.props.notes[this.state.currentImage]}
                  alt={`this.props.data.title_P${this.state.currentImage + 1}`}
                  className="notemodal__image"
                />
              )}
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="2x"
                onClick={this.handlePrevClick}
                style={{ float: "left" }}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
                onClick={this.handleNextClick}
                style={{ float: "right" }}
              />
            </>
          ) : (
            "No notes added for this set."
          )}

          {this.state.nestedModal && (
            <NestedModal
              toggle={this.toggleNested}
              isOpen={this.state.nestedModal}
              type={this.state.modalType}
              setId={this.props.data.id}
              pageno={this.state.currentImage}
            />
          )}
        </ModalBody>
        <ModalFooter className="notemodal__border__none">
          <Button
            color="warning"
            className="notemodal__action-button"
            onClick={this.toggleNested.bind(this, "Add")}
          >
            +
          </Button>
          <Button
            color="danger"
            className="notemodal__action-button"
            onClick={this.toggleNested.bind(this, "Remove")}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => ({
  notes: state.notes.sets.filter((set) => set.id === props.data.id)[0].notes,
});

const mapDispatchToProps = (dispatch) => ({
  startNoteFetch: (noteObj) => dispatch(startNoteFetch(noteObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal);
