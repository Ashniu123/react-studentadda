import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';

import { startSetsFetch } from '../../../../actions/note';
import Loading from '../../../Loading/Loading';
import SetItem from './SetItem/SetItem';
import SetModal from './SetModal/SetModal';
import NoteModal from './NoteModal/NoteModal';

export class SetofNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      error: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.startSetsFetchHelper = this.startSetsFetchHelper.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleOpenSet = this.handleOpenSet.bind(this);
  }

  toggleModal(type, data = {}) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
      setData: data
    });
  }

  startSetsFetchHelper() {
    this.setState(
      {
        error: false
      },
      () => {
        this.props
          .startSetsFetch()
          .then(() => {})
          .catch((err) => {
            this.setState({
              error: true
            });
          });
      }
    );
  }

  componentDidMount() {
    this.startSetsFetchHelper();
  }

  handleAddSet() {
    this.toggleModal.call(this, 'add');
  }

  handleEditSet(data) {
    this.toggleModal.call(this, 'edit', data);
  }

  handleOpenSet(data) {
    this.toggleModal.call(this, 'note', data);
  }

  render() {
    return this.props.isFetching ? (
      <Loading />
    ) : this.state.error ? (
      <Row>
        <Col>
          Error fetching sets!
          <Button color="link" onClick={this.startSetsFetchHelper}>
            Retry?
          </Button>
        </Col>
      </Row>
    ) : (
      <React.Fragment>
        <Row className="align-items-end">
          <Col>
            <Button color="info" onClick={this.handleAddSet}>
              Add Set
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {this.props.sets.map((setitem) => {
            return (
              <SetItem
                {...setitem}
                key={setitem.id}
                onEdit={this.handleEditSet.bind(this, setitem)}
                onOpen={this.handleOpenSet.bind(this, setitem)}
              />
            );
          })}
        </Row>
        {this.state.modal ? (
          this.state.modalType === 'note' ? (
            <NoteModal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              data={this.state.setData}
            />
          ) : (
            <SetModal
              isOpen={this.state.modal}
              type={this.state.modalType}
              toggle={this.toggleModal}
              data={this.state.setData}
            />
          )
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.notes.isFetching,
  sets: state.notes.sets
});

const mapDispatchToProps = (dispatch) => ({
  startSetsFetch: () => dispatch(startSetsFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetofNotes);
