import React, { Layout, Component } from 'react';
import axios from 'axios'; 
import { Table } from 'antd';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const columns = [ 
  {
    title: 'Cpf',
    dataIndex: 'cpf',
    key: 'cpf',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  
];

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {simpleusers: []};
    }
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
          <Layout style = {{ minHeight: '100vh' }}>
            <NavBar />
        
            <Layout style = {{ background: '#fff', padding: "40px 20px 0 20px" }}>
              <LateralMenu pagina = "confirmacaoPromocao" />
              <Table columns={columns} dataSource={this.state.simpleusers} />
            </Layout>
          </Layout>
        );   
    } 
}