/**
 * Convert all redux calls to Context API in React 16.3 ??
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';

import $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import EventModal from './EventModal';
import Loading from '../../Loading/Loading';

import { startEventsFetch } from '../../../actions/calendar';

import './Calendar.css';

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      error: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.selectFunc = this.selectFunc.bind(this);
    this.eventClickFunc = this.eventClickFunc.bind(this);
    this.handleEventsChange = this.handleEventsChange.bind(this);
    this.startEventsFetchHelper = this.startEventsFetchHelper.bind(this);
  }

  toggleModal(type, data) {
    this.setState({
      modal: !this.state.modal,
      eventType: type,
      eventSpecificData: data
    });
  }

  selectFunc(start, end, ...args) {
    this.toggleModal.call(this, 'add', { start, end });
  }

  eventClickFunc(event, ...args) {
    this.toggleModal.call(this, 'edit', { ...event });
  }

  startEventsFetchHelper() {
    this.setState(
      {
        error: false
      },
      () => {
        this.props
          .startEventsFetch()
          .then(() => {
            const { calendar } = this.refs;
            $(calendar).fullCalendar({
              themeSystem: 'bootstrap4',
              buttonText: {
                today: 'Today',
                month: 'Month',
                week: 'Week',
                listWeek: 'List',
                day: 'Day'
              },
              header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay, listWeek'
              },
              defaultView: 'month',
              fixedWeekCount: false,
              allDayDefault: false,
              /* Click delays */
              longPressDelay: 300,
              eventLongPressDelay: 300,
              selectLongPressDelay: 300,
              /*
					 selectable:true will enable user to select datetime slot
					 selectHelper will add helpers for selectable.
					*/
              selectable: true,
              selectHelper: true,
              // editable: true,
              select: this.selectFunc,
              eventClick: this.eventClickFunc,
              eventLimit: true,
              events: this.props.events || []
            });
          })
          .catch((error) => {
            this.setState({
              error: true
            });
          });
      }
    );
  }

  componentDidMount() {
    this.startEventsFetchHelper();
  }

  handleEventsChange(data, type) {
    const { calendar } = this.refs;
    console.log('handleEventsChange');
    switch (type) {
      case 'add':
        $(calendar).fullCalendar('renderEvent', data);
        break;
      case 'edit':
        $(calendar).fullCalendar('updateEvent', data);
        break;
      case 'remove':
        $(calendar).fullCalendar('removeEvents', data);
        break;
      default:
    }
  }

  render() {
    return this.props.isFetching ? (
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
          <div className="calendar" ref="calendar" />
        </Col>
        {this.state.modal && (
          <EventModal
            isOpen={this.state.modal}
            type={this.state.eventType}
            data={this.state.eventSpecificData}
            toggle={this.toggleModal}
            performEventsChange={this.handleEventsChange}
          />
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.calendar.isFetching,
  events: state.calendar.events
});

const mapDispatchToProps = (dispatch) => ({
  startEventsFetch: () => dispatch(startEventsFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
