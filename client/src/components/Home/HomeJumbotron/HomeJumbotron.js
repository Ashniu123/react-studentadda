import React from "react";
import { Jumbotron, Container } from "reactstrap";

const HomeJumbotron = () => (
  <Jumbotron fluid className="my-0">
    <Container fluid>
      <h1 className="display-3">Welcome to Studentadda</h1>
      <p className="lead">The only place a student will ever need to be.</p>
    </Container>
  </Jumbotron>
);

export default HomeJumbotron;
