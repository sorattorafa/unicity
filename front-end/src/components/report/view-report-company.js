import React, {Component} from 'react';
import axios from 'axios';
import { Descriptions, Divider, Typography, Layout, Badge, Icon, Tag, Row } from 'antd';
import "antd/dist/antd.css";

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;

export default class ViewReportCompany extends Component {

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
            number_of_denunciations: 0,
            number_of_supports: 0,
            status: '',
            category: '', 
            catname: '',
            color:''
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
                number_of_denunciations: response.data.number_of_denunciations + 1, 
                number_of_supports: response.data.number_of_supports + 1,
                status: response.data.status,
                category: response.data.category
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

        
    } 
    
  like = () => { 
      this.setState({ number_of_supports: this.state.number_of_supports + 1 });  
      axios.put('/reports/updatelike/'+ this.props.match.params.id + '/' + this.state.number_of_supports) 
      .then(res => {
          console.log(this.state.number_of_supports)
          // Atualiza página
          //window.location.replace("http://localhost:3000/viewreport/"+id_report);
       // }   
      });
  } 
  
  deslike = () => {
    this.setState({ number_of_denunciations: this.state.number_of_denunciations + 1 }); 
    console.log(this.state.number_of_denunciations) 
    axios.put('/reports/updatedeslike/' + this.props.match.params.id + '/' + this.state.number_of_denunciations)
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
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Categoria" span={1}>
                                        <Tag color={this.state.color}> {this.state.catname} </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status" span ={2}>
                                        <StatusCheck ReportStatus={this.state.status} />,
                                        <br />
                                        Data de Criação: {FormatDate}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Endereço" span={1}>
                                        Rua: {this.state.street}
                                        <br />
                                        Número: {this.state.number}
                                        <br />
                                        Cep: {this.state.cep}
                                    </Descriptions.Item> 
                                    {/**
                                    <Descriptions.Item label="Posição" span={2}>
                                        Latitude: {this.state.lat}
                                        <br />
                                        Longitude: {this.state.lng}
                                    </Descriptions.Item> 
                                     */}
                                    <Descriptions.Item label="Apoiadores" span={3}>
                                        {this.state.number_of_supports} <Icon type="like" onClick = { this.like}/>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Denúncias" span={3}>
                                        {this.state.number_of_denunciations} <Icon type="dislike" onClick = { this.deslike} />
                                    </Descriptions.Item>   
                                     
                                    <Descriptions.Item label="Resolver Relato" span={3}>
                                    <nav>
                                     <a href={"http://localhost:3000/editreport/"+this.props.match.params.id}>Editar Estado Relato</a>
                                    </nav>  
                                    </Descriptions.Item>  
                                    </Descriptions>
                            </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
