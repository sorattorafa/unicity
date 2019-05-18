import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Map, TileLayer, Marker} from 'react-leaflet';
import { Card, CardText, Button} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import CreateUser from "./components/simpleuser/create-user.component"; 
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component"; 
import SimpleusersList from "./components/simpleuser/list-simple-user.component"; 
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser"; 
import CreateReport from "./components/report/create-report"; 

//components of admin user
import CreateAdminUser from "./components/adminuser/create-adminuser";
  
import logo from "./logo.png";
import './App.css';    
import { getMessages, getLocation, sendMessage } from './map-components/Api';

import L from 'leaflet'; 
import userLocationURL from './map-components/userlocation.svg'; 
import messageLocationURL from './map-components/message_location.svg';
import MessageCardForm from './map-components/MessageCardForm'; 

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
}); 

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82]
});
 
class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: true,
    zoom: 23,
    userMessage: {
      name: '',
      message: ''
    },
    showMessageForm: false,
    sendingMessage: false,
    sentMessage: false,
    messages: []
  }  
  componentDidMount() {
    getMessages()
      .then(messages => {
        this.setState({
          messages
        });
      });
  }

  showMessageForm = () => {
    this.setState({
      showMessageForm: true
    });
    getLocation()
    .then(location => {
      this.setState({
        location,
        haveUsersLocation: true,
        zoom: 13
      });
    });
  }

  cancelMessage = () => {
    this.setState({
      showMessageForm: false
    });
  }

  formIsValid = () => {
    let { name, message } = this.state.userMessage;
    name = name.trim();
    message = message.trim();

    const validMessage =
      name.length > 0 && name.length <= 500 &&
      message.length > 0 && message.length <= 500;

    return validMessage && this.state.haveUsersLocation ? true : false;
  }

  formSubmitted = (event) => {
    event.preventDefault();
    
    if (this.formIsValid()) {
      this.setState({
        sendingMessage: true
      });

      const message = {
        name: this.state.userMessage.name,
        message: this.state.userMessage.message,
        latitude: this.state.location.lat,
        longitude: this.state.location.lng,
      };

      sendMessage(message)
        .then((result) => {
          setTimeout(() => {
            this.setState({
              sendingMessage: false,
              sentMessage: true
            });
          }, 4000);
        });
    }
  }

  valueChanged = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }))
  }
  render() { 
    const position = [this.state.location.lat, this.state.location.lng];
    return (  
      <Router>    
          <div className="container">        
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                  <Link to="/createadminuser" className="nav-link">Criar usuário administador</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createreport" className="nav-link">Criar Relato</Link>
                </li>
              </ul>
            </div>
          </nav> 
          <Route path="/createuser" component={CreateUser} />
          <Route path="/createreport" component={CreateReport} />   
          <Route path="/edit/:id" component={EditSimpleuser} />
          <Route path="/listusers" component={SimpleusersList} />  
          <Route path="/delete/:id" component={DeleteSimpleuser} /> 
          <Route path="/createadminuser" component={CreateAdminUser} /> 
        </div>  
        
        {/* <div className="map">
            <Map
              className="map"
              worldCopyJump={true}
              center={position}
              zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />  
              {
              this.state.haveUsersLocation ? 
              <Marker
              position={position}
              icon={myIcon}>
              </Marker> : ''
              } 
              { 
                this.state.messages.map(message => (
              <Marker
                key={message._id}
                position={[message.latitude, message.longitude]}
                icon={messageIcon}>
            </Marker>
          ))}
            </Map> 
            {
          !this.state.showMessageForm ?
          <Button className="message-form" onClick={this.showMessageForm} color="info">Add a Message</Button> :
          !this.state.sentMessage ?
          <MessageCardForm
            cancelMessage={this.cancelMessage}
            showMessageForm={this.state.showMessageForm}
            sendingMessage={this.state.sendingMessage}
            sentMessage={this.state.sentMessage}
            haveUsersLocation={this.state.haveUsersLocation}
            formSubmitted={this.formSubmitted}
            valueChanged={this.valueChanged}
            formIsValid={this.formIsValid}
          /> :
          <Card body className="thanks-form">
            <CardText>Thanks for submitting a message!</CardText>
          </Card>
        }
            <Card className="footer">
              <CardText> Made with <span role="img" aria-label="love">💚</span> by <a href="https://github.com" target="_blank" rel="noopener noreferrer">Unicity Team</a></CardText>
            </Card>
          </div>     */}
      </Router>
    );
  }
}

export default App;
