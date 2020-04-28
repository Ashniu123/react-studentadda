import React from "react";
import { Row, Col } from "reactstrap";

import "./Footer.scss";

const Footer = () => (
  <Row className="footer">
    <Col xs="12" className="text-center">
      Copyright &copy; Studentadda {new Date().getFullYear()}
    </Col>
  </Row>
);

export default Footer;
