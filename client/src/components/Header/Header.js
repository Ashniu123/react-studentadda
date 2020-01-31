import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import LogoutModal from "./LogoutModal";
import ProfileModal from "./ProfileModal";

import "./Header.scss";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NavbarToggled: false,
      modal: false,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleNavbar() {
    this.setState({
      NavbarToggled: !this.state.NavbarToggled,
    });
  }

  toggleModal(modalType) {
    this.setState({
      modal: !this.state.modal,
      modalType,
    });
  }

  render() {
    let navitems = [];
    if (!this.props.token) {
      const items = [
        { text: "Login", modalType: <LoginModal toggle={this.toggleModal} /> },
        { text: "Register", modalType: <RegisterModal toggle={this.toggleModal} /> },
      ];
      navitems = items.map((item, index) => {
        return (
          <NavItem className="navbar-animate" key={index}>
            <NavLink onClick={this.toggleModal.bind(this, item.modalType)}>{item.text}</NavLink>
          </NavItem>
        );
      });
    } else {
      let name = localStorage.getItem("name") || sessionStorage.getItem("name");
      name = JSON.parse(name);
      name = `${name.firstName} ${name.lastName}`;
      navitems.push(
        <NavItem className="navbar-animate" key={1}>
          <NavLink
            onClick={this.toggleModal.bind(this, <ProfileModal toggle={this.toggleModal} />)}
          >
            <img src="/images/couple.png" alt="Profile" className="profile-img" /> {name}
          </NavLink>
        </NavItem>,
      );

      // Logout
      navitems.push(
        <NavItem className="navbar-animate" key={2}>
          <NavLink onClick={this.toggleModal.bind(this, <LogoutModal toggle={this.toggleModal} />)}>
            Logout
          </NavLink>
        </NavItem>,
      );
    }

    return (
      <header>
        <Navbar color="dark" className="navbar-dark" expand="md">
          <NavbarBrand tag={Link} to="/">
            <img src="/images/logo.png" alt="StudentAdda" style={{ height: "45px" }} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.NavbarToggled} navbar>
            <Nav className="ml-auto" navbar>
              {navitems}
            </Nav>
          </Collapse>
        </Navbar>
        {this.state.modal && (
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            {this.state.modalType}
          </Modal>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Header);
