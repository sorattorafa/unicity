import React, { Component } from 'react';
import { Divider, Typography, Layout, Icon, List, Tag, notification } from 'antd';
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

 
class ListCompanyUsers extends Component {
  constructor () {
    super();

    this.state = {
      companyusers: []
    };
  }

  componentDidMount() { 
    axios.get('/companyusers')
      .then(response => {
        console.log(response.data);
        this.setState({companyusers: response.data});
      })
      .catch(function (error) {
        notification['error']({
          message: 'Erro!',
          description: 'Não foi possível carregar a lista de empresas. Tente novamente mais tarde. Se persistir, consulte um técnico.'
        });
          console.log(error);
      })
  }

  render() {
    return (
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
        <NavBar />
        
        <Layout>
          <LateralMenu pagina = "listcompanyusers" />
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Title className = "titleForm" level={1}> Empresas </Title>
            <Divider className = "dividerForm" />
            
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                  onChange: page => {
                  console.log(page);
                  },
                  pageSize: 10,
              }}
              dataSource={this.state.companyusers}
              renderItem={item => (
                <Link to = { "/viewcompanyuser/" + item._id} >
                  <List.Item
                    key={item.name}
                    extra={
                        <img
                        width={100}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                  >
                    <List.Item.Meta
                        title={item.name}
                        description={item.apresentation}
                    />
                    Endereço: {item.street}, {item.number} - {item.city}
                    <br/>
                    <Tag color={item.categories.color}> {item.categories.name} </Tag>
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

export default ListCompanyUsers;
