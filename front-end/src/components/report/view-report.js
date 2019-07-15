import React, {Component} from 'react';
import axios from 'axios';
import { Descriptions, Divider, Typography, Layout, Badge, Icon, Tag, Comment, Button, Row, List } from 'antd';
import "antd/dist/antd.css"; 
import { Link } from "react-router-dom";

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;

export default class ViewReport extends Component {

    constructor() {
        super();

        this.state = {  
            lat:'',  
            lng:'',
            title: '',
            cep: '',
            street: '',  
            number: '', 
            description: '',
            createDate: '',
            number_of_denunciations: '',
            number_of_supports: '',
            status: '',
            category: '', 
            catname: '',
            color:'', 
            jadeulike: false, 
            jadeudeslike:false, 
            comment_id:'', 
            commets:[],
          }
    }

    componentWillMount() { 
        axios.get('/reports/'+this.props.match.params.id)
        .then(response => {
            this.setState({  
                lat: response.data.lat, 
                lng: response.data.lng,
                title: response.data.title, 
                cep: response.data.cep, 
                street: response.data.street, 
                number: response.data.number, 
                description: response.data.description, 
                createDate: response.data.createDate,  
                number_of_denunciations: response.data.number_of_denunciations, 
                number_of_supports: response.data.number_of_supports,
                status: response.data.status,
                category: response.data.category, 
                comment_id: response.data.id
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
        })
        axios.get('/comments/')
        .then(response => {
            this.setState({  
                commets: response.data
            })  
        })
        
    } 
    

    render() {

        const ReportStatus = this.state.status;
        function StatusCheck(){
            if (ReportStatus === 0) {
                return <Badge status="processing" text="Aberto" />;
            } else if (ReportStatus === 1) {
                return <Badge status="warning" text="Em Resolução" />;
            } else {
                return <Badge status="success" text="Resolvido" />;
            }
        } 
        function CommentStatusCheck(CommentStatus){
            if (CommentStatus === 0) {
                return 'Aberto';
            } else if (CommentStatus === 1) {
                return 'Em Resolução';
            } else {
                return 'Resolvido';
            }
        }

        return(
            <Layout style = {{ minHeight: '100vh', width: '100%' }}>
                <NavBar />

                <Layout>
                    <LateralMenu pagina = "listreport" />
                    <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
                        <Title className = "titleForm" level={1}> {this.state.title} </Title>
                        <Divider className = "dividerForm" />
                            <div>
                                <Descriptions
                                    border
                                    column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
                                >
                                    <Descriptions.Item label="Descrição" span={3}>
                                        {this.state.description}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Endereço" span={1}>
                                        Rua: {this.state.street}
                                        <br />
                                        Número: {this.state.number}
                                        <br />
                                        Cep: {this.state.cep}
                                    </Descriptions.Item> 
                                    <Descriptions.Item label="Categoria" span={1}>
                                        <Tag color={this.state.color}> {this.state.catname} </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status" span ={1}>
                                        <StatusCheck ReportStatus={this.state.status} />
                                        <Link className="buttonForm buttonStatus" to = { "/editreport/" + this.props.match.params.id} >
                                            <Button className = "buttonNav" type = "primary">
                                                <Icon />Alterar
                                            </Button>
                                        </Link>
                                        <br />
                                        Data de Criação: {this.state.createDate}
                                    </Descriptions.Item>
                                    {/**
                                    <Descriptions.Item label="Posição" span={2}>
                                        Latitude: {this.state.lat}
                                        <br />
                                        Longitude: {this.state.lng}
                                    </Descriptions.Item> 
                                     */}
                                    <Descriptions.Item label="Apoiadores" span={3}>
                                        {this.state.number_of_supports} <Icon type="like"/>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Denúncias" span={3}>
                                        {this.state.number_of_denunciations} <Icon type="dislike" />
                                    </Descriptions.Item>   
                                    
                                    {/* <Descriptions.Item label="Resolver Relato" span={3}>
                                    <nav>
                                     <a href={"http://localhost:3000/editreport/"+this.props.match.params.id}>Editar Estado Relato</a>
                                    </nav>  
                                    </Descriptions.Item>   */}
                                    </Descriptions> 
                                    <Row>
                                        <Divider className = "dividerForm" />
                                        <Title level={3}> Histórico de Alterações </Title>
                                        <List
                                            itemLayout="vertical"
                                            size="large"
                                            pagination={{
                                                onChange: page => {
                                                console.log(page);
                                                },
                                                pageSize: 10,
                                            }}
                                            dataSource={this.state.comments}
                                            renderItem={item => (
                                                <List.Item
                                                    key={item.author.name}
                                                >  
                                                    <List.Item.Meta
                                                        title={item.comment_createDate}
                                                        description={item.content}
                                                    />
                                                    {item.author.name} alterou status para <CommentStatusCheck CommentStatus={item.comment_status} />
                                                    <br/>
                                                </List.Item>
                                            )}
                                        />
                                    </Row> 
                            </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
