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


export default class ProfileCompanyUser extends React.Component {

    constructor(props) {
        super(props); 
    
        this.state = {
          nav: '',                      // Controla página exibida
          id: '',
          cnpj: '',
          name: '',
          apresentation: '',
          city: '',
          street: '',
          number: '',
          email: '',  
          password: '',
          categories: '',
          active: true,
          visibility: true,
          status: getStatus()                 // 0: simpleuser; 1: companyuser; 2: admin
          // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin
        }

        if (this.state.status === '2') {
          this.state.visibility = false;
        }

    }

    componentWillMount(){
      // console.log(this.props.match.params);
      axios.get('/companyusers/' + this.props.match.params.id)
      .then(response => {
          console.log(response.data);
          
          this.setState({
            id: this.props.match.params.id,
            cnpj: response.data.cnpj,
            name: response.data.name, 
            apresentation: response.data.apresentation,
            city: response.data.city, 
            street: response.data.street,
            categories: response.data.categories,
            number: response.data.number,
            email: response.data.email,
            color:'', 
            catname:'',
            category: ''
          });

          axios.get('/categories/')
            .then(response => {
                this.setState({  
                    category: response.data
                })  
                this.state.category.map(categories => 
                    {             
                        if(categories._id === this.state.categories){ 
                        this.setState({ 
                            color: categories.color, 
                            catname: categories.name
                        }) 
                        } 
                    }
                      
                )
                console.log(this.state.color)
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

                        <Link to = { "/editcompanyuser/" + this.state.id} >
                            <Button className = "buttonNav" type = "primary">
                                <Icon type = "edit"/> Editar Perfil
                            </Button>
                        </Link>
                        <Divider className = "dividerForm" />

                        <Row>
                            <Col xs={12} sm={16} md={12} lg={8} xl={10}>
                                <Title level={3}> {this.state.name} </Title>
                                <Tag color={this.state.color}> {this.state.catname} </Tag>
                                <br/><br/>
                                {this.state.apresentation}
                                <br/><br/>

                                <b> CNPJ </b>
                                <br/>
                                {this.state.cnpj}
                                <br/><br/>
                                
                                <b> EMAIL </b>
                                <br/>
                                {this.state.email}
                                <br/><br/>
                                
                                <b> ENDEREÇO </b>
                                <br/>
                                {this.state.street}, {this.state.number}
                                <br/>
                                {this.state.city}
                                <br/>
                                
                                
                            </Col>

                            <Col style = {{position: "absolute", right: "100px"}} xs={11} sm={4} md={6} lg={8} xl={3}>
                                <Avatar size={200} icon="user" />
                            </Col>
                        </Row>
                    
                    </Content>
                </Layout>
            </Layout>
        );
    }
}