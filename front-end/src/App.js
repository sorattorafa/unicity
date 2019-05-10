import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// components of simple user
import CreateUser from "./components/simpleuser/create-user.component";
import CreateReport from "./components/report/create-report";
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component"; 
import SimpleusersList from "./components/simpleuser/list-simple-user.component"; 
 
// components of map
import CreateMap from "./components/map/map.component";

import logo from "./logo.png";

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com">
              <img src={logo} width="60" height="60" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Unicity</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/createuser" className="nav-link">Criar usuario</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/listusers" className="nav-link">Visualizar usuarios</Link>
                </li> 
              
                <li className="navbar-item">
                  <Link to="/showmap" className="nav-link">Ver Mapa</Link>
                </li>
              </ul>
            </div>
          </nav> */}

        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Unicity</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/createuser">Criar usuário</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

          <Route path="/createuser" component={CreateUser} />   
          <Route path="/edit/:id" component={EditSimpleuser} />
          <Route path="/listusers" component={SimpleusersList} /> 
          <Route path="/showmap" component={CreateMap} />
          <Route path="/createreport" component={CreateReport} />
        </div>
      </Router>
    );
  }
}

export default App;
