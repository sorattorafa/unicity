import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Map, TileLayer} from 'react-leaflet';
import { Card, CardText} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import CreateUser from "./components/simpleuser/create-user.component"; 
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component"; 
import SimpleusersList from "./components/simpleuser/list-simple-user.component"; 
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser"; 

//components of admin user
<<<<<<< HEAD
import CreateAdminUser from "./components/adminuser/create-adminuser"; 
=======
import CreateAdminUser from "./components/adminuser/create-adminuser";
  
// components of map
import CreateMap from "./components/map/map.component";
>>>>>>> e9b1585b1ed8242a7e657670c47a3320eadc72b2

import logo from "./logo.png";
import './App.css';

class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: false,
    zoom: 2,
    userMessage: {
      name: '',
      message: ''
    },
    showMessageForm: false,
    sendingMessage: false,
    sentMessage: false,
    messages: []
  }
  render() {
    const position = [this.state.location.lat, this.state.location.lng];
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
                  <Link to="/createadminuser" className="nav-link">Criar usuário administador</Link>
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
<<<<<<< HEAD
          <Route path="/createadminuser" component={CreateAdminUser} /> 
        </div>  
        
        <div className="map">
            <Map
              className="map"
              worldCopyJump={true}
              center={position}
              zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
            <Card className="footer">
              <CardText> Made with <span role="img" aria-label="love">💚</span> by <a href="https://git.io/w3cj" target="_blank" rel="noopener noreferrer">w3cj</a></CardText>
            </Card>
          </div>    
=======
          <Route path="/showmap" component={CreateMap} />
          <Route path="/createadminuser" component={CreateAdminUser} />
        </div>
>>>>>>> e9b1585b1ed8242a7e657670c47a3320eadc72b2
      </Router>
    );
  }
}

export default App;
