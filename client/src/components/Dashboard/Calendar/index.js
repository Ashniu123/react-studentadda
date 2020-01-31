import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Container } from "reactstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import EventModal from "./EventModal";
import Loading from "../../Loading/Loading";

import { startEventsFetch } from "../../../actions/calendar";

import "./Calendar.scss";

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      error: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.selectFunc = this.selectFunc.bind(this);
    this.eventClickFunc = this.eventClickFunc.bind(this);
    this.startEventsFetchHelper = this.startEventsFetchHelper.bind(this);
  }

  toggleModal(type, data) {
    this.setState({
      modal: !this.state.modal,
      eventType: type,
      data,
    });
  }

  selectFunc(dateObj) {
    this.toggleModal.call(this, "add", { start: dateObj.date, end: dateObj.date });
  }

  eventClickFunc({ event }) {
    const { id, title, start, end, extendedProps } = event;
    const { dow, description } = extendedProps;
    this.toggleModal.call(this, "edit", { id, title, start, end, dow, description });
  }

  startEventsFetchHelper() {
    this.setState(
      {
        error: false,
      },
      () => {
        this.props.startEventsFetch().catch((error) => {
          this.setState({
            error: true,
          });
        });
      },
    );
  }

  componentDidMount() {
    this.startEventsFetchHelper();
  }

  render() {
    return (
      <Container fluid>
        {this.props.isFetching ? (
          <Loading />
        ) : this.state.error ? (
          <Row className="justify-content-center">
            <Col>
              Error fetching events!
              <Button color="link" onClick={this.startEventsFetchHelper}>
                Retry?
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={this.props.events}
                dateClick={this.selectFunc}
                eventClick={this.eventClickFunc}
                selectable={true}
                editable={true}
              />
            </Col>
            {this.state.modal && (
              <EventModal
                isOpen={this.state.modal}
                type={this.state.eventType}
                data={this.state.data}
                toggle={this.toggleModal}
              />
            )}
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.calendar.isFetching,
  events: state.calendar.events,
});

const mapDispatchToProps = (dispatch) => ({
  startEventsFetch: () => dispatch(startEventsFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
