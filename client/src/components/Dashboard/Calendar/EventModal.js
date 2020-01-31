import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import DateTimeField from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { startAddEvent, startEditEvent, startRemoveEvent } from "../../../actions/calendar";

export class EventModal extends Component {
  constructor(props) {
    super(props);

    console.log(props.data);

    this.state = {
      startDate: props.data.start,
      endDate: props.data.end,
      dow: props.data.dow || [],
      title: props.data.title || "",
      description: props.data.description || "",
      isHandlingAction: false,
      error: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedDays = this.handleSelectedDays.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleSelectedDays(selected) {
    const index = this.state.dow.indexOf(selected);
    if (index < 0) {
      this.state.dow.push(selected);
    } else {
      this.state.dow.splice(index, 1);
    }
    this.setState({ dow: [...this.state.dow] });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleStartDateChange(momentObj) {
    this.setState({
      startDate: momentObj,
    });
  }

  handleEndDateChange(momentObj) {
    this.setState({
      endDate: momentObj,
    });
  }

  handleSubmit(e, type = this.props.type) {
    e.preventDefault();
    this.setState(
      {
        error: "",
        isHandlingAction: true,
      },
      () => {
        switch (type) {
          case "add": {
            const data = {
              title: this.state.title,
              start: this.state.startDate,
              end: this.state.endDate,
              dow: this.state.dow,
              description: this.state.description,
            };
            this.props
              .startAddEvent(data)
              .then(() => {
                this.setState({
                  isHandlingAction: false,
                });
                this.props.toggle();
              })
              .catch((err) => {
                this.setState({
                  isHandlingAction: false,
                  error: "Error adding event!",
                });
              });
            break;
          }
          case "edit": {
            this.props.data.title = this.state.title;
            this.props.data.start = this.state.startDate;
            this.props.data.end = this.state.endDate;
            this.props.data.dow = this.state.dow;
            this.props.data.description = this.state.description;
            this.props
              .startEditEvent(this.props.data)
              .then(() => {
                this.setState({
                  isHandlingAction: false,
                });
                this.props.toggle();
              })
              .catch((err) => {
                this.setState({
                  isHandlingAction: false,
                  error: "Error editing event!",
                });
              });
            break;
          }
          case "remove": {
            this.props
              .startRemoveEvent(this.props.data.id)
              .then(() => {
                this.setState({
                  isHandlingAction: false,
                });
                this.props.toggle();
              })
              .catch((err) => {
                this.setState({
                  isHandlingAction: false,
                  error: "Error removing event!",
                });
              });
            break;
          }
          default:
        }
      },
    );
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg">
        <ModalHeader toggle={this.props.toggle}>
          {this.props.type === "add" ? "Add Event" : "Edit Event"}
          {this.state.isHandlingAction && <FontAwesomeIcon icon={faSpinner} spin size="lg" />}
        </ModalHeader>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
            {this.state.error && (
              <div>
                <span className="text-danger">{this.state.error}</span>
                <Button
                  color="link"
                  onClick={this.handleSubmit.bind(this, { preventDefault: () => null })}
                >
                  Retry?
                </Button>
              </div>
            )}
            <FormGroup>
              <Label for="eventTitle" className="mb-0">
                Title
              </Label>
              <Input
                name="text"
                id="eventTitle"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </FormGroup>
            <Label className="mb-0">Start Date</Label>
            <br />
            <DateTimeField value={this.state.startDate} onChange={this.handleStartDateChange} />
            <Label className="mt-2 mb-0">End Date</Label>
            <DateTimeField value={this.state.endDate} onChange={this.handleEndDateChange} />
            <FormGroup className="pt-3">
              <Label for="eventDescription" className="mb-0">
                Description
              </Label>
              <Input
                type="textarea"
                name="description"
                id="eventDescription"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </FormGroup>

            <Label className="mb-0">Repeat</Label>
            <br />
            <ButtonGroup>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                (day, index) => {
                  return (
                    <Button
                      key={`day_${index}`}
                      color="light"
                      onClick={() => this.handleSelectedDays(index)}
                      active={this.state.dow.includes(index)}
                    >
                      {day}
                    </Button>
                  );
                },
              )}
            </ButtonGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="warning" block>
              {this.props.type === "add" ? "Add" : "Update"}
            </Button>
            {this.props.type === "edit" && (
              <Button
                color="danger"
                block
                onClick={this.handleSubmit.bind(this, { preventDefault: () => null }, "remove")}
              >
                {" "}
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
  startAddEvent: (eventObj) => dispatch(startAddEvent(eventObj)),
  startEditEvent: (eventObj, id) => dispatch(startEditEvent(eventObj, id)),
  startRemoveEvent: (id) => dispatch(startRemoveEvent(id)),
});

export default connect(undefined, mapDispatchToProps)(EventModal);
