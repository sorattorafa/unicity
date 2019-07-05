import React, { Component } from 'react';
import { Divider, Typography, Layout, Row, Col, Icon, List, Tag, notification } from 'antd';
import axios from 'axios';
import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

 
class ListReports extends Component {
  constructor () {
    super();

    this.state = {
      reports: []
    };
  }

  componentDidMount() { 
    axios.get('/reports')
      .then(response => {
        this.setState({reports: response.data});
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
                      title={<a href={"/viewreportcompany/"+item._id}>{item.title}</a>}
                      description={item.description}
                  />
                  {item.street}, {item.number}
                  <br/>
                  <Tag color={item.category.color}> {item.category.name} </Tag>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default ListReports;
