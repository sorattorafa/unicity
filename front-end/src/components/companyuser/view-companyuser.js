import React, {Component} from 'react';
import axios from 'axios';
import { Descriptions, Divider, Typography, Layout, Avatar, Row, Col, Tag, Tabs } from 'antd';
import "antd/dist/antd.css";

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

export default class ViewCompanyUser extends Component {

    constructor() {
        super();

        this.state = {  
            name:'',
            apresentaion: '',
            city: '',
            street: '',
            number: '',
            category:[],
            color:'', 
            catname:'', 
            categories: []
          }
    }

    componentDidMount() {
        axios.get('/companyusers/'+this.props.match.params.id)
        .then(response => {
            this.setState({  
                name: response.data.name, 
                apresentation: response.data.apresentation,
                city: response.data.city, 
                street: response.data.street, 
                number: response.data.number,
                category: response.data.category 
            })  
        })

        axios.get('/categories/')
        .then(response => {
            this.setState({  
                categories: response.data
            })  
            this.state.categories.map(category => 
                {             
                    if(category._id === this.state.category){ 
                    this.setState({ 
                        color: category.color, 
                        catname: category.name
                    }) 
                    } 
                }
                  
            )
            console.log(this.state.color)
        })
    }

    render() {

        return(
            <Layout style = {{ minHeight: '100vh', width: '100%' }}>
                <NavBar />

                <Layout>
                    <LateralMenu pagina = "createadminuser" />
                    <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
                        <Title className = "titleForm" level={1}> {this.state.name} </Title>
                        <Divider className = "dividerForm" />
                            <Row>
                                <Col xs={11} sm={4} md={6} lg={8} xl={3}>
                                    <Avatar size={120} icon="user" />
                                </Col>
                                <Col xs={12} sm={16} md={12} lg={8} xl={10}>
                                    {this.state.name}
                                    <br/>
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