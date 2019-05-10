import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// components of simple user
import CreateUser from "./components/simpleuser/create-user.component"; 
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component"; 
import SimpleusersList from "./components/simpleuser/list-simple-user.component"; 
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser"; 

//components of admin user
import CreateAdminUser from "./components/adminuser/create-adminuser";
  
// components of map
import CreateMap from "./components/map/map.component";

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
                <li className="navbar-item">
                  <Link to="/createadminuser" className="nav-link">Criar usuário administador</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/createuser" component={CreateUser} />   
          <Route path="/edit/:id" component={EditSimpleuser} />
          <Route path="/listusers" component={SimpleusersList} />  
          <Route path="/delete/:id" component={DeleteSimpleuser} /> 
          <Route path="/showmap" component={CreateMap} />
          <Route path="/createadminuser" component={CreateAdminUser} />
        </div>
      </Router>
    );
  }
}

export default App;
