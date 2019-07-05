import { Divider, Typography, Layout, Row, Col, Icon, Button, Table, notification } from 'antd';
import React from 'react';
import { Redirect, Link } from "react-router-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getToken, getStatus, getUserId } from '../services/auth';

const { Title } = Typography;
const { Content } = Layout;

const columns = [ 
  {
    title: 'Nome',
    dataIndex: 'title',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => ("" + a.name).localeCompare(b.name),
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
  }, 
  /**
  {
    title: 'View',
    dataIndex: '',
    key: 'x',
    render: (text, record) => 
  },  
   */
  {
    title: 'Visualizar Relato',
    key: 'action',
    render:  (text, record) =>  
     (  
      <span>  
        <Icon type = "eye" theme = "twoTone" twoToneColor = "#f5222d" />   
        <a href={"http://localhost:3000/viewreport/"+record._id}> Visualizar Relato</a>
      </span> 
    ), 
  }, 
];


export default class ProfileSimpleUser extends React.Component {

  constructor(props) {
      super(props); 
  
      this.state = {
        nav: '',                      // Controla página exibida
        id: '',
        cpf: '',
        name: '',
        email: '',
        reports: [],
        active: true,
        visibility: true,
        status: getStatus()            // 0: simpleuser; 1: companyuser; 2: admin
        // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin
      }
  }

  componentWillMount(){
    // console.log(this.props.match.params);
    axios.get('/simpleusers/' + getUserId())
    .then(response => {
        console.log(response.data);
        
        this.setState({
          id: getUserId(),
          cpf: response.data.cpf,
          name: response.data.name,
          email: response.data.email
        });

        axios.get('/reports/byuser/' + getUserId())
        .then(response => {
          this.setState({reports: response.data}); 
          console.log(this.state.reports)
        })
        .catch(function (error) {
          notification['error']({
            message: 'Erro!',
            description: 'Não foi possível carregar os relatos. Tente novamente mais tarde. Se persistir, consulte um técnico.'
          });
            console.log(error);
        })
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

                        <Divider />
                        <Title level={4}> Seus Relatos </Title>
                        <Row>
                          <Table rowKey="_id" columns={columns} dataSource={this.state.reports} />
                        </Row>

                    
                    </Content>
                </Layout>
            </Layout>
        );
    }
}