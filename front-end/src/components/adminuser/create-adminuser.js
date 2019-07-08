import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
import "./create-adminuser.css";
import axios from 'axios';
import NavBar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getToken, getStatus } from '../services/auth';
import { Redirect, Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

// Return the errors in hte fields
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateAdminUser extends React.Component {
  constructor(props) {
    super(props); 

    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeName = this.onChangeName.bind(this);  
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmpassword = this.onChangeConfirmpassword.bind(this);

    this.state = {
      nav: '',
      cpf: '',
      name: '',
      email: '',  
      password: '',
      confirmpassword: '',
      active: true
    }
  }

  onChangeCpf(e) {
    this.setState({
        cpf: e.target.value
    });
  } 

  onChangeName(e) {
    this.setState({
        name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
        email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }

  onChangeConfirmpassword(e) {
    this.setState({
        confirmpassword: e.target.value
    });
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        axios.post('/adminusers/add', values)
            .then(res => console.log(res.data));

        this.setState({ 
          cpf: '',
          name: '',
          email: '',  
          password: '',
          active: true
        })
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };

    // Only show error after a field is touched.
    const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
    const nameError = isFieldTouched('name') && getFieldError('name');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmpasswordError = isFieldTouched('confirmpassword') && getFieldError('confirmpassword');

    // Controla página exibida - Ao atualizar, muda de página
    if(this.state.nav)
      return <Redirect to = { this.state.nav } />
    // Só exibe se estiver logado
    else if(!getToken() || !(getStatus() === '2'))
      return <Redirect to = { "/" } />
    else if(getToken() && (getStatus() === '2'))
    return (
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
        <NavBar />
        
        <Layout>
          <LateralMenu pagina = "listAdminUser" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Title className = "titleForm" level={1}> Cadastrar administradores </Title>
              <Divider className = "dividerForm" />
              {/* Admin User's Cpf */}
              <Row>
                <Form.Item
                  validateStatus={cpfError ? 'error' : ''} help={cpfError || ''}
                  label={
                    <span>
                      CPF&nbsp;
                      <Tooltip title="Qual é o CPF do novo administrador?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('cpf', {
                    rules: [{ required: true, message: 'Insira o CPF do novo administrador!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>
              </Row>

              {/* Admin User's Name */}
              <Row>
                <Form.Item
                  validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                  label={
                    <span>
                      Nome&nbsp;
                      <Tooltip title="Qual o nome do novo administrador?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Insira o nome do novo administrador!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>
              </Row>

              {/* Admin User's Email */}
              <Row>
                  <Form.Item
                    validateStatus={emailError ? 'error' : ''} help={emailError || ''}
                    label={
                      <span>
                        E-mail&nbsp;
                        <Tooltip title="Qual o email do novo administrador?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('email', {
                      rules: [{ type: 'email', message: 'Esse não é um e-mail válido!' },
                      { required: true, message: 'Insira o email do novo administrador!', whitespace: true }],
                    })(<Input />)}
                  </Form.Item>
              </Row>

              {/* Admin User's password */}
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}
                    label={
                      <span>
                        Senha&nbsp;
                        <Tooltip title="Insira uma senha para o novo administrador">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Insira uma senha para o novo administrador!' }],
                    })(<Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />)}
                  </Form.Item>
                </Col>

              {/* Admin User's confirm password */}
                <Col span={12}>
                  <Form.Item
                    validateStatus={confirmpasswordError ? 'error' : ''} help={confirmpasswordError || ''}
                    label={
                      <span>
                        Confirme a senha&nbsp;
                        <Tooltip title="Confirme a senha para o novo administrador">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('confirmpassword', {
                      rules: [{ required: true, message: 'Confirme a senha para o novo administrador!' }],
                    })(<Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Confirm Password"
                    />)}
                  </Form.Item>
                </Col>
              </Row>
              
              {/* Submit Button */}
              <Row className="buttonForm">
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Form.Item>
                    <Button className="buttonForm" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                      Cadastrar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const WrappedAdminUserForm = Form.create({ name: 'horizontal_adminuserform' })(CreateAdminUser);
 export default WrappedAdminUserForm;
