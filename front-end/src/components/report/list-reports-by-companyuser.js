import React, { Component } from 'react';
import { Divider, Typography, Layout, Row, Col, Icon, List, Tag, notification } from 'antd';
import axios from 'axios';
import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

 
class ListReportsByCompanyuser extends Component {
  constructor () {
    super();

    this.state = {
      reports: [], 
      companyusers: [],
    };
  }

  componentDidMount() { 
      //console.log(this.props.match.params.id)  
      axios.get('/companyusers/'+this.props.match.params.id)
      .then(response => {
        this.setState({companyusers: response.data});  
        console.log('categoria '+this.state.companyusers.categories); 
         axios.get('/reports/bycategory/'+this.state.companyusers.categories)
      .then(response => {
         this.setState({reports: response.data}); 
         console.log(this.state.reports)  
     })
       
      })
      .catch(function (error) {
        notification['error']({
          message: 'Erro!',
          description: 'Não foi possível carregar os relatos. Tente novamente mais tarde. Se persistir, consulte um técnico.'
        });
          console.log(error);
      })  
       
      
  }

  render() {
    return ( 
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
        <NavBar />
        
        <Layout>
          <LateralMenu pagina = "listreport" />
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Title className = "titleForm" level={1}> Relatos </Title>
            <Divider className = "dividerForm" />
            
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                  onChange: page => {
                  console.log(page);
                  },
                  pageSize: 3,
              }}
              dataSource={this.state.reports}
              renderItem={item => (
                <Link to = { "/viewreport/" + item._id} >
                  <List.Item
                    key={item.title}
                    extra={
                        <img
                        width={100}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                  >
                    <List.Item.Meta
                        title={item.title}
                        description={item.description}
                    />
                    {item.street}, {item.number}
                    <br/>
                    <Tag color={item.category.color}> {item.category.name} </Tag>
                  </List.Item>
                </Link>
              )}
            /> 
          </Content>
        </Layout>
      </Layout> 
    );
  }
}

export default ListReportsByCompanyuser;
