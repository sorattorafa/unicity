import { Divider, Typography, Layout, Avatar, Row, Col, Icon, Button, Tag } from 'antd';
import React from 'react';
import { Redirect, Link } from "react-router-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getToken, getStatus } from '../services/auth';

const { Title } = Typography;
const { Content } = Layout;


export default class ProfileSimpleUser extends React.Component {

  constructor(props) {
      super(props); 
  
      this.state = {
        nav: '',                      // Controla página exibida
        id: '',
        cpf: '',
        name: '',
        email: '',
        active: true,
        visibility: true,
        status: getStatus()            // 0: simpleuser; 1: companyuser; 2: admin
        // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin
      }
  }

  componentWillMount(){
    // console.log(this.props.match.params);
    axios.get('/simpleusers/' + this.props.match.params.id)
    .then(response => {
        console.log(response.data);
        
        this.setState({
          id: this.props.match.params.id,
          cpf: response.data.cpf,
          name: response.data.name,
          email: response.data.email
        });
    });
  }


    render() {

        // Controla página exibida - Ao atualizar, muda de página
        if(this.state.nav)
          return <Redirect to = { this.state.nav } />
        // Só exibe se estiver logado
        else if(getToken())
        // else if(getToken() && getStatus() === '2')
          return (
            <Layout style = {{ minHeight: '100vh' }}>
                <NavBar />
        
                <Layout>
                    <LateralMenu pagina = "" />
          
                    <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
                        <Title className = "titleForm" level={1}> Seu Perfil </Title>

                        <Link to = { "/edit/" + this.state.id} >
                            <Button className = "buttonNav" type = "primary">
                                <Icon type = "edit"/> Editar Perfil
                            </Button>
                        </Link>
                        <Divider className = "dividerForm" />

                        <Row>
                            <Col xs={12} sm={16} md={12} lg={8} xl={10}>
                                <Title level={3}> {this.state.name} </Title>
                                <br/>

                                <b> CPF </b>
                                <br/>
                                {this.state.cpf}
                                <br/><br/>
                                
                                <b> EMAIL </b>
                                <br/>
                                {this.state.email}  
                            </Col>
                        </Row>
                    
                    </Content>
                </Layout>
            </Layout>
        );
    }
}