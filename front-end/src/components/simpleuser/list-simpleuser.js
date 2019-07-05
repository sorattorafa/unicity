import React, { Component } from 'react';
import axios from 'axios'; 
import { Divider, Typography, Layout, Table } from 'antd';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;

const columns = [ 
  {
    title: 'Cpf',
    dataIndex: 'cpf',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => ("" + a.name).localeCompare(b.name),
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

export default class SimpleUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {simpleusers: []};
    }
    componentWillMount() { 
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
          <Layout style = {{ minHeight: '100vh' }}>
            <NavBar />
        
            <Layout>
          <LateralMenu pagina = "listusers" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
              <Title className = "titleForm" level={1}> Lista de usuários </Title>
              <Divider className = "dividerForm" />
              <Table rowKey="_id" columns={columns} dataSource={this.state.simpleusers} />
              </Content>
            </Layout>
          </Layout>
        );   
    } 
}

// export default SimpleUsersList;