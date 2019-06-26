import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Icon, Divider, Typography, Layout, Avatar, Row, Col, Tag, Tabs } from 'antd';
import "antd/dist/antd.css";

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getStatus } from '../services/auth';

const { Title } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

export default class ViewCompanyUser extends Component {

    constructor() {
        super();

        this.state = {
            id: '',
            name: '',
            apresentaion: '',
            city: '',
            street: '',
            number: '',
            categories:'',
            color:'', 
            catname:'',
            category: '',
            visibility: false,
            status: getStatus()                 // 0: simpleuser; 1: companyuser; 2: admin
          // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin
          }

          if (this.state.status == '2') {
            this.state.visibility = true;
          }
    }

    componentDidMount() {
        axios.get('/companyusers/'+this.props.match.params.id)
        .then(response => {
            console.log(response.data);
            this.setState({
                id: response.data._id,
                name: response.data.name, 
                apresentation: response.data.apresentation,
                city: response.data.city, 
                street: response.data.street, 
                number: response.data.number,
                categories: response.data.categories
            })    
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
            })
        })

      
    }

    render() {

        return(
            <Layout style = {{ minHeight: '100vh', width: '100%' }}>
                <NavBar />

                <Layout>
                    <LateralMenu pagina = "listcompanyusers" />
                    <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
                        <Title className = "titleForm" level={1}> {this.state.name} </Title>

                        { this.state.status === '2' ?
                            <Link to = { "/editcompanyuser/" + this.state.id} >
                                <Button className = "buttonNav" type = "primary">
                                    <Icon type = "edit"/> Editar
                                </Button>
                            </Link>
                        : null }

                        <Divider className = "dividerForm" />
                            <Row>
                                <Col xs={11} sm={4} md={6} lg={8} xl={3}>
                                    <Avatar size={120} icon="user" />
                                </Col>
                                <Col xs={12} sm={16} md={12} lg={8} xl={10}>
                                    {this.state.street}, {this.state.number}
                                    <br/>
                                    {this.state.city}
                                    <br/>
                                    <Tag color={this.state.color}> {this.state.catname} </Tag>
                                </Col>
                            </Row>
                            <Row>
                                <br/>
                                {this.state.apresentation}
                                <br/>
                            </Row>
                            <Row>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="Problemas Resolvidos" key="1">
                                    Lista de Relatos Resolvidos
                                    </TabPane>
                                </Tabs>
                            </Row>

                    </Content>
                </Layout>
            </Layout>
        )
    }
}