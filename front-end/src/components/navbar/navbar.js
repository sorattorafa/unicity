// navbar.js

import React, {Component} from 'react';
import { Layout, Menu, Icon, Col, Button, Dropdown, Tabs, message } from 'antd';
import { Link, Redirect } from "react-router-dom";

import './navbar.css';
// import { getToken, getStatus, logout } from '../../services/auth';


const { Header } = Layout;
 
export default class NavBar extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      nav: '',
      // token: getToken(),
      // status: getStatus(),
      token: 'token',
      status: '0',
      modal: false,
      home: this.props.home
    };
    
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  // signout = () => {
  //   let hide = message.loading('Fazendo logout..', 0);

  //   setTimeout(() => {
  //     setTimeout(hide, 2000);

  //     logout();
  //     this.setState({ nav: '/' });
  //   }, 2000);
  // }

  render() {
    if(this.state.nav) {
      return <Redirect to = { this.state.nav } />
    }

    let menu = (
      <Menu>
        { this.state.token && (this.state.status === '0' || this.state.status === '1') ?
          <Menu.Item key = "perfil">
            <Link to = "/perfil">
              <Icon type = "setting" /> Perfil
            </Link>
          </Menu.Item>
        : null }

        {/* <Menu.Item key = "logout" onClick = { this.signout }>
          <Icon type = "logout" /> Logout
        </Menu.Item> */}
      </Menu>
    );

    let menuNone = (
      <Menu>
        <Menu.Item key = "login" onClick = { this.toggle }> 
          <Icon type = "login" /> Login
        </Menu.Item>
        <Menu.Item key = "cadastro"> 
          <Link to = "/cadastro"> <Icon type = "user-add" /> Cadastre-se </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className = "header" style = { this.props.home ? { position: 'fixed' } : {} }>
        <Col span = { this.props.home ? 3 : 6 } offset = { this.props.home ? 0 : 9 }>
          <div className = "logo text-center">
            {/* <Link to = "/">
              <img src = {require("../../images/logo.png")} alt = "Sangue Bom" />
            </Link> */}
          </div>
        </Col>

        <Col span = { this.props.home ? 11 : 0 }>
          { this.props.home ?
            <Tabs defaultKey = "home" onChange = { this.props.onChange } tabPosition = "bottom" className = "menu-site" style = {{ lineHeight: '64px' }}>
              <Tabs.TabPane tab = { <a href = "#home" style = {{ color: 'inherit' }}> Home </a> } key = "home" />
              <Tabs.TabPane tab = { <a href = "#quemSomos" style = {{ color: 'inherit' }}> Quem Somos </a> } key = "quemSomos" />
              <Tabs.TabPane tab = { <a href = "#parcerias" style = {{ color: 'inherit' }}> Parcerias </a> } key = "parcerias" />
              <Tabs.TabPane tab = { <a href = "#contato" style = {{ color: 'inherit' }}> Contato </a> } key = "contato" />
            </Tabs>
          : null }
        </Col>

        <Col span = { this.props.home ? 10 : 8 } className = "menu-usuario">
          { this.state.token && !this.props.home ?
            <Dropdown overlay = { menu } placement = "bottomRight">
              <Button style = {{ marginLeft: 8 }}>
                <Icon type = "user" style = {{ fontSize: '18px', marginTop: '5px' }} />
              </Button>
            </Dropdown>
          : this.state.token && this.state.status && this.props.home ?
            <Link to = { this.state.status === "0" ? "/validacaoPromocao" : this.state.status === "1" ? "/nivelSangue" : "/confirmacaoPromocao"}>
              <Button className = "menu-web" type = "primary" style = {{ marginLeft: 8 }}>
                <Icon type = "logout"/> Voltar Sistema
              </Button>
            </Link>
          :
            <div>
              <Dropdown className = "menu-mobile" overlay = {menuNone} placement = "bottomRight">
                <Button style = {{ marginLeft: 'auto', marginTop: '16px' }}>
                  <Icon type = "menu" style = {{ fontSize: '18px', marginTop: '5px' }} />
                </Button>
              </Dropdown>

              <Button className = "menu-web" style = {{ marginLeft: 8 }} onClick = { this.toggle }>
                <Icon type = "login"/> Login
              </Button>
              
              <Link to = "/cadastro">
                <Button className = "menu-web" type = "primary" style = {{ marginLeft: 8 }}>
                  <Icon type = "user-add"/> Cadastre-se
                </Button>
              </Link>
            </div>
          }
        </Col>
        {/* <Login visible = { this.state.modal } toggle = { this.toggle } /> */}
      </Header>
    );
  }
}