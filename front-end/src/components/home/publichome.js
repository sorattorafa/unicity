import React, { Component } from 'react';
import { Divider, Typography, Layout, Row, Col, Icon, List, notification } from 'antd';
import axios from 'axios';
import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Title } = Typography;
const { Content, Footer } = Layout;
 
class PublicHome extends Component {
  constructor () {
    super();

    this.state = {
      reports: []
    };
  }

  componentDidMount() { 
    // axios.get('/reports')
    //   .then(response => {
    //     this.setState({reports: response.data});
    //   })
    //   .catch(function (error) {
    //     notification['error']({
    //       message: 'Erro!',
    //       description: 'Não foi possível carregar os relatos. Tente novamente mais tarde. Se persistir, consulte um técnico.'
    //     });
    //       console.log(error);
    //   })
  }

  render() {
    return (
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
        <NavBar home = {true} />
        
        <Layout>
          <Content className = "contentLayoutForm" style = {{ padding: "30px 0px 0px 0px" }} >
            
            <Row className = "mainFrameHome">
              <Row className = "nameFrameHome">
                <img
                  className = "logoHome"
                  width={100}
                  alt="Logo do sistema"
                  src="logo.png"
                />
                Unicity
              </Row>
            </Row>

            
          </Content>
        </Layout>

        <Footer style = {{ textAlign: 'center', color: "white" }}>
          <p> Para a sua cidade </p>
        </Footer>
      </Layout>
    );
  }
}

export default PublicHome;
