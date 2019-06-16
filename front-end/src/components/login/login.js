// login.js

import React, {Component} from 'react';
import { Modal, Icon, Form, Input, Button, notification } from 'antd';
import { Redirect } from "react-router-dom";

import axios from 'axios';

import { login } from '../services/auth';

import './login.css';

const FormItem = Form.Item;
 
export default class Login extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      nav: '',
      loading: false
    };
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  emitEmpty = (e) => {
    const newState = { ...this.state };
    newState[e] = '';
    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    const { email, senha } = this.state;

    axios.post('/simpleusers/login', {
      email, senha
    }).then(res => {
      login(res.data.token, res.data.user.status);
      notification['success']({
        message: 'Bem Vindo, ' + res.data.user.nome,
        description: 'Seu login foi aprovado, bem vindo!'
      });
      this.props.toggle();
      
      setTimeout(() => {
        this.setState({ loading: false });
        if(res.data.user.status === 0) {
          this.setState({ nav: '/createadminuser' }); // 0: simpleuser
        } else if(res.data.user.status === 1) {
          this.setState({ nav: '/createadminuser' }); // 1: companyuser
        } else {
          this.setState({ nav: '/createadminuser' }); // 2: admin
        }
      }, 2000);
    }).catch(ex => {
      this.setState({ loading: false })
      // if (ex.name === 'ERR_INVALID_ARG_VALUE') {
      //   notification['error']({
      //     message: 'Erro!',
      //     description: 'Erro ao fazer o login. Digite os dados corretamente. '
      //   });
      // } else if (ex.name === '401') {
      //   notification['error']({
      //     message: 'Erro!',
      //     description: 'Erro ao fazer o login. Confira se seu e-mail e sua senha estão corretos. '
      //   });
      // } else {
        notification['error']({
          message: 'Erro!',
          description: 'Erro ao fazer o login. Tente novamente mais tarde. Se persistir, consulte um técnico. '
        });
      // }
      console.log(ex.message);
    });   
  }

  render() {
    if(this.state.nav) {
      return <Redirect to = { this.state.nav } />
    }

    return (
      <Modal title = { "Login" }
        visible = { this.props.visible }
        onCancel = { this.props.toggle }
        footer = { null }
      >
        <Form onSubmit = { this.handleSubmit } className = "login-form">
          <FormItem>
            <Input prefix = { <Icon type = "mail" style = {{ color: 'rgba(0,0,0,.25)' }} /> }
              suffix = { this.state.email ? <Icon type = "close-circle" onClick = { (event) => this.emitEmpty("email") } /> : null }
              name = "email" type = "email" placeholder = "E-mail" size = "large" required = {true}
              onChange = { (event) => this.onChangeText(event) } value = { this.state.email }
            />
          </FormItem>

          <FormItem>
            <Input prefix = { <Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }} /> }
              suffix = { this.state.senha ? <Icon type = "close-circle" onClick = { (event) => this.emitEmpty("senha") } /> : null }
              name = "senha" type = "password" placeholder = "Senha" size = "large" minLength = {8} required = {true}
              onChange = { (event) => this.onChangeText(event) } value = { this.state.senha }
            />
          </FormItem>
          
          <FormItem className = "buttonForm" style = {{ textAlign: 'center' }}>
            <Button loading = { this.state.loading } type = "primary" htmlType = "submit" className = "buttonForm" size = "large"> Login </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}