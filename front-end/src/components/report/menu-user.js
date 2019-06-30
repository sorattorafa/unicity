import React, {Component} from 'react';  
 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class MenuSimpleUser extends Component { 
 
    componentWillMount(){ 
      console.log(this.props.match.params.id)
    }
    render() {  
        const url = "/listreportbyuser/"+this.props.match.params.id; 
        const mapuser = "/map/"+this.props.match.params.id;
        return (    
            <div className="container">  
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase nav-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to={mapuser} className="nav-link">Criar relato no mapa</Link>
                </li> 
                <li className="navbar-item">
                  <Link to={url} className="nav-link">Listar meus relatos</Link>
                </li> 
                   
                {/*
                <nav>
                <a href={"http://localhost:3000/useraccesslist/"+this.props.match.params.id}>Listar Acessos do Usuário</a>
                </nav>  
                */} 
              </ul>
            </div>
          </nav>    
          </div>     
        ) 
            
        }  
    }