import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import { Card, CardText} from 'reactstrap';
//import "bootstrap/dist/css/bootstrap.min.css"; 
import './map.css';
export default class CreateMap extends Component  { 
  
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
        <CardText> Made with <span role="img" aria-label="love">💚</span> by <a href="https://git.io/w3cj" target="_blank" rel="noopener noreferrer">UNICITY</a></CardText>
      </Card>
    </div> 
    );
  }
}
