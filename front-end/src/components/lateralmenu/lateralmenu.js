// menu.js

import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";

import './lateralmenu.css';
import { getStatus } from '../services/auth';


const { Sider } = Layout;
 
export default class LateralMenu extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      status: getStatus()                 // 0: simpleuser; 1: companyuser; 2: admin
      // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin
    };
  }

  render() {
    return (
      <Sider
        breakpoint = "lg"
        collapsedWidth = "0"
        style = {{ background: '#fff' }}
        width = "250"
      >
        <Menu theme = "light" mode = "inline" defaultSelectedKeys = {[this.props.pagina]}>
          {/* Visível para todos */}
          <Menu.Item key = "listreport">
            <Link to = "/listreport">
              <Icon type = "tag" />
              <span> Relatos </span>
            </Link>
          </Menu.Item>

          <Menu.Item key = "listcompanyusers">
            <Link to = "/listcompanyusers">
              <Icon type = "tag" />
              <span> Empresas </span>
            </Link>
          </Menu.Item>

          <Menu.Item key = "createreport">
              <Link to = "/map">
                <Icon type = "tag" />
                <span> Criar Relato </span>
              </Link>
            </Menu.Item>

          {/* Visível para simpleuser */}
          {/* { this.state.status === '0' ?
            <Menu.Item key = "createreport">
              <Link to = "/map">
                <Icon type = "tag" />
                <span> Criar Relato </span>
              </Link>
            </Menu.Item>
          : null } */}
          {/* { this.state.status === '0' ?
            <Menu.Item key = "createSimpleuser">
              <Link to = "/createuser">
                <Icon type = "notification" />
                <span> Criar novo usuário </span>
              </Link>
            </Menu.Item>
          : null } */}
          
          {/* Visível para adminuser */}
          { this.state.status === '2' ?
            <Menu.Item key = "createCompanyuser">
              <Link to = "/createcompanyuser">
                <Icon type = "star" />
                <span> Criar empresa </span>
              </Link>
            </Menu.Item>
          : null }
          {/* { this.state.status === '2' ?
            <Menu.Item key = "createadminuser">
              <Link to = "/createadminuser">
                <Icon type = "team" />
                <span> Criar ADM </span>
              </Link>
            </Menu.Item>
          : null } */}
          {/* { this.state.status === '2' ?
            <Menu.Item key = "CreateCategory">
              <Link to = "/createcategory">
                <Icon type = "star" />
                <span> Criar categoria </span>
              </Link>
            </Menu.Item>
          : null } */}
          { this.state.status === '2' ?
            <Menu.Item key = "listusers">
              <Link to = "/listusers">
                <Icon type = "star" />
                <span> Listar usuários </span>
              </Link>
            </Menu.Item>
          : null }
          { this.state.status === '2' ?
            <Menu.Item key = "listAdminUser">
              <Link to = "/listadminusers">
                <Icon type = "tag" />
                <span> Administradores </span>
              </Link>
            </Menu.Item>
          : null }

        </Menu>
      </Sider>
    );
  }
}