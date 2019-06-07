import { Layout, Form, Row, Col, Icon, Input, Button, Tooltip } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

// Return the errors in hte fields
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  class CreateSimpleUser extends React.Component {
    constructor(props) {
      super(props); 
  
      this.onChangeCpf = this.onChangeCpf.bind(this);
      this.onChangeName = this.onChangeName.bind(this);  
      this.onChangeEmail = this.onChangeEmail.bind(this); 
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeConfirmpassword = this.onChangeConfirmpassword.bind(this);
  
      this.state = { 
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
  
          axios.post('/simpleusers/add', values)
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
  
      return (
        <Layout style = {{ minHeight: '100vh' }}>
          <NavBar />
        
          <Layout style = {{ background: '#fff', padding: "40px 20px 0 20px" }}>
            <LateralMenu pagina = "confirmacaoPromocao" />
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {/* Simple User's Cpf */}
                <Row>
                  <Form.Item
                    validateStatus={cpfError ? 'error' : ''} help={cpfError || ''}
                    label={
                      <span>
                        CPF&nbsp;
                        <Tooltip title="Qual seu CPF?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('cpf', {
                      rules: [{ required: true, message: 'Insira o CPF!', whitespace: true }],
                    })(<Input
                        placeholder="000.000.00X-00"
                    />)}
                  </Form.Item>
                </Row>
      
                {/* Simple User's Name */}
                <Row>
                  <Form.Item
                    validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                    label={
                      <span>
                        Nome&nbsp;
                        <Tooltip title="Qual seu nome?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Insira seu nome!', whitespace: true }],
                    })(<Input
                        placeholder="João da Silva"
                    />)}
                  </Form.Item>
                </Row>
      
                {/* Simple User's Email */}
                <Row>
                    <Form.Item
                      validateStatus={emailError ? 'error' : ''} help={emailError || ''}
                      label={
                        <span>
                          E-mail&nbsp;
                          <Tooltip title="Qual seu email?">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      }
                    >
                      {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'Esse não é um e-mail válido!' },
                        { required: true, message: 'Insira seu email!', whitespace: true }],
                    })(<Input
                        placeholder="exemplo@exemplo.com"
                    />)}
                    </Form.Item>
                </Row>
      
                {/* Simple User's password */}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}
                      label={
                        <span>
                          Senha&nbsp;
                          <Tooltip title="Insira uma senha para sua nova conta">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      }
                    >
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Insira uma senha para sua nova conta!' }],
                      })(<Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="Senha"
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
                          <Tooltip title="Confirme a senha para sua nova conta">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      }
                    >
                      {getFieldDecorator('confirmpassword', {
                        rules: [{ required: true, message: 'Confirme a senha para sua nova conta!' }],
                      })(<Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="Confirmar senha"
                      />)}
                    </Form.Item>
                  </Col>
                </Row>
                
                {/* Submit Button */}
                <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Cadastrar
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Layout>
        </Layout>
      );
    }
  }
  
  const WrappedSimpleUserForm = Form.create({ name: 'horizontal_adminuserform' })(CreateSimpleUser);
   export default WrappedSimpleUserForm;