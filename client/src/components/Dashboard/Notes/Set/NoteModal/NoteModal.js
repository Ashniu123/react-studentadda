import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import NestedModal from './NoteNestedModal';

import './NoteModal.css';

export class NoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      currentImage: 0,
      isHandlingAction: false,
      nestedModal: false
    };

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    // this.startNoteFetchHelper = this.startNoteFetchHelper.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

  componentDidMount() {
    // this.startNoteFetchHelper(0);
  }

  toggleNested(type) {
    this.setState({
      nestedModal: !this.state.nestedModal,
      modalType: type
    });
  }

  handleNextClick() {
    this.setState(
      {
        currentImage: this.state.currentImage + 1
      },
      () => {
        if (!this.props.notes[this.state.currentImage]) {
          this.startNoteFetchHelper(this.state.currentImage);
        }
      }
    );
  }

  handlePrevClick() {
    this.setState(
      {
        currentImage: this.state.currentImage - 1
      },
      () => {
        if (!this.props.notes[this.state.currentImage]) {
          this.startNoteFetchHelper(this.state.currentImage);
        }
      }
    );
  }

  // startNoteFetchHelper(pageno) {
  //   const noteObj = {
  //     id: this.props.data.id,
  //     pageno
  //   };
  //   this.setState(
  //     {
  //       isHandlingAction: true,
  //       error: ''
  //     },
  //     () => {
  //       this.props
  //         .startNoteFetch(noteObj)
  //         .then(() => {
  //           this.setState({
  //             isHandlingAction: false
  //           });
  //         })
  //         .catch(() => {
  //           this.setState({
  //             isHandlingAction: false,
  //             error: 'Error fetching note'
  //           });
  //         });
  //     }
  //   );
  // }

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
            <React.Fragment>
              <FontAwesome
                name="chevron-left"
                size="2x"
                onClick={this.handlePrevClick}
                disabled={this.state.currentImage === 0}
              />
              {this.state.isHandlingAction ? (
                <FontAwesome name="spinner" spin size="lg" />
              ) : (
                <img
                  src={this.props.notes[this.state.currentImage]}
                  alt={`this.props.data.title_P${this.state.currentImage + 1}`}
                />
              )}

              <FontAwesome
                name="chevron-right"
                size="2x"
                onClick={this.handleNextClick}
                disabled={this.state.currentImage + 1 === this.props.notes.length}
              />
            </React.Fragment>
          ) : (
            'No notes added for this subject.'
          )}

          {this.state.nestedModal && (
            <NestedModal
              toggle={this.toggleNested}
              isOpen={this.state.nestedModal}
              type={this.state.modalType}
            />
          )}
        </ModalBody>
        <ModalFooter className="notemodal__border__none">
          <Button
            color="warning"
            className="notemodal__action-button"
            onClick={this.toggleNested.bind(this, 'Add')}
          >
            +
          </Button>
          <Button
            color="danger"
            className="notemodal__action-button"
            onClick={this.toggleNested.bind(this, 'Remove')}
          >
            <FontAwesome name="trash" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  const notesArr = state.notes.sets.filter((setitem) => setitem.id === props.data.id);
  return {
    notes: notesArr[0]
  };
};

const mapDispatchToProps = (dispatch) => ({
  // startNoteFetch: (noteObj) => dispatch(startNoteFetch(noteObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteModal);
