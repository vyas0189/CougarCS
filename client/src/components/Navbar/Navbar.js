import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/CougarCS-1.png';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand>
        <img
          src={logo}
          style={{ width: '175px' }}
          className="App-logo"
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>About Us</Nav.Link>
          <Nav.Link>Membership</Nav.Link>
          <Nav.Link>Events</Nav.Link>
          <Nav.Link>Career Fair</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
