import React from "react";
import { Table } from "reactstrap";
import moment from "moment";
import shortid from "shortid";

const CalendarTableRow = ({ index, title, start, end, description }) => (
  <tr>
    <td>{index}</td>
    <td>{title}</td>
    <td>{moment(start).format("DD MMMM, YYYY")}</td>
    <td>{moment(end).format("DD MMMM, YYYY")}</td>
    <td>{description}</td>
  </tr>
);

const CalendarTable = ({ events }) => (
  <Table striped>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Start</th>
        <th>End</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {events.map((event, index) => {
        return <CalendarTableRow key={shortid.generate()} index={index} {...event} />;
      })}
    </tbody>
  </Table>
);

export default CalendarTable;
