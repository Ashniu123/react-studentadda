/**
 * Convert all redux calls to Context API in React 16.3 ??
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import ReactCalendar from 'react-calendar';

import CalendarTable from './CalendarTable';
import Loading from '../../Loading/Loading';
import { startEventsFetch } from '../../../actions/calendar';

import './Calendar.css';

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: new Date()
    };
  }

  componentDidMount() {
    this.props
      .startEventsFetch()
      .then(() => {
        console.log(this.props.events);
      })
      .catch(() => {
        console.log('error');
      });
  }

  render() {
    return (
      <Row className="mx-0">
        {this.props.isFetchingEvents ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Col sm="9" xs="12">
              <CalendarTable events={this.props.events || []} />
            </Col>
            <Col sm="3" className="d-none d-sm-block">
              <ReactCalendar value={this.state.today} />
            </Col>
          </React.Fragment>
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchingEvents: state.calendar.isFetching,
  events: state.calendar.events
});

const mapDispatchToProps = (dispatch) => ({
  startEventsFetch: () => dispatch(startEventsFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
