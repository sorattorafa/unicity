import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Card, CardText, Button} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 
import CreateUser from "./components/simpleuser/create-user.component"; 
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component";  
import SimpleusersList from "./components/simpleuser/list-simple-user.component"; 
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser"; 
import CreateReport from "./components/report/create-report";  

import UsersList from "./components/simpleuser/list-simpleuser";  

//components of admin user
import CreateAdminUser from "./components/adminuser/create-adminuser";

//components of company user
import CreateCompanyUser from "./components/companyuser/create-companyuser";

//components of categories
import CreateCategory from "./components/categories/create-category";
  

import logo from "./logo.png";
import './App.css';    
import { getMessages, getLocation, sendMessage } from './map-components/Api';

import L from 'leaflet'; 
import userLocationURL from './map-components/userlocation.svg'; 
import messageLocationURL from './map-components/message_location.svg';
import MessageCardForm from './map-components/MessageCardForm'; 

var myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [21, 41], 
  iconAnchor: [12.5, 41], 
  popupAnchor: [0,-41]

}); 

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82]
});
 
class App extends Component {
  state = {
    location: {
      lat: -24.0394374,
      lng: -52.3771729,
    }, 
    location2: { 
      lat: 0, 
      lng: 0,
    },
    haveUsersLocation: false, 
    haveUserClick:false,
    zoom: 29,
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
      console.log(location)
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
  
 
  handleClick = (e) => { 
    console.log(e.latlng);    
    this.setState({
      location2 : e.latlng, 
      haveUserClick: true,
    });
  }




  render() { 
    const position = [this.state.location.lat, this.state.location.lng];  
    const position2 = this.state.location2;
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
                <li className="navbar-item">
                  <Link to="/createcompanyuser" className="nav-link">Criar usuário empresarial</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/createcategory" className="nav-link">Criar categoria</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/userss" className="nav-link">Visualizar usuários (antd)</Link>
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
          <Route path="/createcompanyuser" component={CreateCompanyUser} />  
          <Route path="/createcategory" component={CreateCategory} /> 
          <Route path="/userss" component={UsersList} />
        </div>   
        {
        <div className="map">
        <Map
          className="map"
          center={position}
          zoom={this.state.zoom} 
          onClick={this.handleClick}>
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />   
          {
            this.state.haveUserClick ? 
            <Marker
              position={position2}
              icon={myIcon}>
            </Marker> : ''
          }
          {
            this.state.haveUsersLocation ? 
            <Marker
              position={position}
              icon={myIcon}>
            </Marker> : ''
          }
          {this.state.messages.map(message => (
            <Marker
              key={message._id}
              position={[message.latitude, message.longitude]}
              icon={messageIcon}>
              <Popup>
                <p><em>{message.name}:</em> {message.message}</p>
                { message.otherMessages ? message.otherMessages.map(message => <p key={message._id}><em>{message.name}:</em> {message.message}</p>) : '' }
              </Popup>
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
          </div>      
        }
      </Router>
    );
  }
}

export default App;
