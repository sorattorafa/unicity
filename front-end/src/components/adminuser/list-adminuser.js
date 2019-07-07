import { Divider, Typography, Layout, Table, Popconfirm, Icon, notification } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "./create-adminuser.css";
import axios from 'axios';
import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content } = Layout;

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => ("" + a.name).localeCompare(b.name),
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
  },
  {
    title: 'Ações',
    dataIndex: '',
    key: 'x',
    render: (text, record) => <Popconfirm title = "Tem certeza que deseja excluir?" 
    onConfirm = { () => {try {
                          let res = axios.delete('/adminusers/', record._id);
                      
                          if(res.status === 200) {
                            notification['success']({
                              message: 'Sucesso!',
                              description: 'A exclusão do artigo ocorreu com sucesso. Dados Atualizados!'
                            });
                      
                            this.componentWillMount();
                          }
                        } catch(ex) {
                          notification['error']({
                            message: 'Erro!',
                            description: 'Administrador não excluído. '
                          });
                        }
    }} okText = "Deletar" cancelText = "Cancelar">
                                <Icon type = "delete" theme = "twoTone" twoToneColor = "#f5222d" />
                              </Popconfirm>,
  },
];


// function onChange(pagination, filters, sorter) {
//   console.log('params', pagination, filters, sorter);
// }

export default class ListAdminUser extends React.Component {
  constructor(props) {
    super(props); 

    this.state = { 
      list_admin: []
    }
  }

  // deleteADM = async id => {
  //   try {
  //     let res = axios.delete('/adminusers/', id);
  
  //     if(res.status === 200) {
  //       notification['success']({
  //         message: 'Sucesso!',
  //         description: 'A exclusão do artigo ocorreu com sucesso. Dados Atualizados!'
  //       });
  
  //       this.componentWillMount();
  //     }
  //   } catch(ex) {
  //     notification['error']({
  //       message: 'Erro!',
  //       description: 'Administrador não excluído. '
  //     });
  //   }
  // }

  componentWillMount() { 
    axios.get('/adminusers')
      .then(response => {
        console.log(response.data);
        this.setState({list_admin: response.data});
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
          <LateralMenu pagina = "listAdminUser" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >

              <Title className = "titleForm" level={1}> Lista de administradores </Title>
              <Divider className = "dividerForm" />

              <Table rowKey="_id" columns={columns} dataSource={this.state.list_admin} />
              

          </Content>
        </Layout>
      </Layout>
    );
  }
}
