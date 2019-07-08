import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import App from '../../App.js';
import { getLocation, sendMessage} from './map-components/Api';

import NavBar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

import L from 'leaflet';  
// icons to marker
import userLocationURL from './map-components/userlocation.svg'; 
import messageLocationURL from './map-components/message_location.svg'; 
import securityIcon from './map-components/download.png'; 
import iluminationIcon from './map-components/ilum.png'; 
import mobilityIcon from './map-components/mobilidade.png'; 
import viaIcon from './map-components/vias.jpeg'; 
import naturezaIcon from './map-components/natureza.png'; 
import accessIcon from './map-components/acessibilidade.png';  
import prefeituraIcon from './map-components/prefeitura.png';  
import saneamentoIcon from './map-components/saneamento.png';  



import MessageCardForm from './map-components/MessageCardForm'; 
import CreateReport from "../report/create-report";

const { Content } = Layout;

var myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [21, 41], 
  iconAnchor: [12.5, 41], 
  popupAnchor: [0,-41]

});   

var icons = { 
  
  'prefeituraIcon': L.icon({
    iconUrl: prefeituraIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }), 
  
  'saneamentoIcon': L.icon({
    iconUrl: saneamentoIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }), 
  
  'securityIcon': L.icon({
    iconUrl: securityIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }), 

  'iluminationIcon': L.icon({ 
    iconUrl: iluminationIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }), 

  'mobilityIcon': L.icon({ 
    iconUrl: mobilityIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }),
  'viaIcon': L.icon({ 
    iconUrl: viaIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }),
  'naturezaIcon': L.icon({ 
    iconUrl: naturezaIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }), 
  'accessIcon':  L.icon({ 
    iconUrl: accessIcon,
    iconSize: [30, 50],  
    iconAnchor: [12.5, 41], 
    popupAnchor: [0,-41] 
  }),   
}


const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82]
});
 
class ReportMap extends Component {
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
    messages: [], 
    reports: [], 
    label: ''
  }  
  componentDidMount() {  
    console.log(this.props.match.params.id)
    axios.get('/reports')
    .then(response => {
        this.setState({reports: response.data}); 
      //  console.log(this.state.reports)
    })
    .catch(function (error) {
        console.log(error);
    }) 
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
  redirect = () => {
    document.location.reload()  
  }
  render() {  
    // primeira posição pode ser encontrada automaticamente
    const position = [this.state.location.lat, this.state.location.lng]; 
    // posição para o clique do mouse  
    const position2 = this.state.location2;   
    const iduser = this.props.match.params.id;
    //posição dividida em longitude e latitude 
    const {lat, lng} = this.state.location2;  
    return (
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
        <NavBar />
        
        <Layout>
          <LateralMenu pagina = "createreport" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "0px 0px 0px 0px" }} >
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
              <Popup>  
              {/* <p>latitude: {lat}  </p>
              <p>  longitude: {lng} </p>   */}
              <div className="collpase nav-collapse"> 
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to = {{ 
                    pathname:'/createreport',  
                    state: { 
                      position2
                    }  
                  }} className="nav-link">Adicionar relato </Link>  
                </li>  
                </ul>
              </div>    
                </Popup>  
            </Marker> : ''   
          }
          {
            this.state.haveUsersLocation ? 
            <Marker
              position={position}
              icon={myIcon}> 
            </Marker> : ''
          }    
          { 
            this.state.reports.map(report => 
              (              
              <Marker    
               key={report._id} 
               position={[report.lat, report.lng]} 
               icon={icons[report.category.label]}>  
                  <Popup>   
                    <p><strong> {report.title} </strong> </p>
                    <p><em> {report.description} </em></p> 
                    <nav>
                    <a href={"http://localhost:3000/viewreportcompany/"+report._id}>Visualizar Relato</a>
                     </nav> 
                  </Popup>
              </Marker>
              )  
            ) 
          }
        </Map>
        {/* {
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
            <CardText>Obrigado por enviar a mensagem!</CardText>
          </Card>
        }  */}

          </div>      
          </Content>
        </Layout>
      </Layout>
        // <Route path="/createreport" component={ CreateReport } />

    );
  }
}

export default ReportMap;
