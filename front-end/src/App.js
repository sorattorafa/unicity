import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import CreateUser from "./components/create-user.component";
import SimpleusersList from "./components/list-simple-user.component";
import CreateMap from "./components/map.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com">
              <img src={logo} width="150" height="100" alt="CodingTheSmartWay.com" />
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
          </nav>

          <Route path="/createuser" component={CreateUser} />  
          <Route path="/listusers" component={SimpleusersList} /> 
          <Route path="/showmap" component={CreateMap} />
        </div>
      </Router>
    );
  }
}

export default App;
