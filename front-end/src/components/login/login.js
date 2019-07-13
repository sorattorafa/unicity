// login.js

import React, {Component} from 'react';
import { Divider, Typography, Modal, Icon, Form, Input, Button, notification } from 'antd';
import { Redirect } from "react-router-dom";

import axios from 'axios';

import { login } from '../services/auth';

import './login.css';

const jwt = require('jsonwebtoken');
const FormItem = Form.Item;
const { Title } = Typography;
 
export default class Login extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      nav: '',
      loading: false, 
      simpleusers:[],  
      companyuser:[], 
      adminusers:[],
      finduser: false
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
// console.log("Passou 3");
    axios.post('/simpleusers/login/'+ email + '/' + senha)
    .then(response => {
      if(response.status === 200) {
        var token = jwt.sign({ id: response.data._id }, 'secret', { expiresIn: 14400 });
        login(token, 0, response.data._id);
        this.state.finduser = true 
        const menuuser = "http://localhost:3000/listreport"
            window.location.replace("http://localhost:3000/map"); 

      } else if (response.status === 401) {
        notification['error']({
          message: 'Não foi possível realizar o login.',
          description: 'Email não cadastrado!'
        });

      } else {
        notification['error']({
          message: 'Não foi possível realizar o login.',
          description: 'Senha incompatível.'
        });
      }
      
    })
    .catch(function (error) {
      // console.log("Erro:" + error.response);
      // console.log("Erro:" + error.response.status);
      if (error.response.status === 400) {
        notification['error']({
          message: 'Não foi possível realizar o login.',
          description: 'Digite um email válido!'
        });

      } else if (error.response.status === 500) {
        notification['error']({
          message: 'Não foi possível realizar o login.',
          description: 'Problemas com o servidor. Consulte um técnico.'
        });

      }
    }) 

    if(this.state.finduser === false){ 
       axios.get('/companyusers/')
    .then(response => {
        this.setState({companyusers: response.data});  
        this.state.companyusers.map(companyuser => {  
            if (companyuser.email === email){ 
                if(companyuser.password === senha){
                  var token = jwt.sign({ id: companyuser.cnpj }, 'secret', { expiresIn: 14400 });
                  login(token, 1, companyuser._id);
                  this.state.finduser = true;
                  window.location.replace("http://localhost:3000/listreportbycompanyuser/"+companyuser._id); 
                  // window.location.replace("http://localhost:3000/viewcompanyuser/"+companyuser._id); 
                    //this.props.history.push('/map'); 
                    //console.log(this.state.loginaceito)
                    //window.location.replace("http://localhost:3000/create"); 
                } 
            } 
        }
        ) 
    })
    .catch(function (error) {
        console.log(error);
    }) 
    } 
    if(this.state.finduser === false){ 
      axios.get('/adminusers/'+email)
      .then(response => {
          this.setState({adminusers: response.data});  
          this.state.adminusers.map(adminuser => {  
              if (adminuser.email === email){ 
                  if(adminuser.password === senha){
                    var token = jwt.sign({ id: adminuser.cpf }, 'secret', { expiresIn: 14400 });
                    login(token, 2, adminuser._id);
                    this.state.finduser = true
                    window.location.replace("http://localhost:3000/listusers"); 
                      //this.props.history.push('/map'); 
                      //console.log(this.state.loginaceito)
                      //window.location.replace("http://localhost:3000/create"); 
                  } 
              } 
          }
          ) 
      })
      .catch(function (error) {
          console.log(error);
      }) 
    }   
{/* 
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
    */}  
  }

  render() {
    if(this.state.nav) {
      return <Redirect to = { this.state.nav } />
    }

    return (
      <Modal
        visible = { this.props.visible }
        onCancel = { this.props.toggle }
        footer = { null }
      >
        <Form onSubmit = { this.handleSubmit } className = "login-form">
          <Title className = "titleForm" level={1}> Login </Title>
          <Divider className = "dividerForm" />
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
              name = "senha" type = "password" placeholder = "Senha" size = "large" minLength = {6} required = {true}
              onChange = { (event) => this.onChangeText(event) } value = { this.state.senha }
            />
          </FormItem>
          
          <FormItem className = "buttonForm" style = {{ textAlign: 'center' }}>
            <Button loading = { this.state.loading } type = "primary" htmlType = "submit" className = "buttonForm" size = "large"> Logar </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}