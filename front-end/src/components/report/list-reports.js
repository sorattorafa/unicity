import React, { Component } from 'react';
import { Divider, Typography, Layout, Row, Col, Icon, List, Avatar } from 'antd';
import axios from 'axios';
import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Titulo relato`,
    description:
      'Description.',
    content:
      'content.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

 
class ListReports extends Component {
  componentDidMount() { 
    axios.get('/simpleusers')
        .then(response => {
            this.setState({simpleusers: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  render() {
    return (
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
        <NavBar />
        
        <Layout>
          <LateralMenu pagina = "createadminuser" />
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
              dataSource={listData}
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
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                  />
                  {item.content}
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
