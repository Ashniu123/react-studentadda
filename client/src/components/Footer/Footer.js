import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './Footer.css';

const linksToOblivion = ['Help and FAQ', 'About Us', 'Privacy and Terms'];
const socialLinks = [
  {
    class: 'btn-social-google',
    href: 'http://google.com/+',
    icon: 'fa fa-google-plus'
  },
  {
    class: 'btn-social-facebook',
    href: 'http://www.facebook.com/profile.php?id=',
    icon: 'fa fa-facebook'
  },
  {
    class: 'btn-social-linkedin',
    href: 'http://www.linkedin.com/in/',
    icon: 'fa fa-linkedin'
  },
  {
    class: 'btn-social-twitter',
    href: 'http://twitter.com/',
    icon: 'fa fa-twitter'
  },
  {
    class: 'btn-social-youtube',
    href: 'http://youtube.com/',
    icon: 'fa fa-youtube'
  },
  {
    class: 'btn-social-mail',
    href: 'mailto:studentadda@outlook.com',
    icon: 'fa fa-envelope-o'
  }
];

const Footer = (props) => (
  <Row className="footer mx-0">
    <Col xs="12">
      <Row className="justify-content-center">
        <Col xs={{ size: 5, offset: 1 }} sm={{ size: 3, offset: 1 }} className="align-self-start">
          <h5>Links</h5>
          <ul className="list-unstyled">
            {linksToOblivion.map((item, index) => {
              return (
                <li key={index}>
                  <Link to="">{item}</Link>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col xs="6" sm="4" className="align-self-start">
          <h5>Our Address</h5>
          <address>
            121, L &amp; T Road,
            <br />L &amp; T, Mumbai
            <br />
            <br />
            <i className="fa fa-phone" /> +852 1234 5678
            <br />
            <i className="fa fa-fax" /> +852 8765 4321
            <br />
            <i className="fa fa-envelope" />
            <a href="mailto:studentadda@outlook.com" target="_blank" rel="noopener noreferrer">
              studentadda@outlook.com
            </a>
          </address>
        </Col>
        <Col xs="12" sm="4" className="align-self-starts">
          {socialLinks.map((item, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <br />
                  <a
                    className={item.class}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.href}
                  >
                    <i className={item.icon} />
                  </a>
                </React.Fragment>
              );
            }
            return (
              <a
                key={index}
                className={item.class}
                target="_blank"
                href={item.href}
                rel="noopener noreferrer"
              >
                <i className={item.icon} />
              </a>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="text-center">
          Copyright &copy; Studentadda {new Date().getFullYear()}
        </Col>
      </Row>
    </Col>
  </Row>
);

export default Footer;
