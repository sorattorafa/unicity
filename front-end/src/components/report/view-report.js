import React, {Component} from 'react';
import axios from 'axios';
import { Descriptions, Divider, Typography, Layout, Badge, Icon, Row } from 'antd';
import "antd/dist/antd.css";

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
            categoryname: ''
          }
    }

    componentDidMount() {
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
                category: response.data.category
            }) 
            if (this.state.category === '5d0431577425506f0589c71b'){ 
                this.setState({ 
                    categoryname: 'Segurança Pública'        
                }) 
            } 

            if (this.state.category === '5d053c469dbdf87818fbfc43'){ 
                this.setState({ 
                    categoryname: 'Vias Públicas'        
                }) 
            } 

            if (this.state.category === '5d053c8f9dbdf87818fbfc44'){ 
                this.setState({ 
                    categoryname: 'Mobilidade'        
                }) 
            } 

            if (this.state.category === '5d053cc99dbdf87818fbfc45'){ 
                this.setState({ 
                    categoryname: 'Iluminação Pública'        
                }) 
            }  

            
            if (this.state.category === '5d058f37631ca618148481f2'){ 
                this.setState({ 
                    categoryname: 'Acessibilidade'        
                }) 
            } 

            if (this.state.category === '5d0bfc8591baa12cf537b9ec'){ 
                this.setState({ 
                    categoryname: 'Natureza'        
                }) 
            }
        })
        .catch(function(error) {
            console.log(error)
        }) 
       
    }

    render() {

        const ReportStatus = this.state.status;
        const FormatDate = this.state.createDate.split("T")[0];

        function StatusCheck(){
            if (ReportStatus === 0) {
                return <Badge status="processing" text="Aberto" />;
            } else if (ReportStatus === 1) {
                return <Badge status="warning" text="Em Resolução" />;
            } else {
                return <Badge status="success" text="Resolvido" />;
            }
        }

        return(
            <Layout style = {{ minHeight: '100vh', width: '100%' }}>
                <NavBar />

                <Layout>
                    <LateralMenu pagina = "createadminuser" />
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
                                        <br />
                                        Categoria : {this.state.categoryname}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Endereço">
                                        Rua: {this.state.street}
                                        <br />
                                        Número: {this.state.number}
                                        <br />
                                        Cep: {this.state.cep}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Posição">
                                        Latitude: {this.state.lat}
                                        <br />
                                        Longitude: {this.state.lng}
                                    </Descriptions.Item> 
                                    <Descriptions.Item label="Status">
                                        <StatusCheck ReportStatus={this.state.status} />,
                                        <br />
                                        Data de Criação: {FormatDate}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Apoiadores" span={3}>
                                        {this.state.number_of_supports} <Icon type="like" />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Denúncias" span={3}>
                                        {this.state.number_of_denunciations} <Icon type="dislike" />
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
