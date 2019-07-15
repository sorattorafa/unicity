import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip, notification } from 'antd';
import React from 'react';
import { Redirect, Link } from "react-router-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getToken, getUserId } from '../services/auth';
import {TestaCPF} from '../../components/services/cfp_validation';

const { Title } = Typography;
const { Content } = Layout;

// Return errors in fields
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditSimpleuser extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeSimpleuserCpf = this.onChangeSimpleuserCpf.bind(this);
        this.onChangeSimpleuserName = this.onChangeSimpleuserName.bind(this);
        this.onChangeSimpleuserEmail = this.onChangeSimpleuserEmail.bind(this);
        this.onChangeSimpleuserPassword = this.onChangeSimpleuserPassword.bind(this);

        this.state = {
            id: '',
            cpf: '',
            name: '',
            email: '',
            password: ''
        }
    }

    componentWillMount() {
        axios.get('/simpleusers/'+this.props.match.params.id)
            .then(response => {
                this.props.form.setFieldsValue({
                    cpf: response.data.cpf,
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    confirmpassword: response.data.password
                })
            }).catch(function(error) {
                console.log(error)
            });
        
        this.setState({
            id: this.props.match.params.id
        });
    }

    onChangeSimpleuserCpf(e) {
        this.setState({
            cpf: e.target.value
        });
    }

    onChangeSimpleuserName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSimpleuserEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeSimpleuserPassword(e) {
        this.setState({
            password: e.target.value
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
                // console.log("CPF:" + this.state.cpf)
                let cpfIsValid = TestaCPF(this.state.cpf);
                if (!cpfIsValid) {
                    notification['error']({
                    message: 'Erro!',
                    description: 'CPF inválido!'
                    });
                } else {
                    // console.log('Received values of form: ', values);
        
                    let res = axios.put('/simpleusers/' + this.state.id , values)
                        .then(res => {
                        // console.log(res.data);
                        // console.log("Status: " + res.status);

                        // Exibe notificação de sucesso
                        if(res.status === 200) {
                            notification['success']({
                            message: 'Sucesso!',
                            description: 'Perfil atualizado!'
                            });
                            
                            // Atualiza página
                            let id_simpleuser = this.state.id;
                            this.setState({ nav: '/profilesimpleuser/' + id_simpleuser });
                        }
                        });
                }
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

        const cpfError = isFieldTouched('cpf') && getFieldError('cpf');
        const nameError = isFieldTouched('name') && getFieldError('name');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const confirmpasswordError = isFieldTouched('confirmpassword') && getFieldError('confirmpassword');

        // Controla página exibida - Ao atualizar, muda de página
        if(this.state.nav)
            return <Redirect to = { this.state.nav } />
        // Só exibe se estiver logado
        else if(!getToken() || !(getUserId() === this.state.id))
        return <Redirect to = { "/" } />
        else if(getToken() && (getUserId() === this.state.id))
            return (
                <Layout style = {{ minHeight: '100vh' }}>
                    <NavBar />
            
                    <Layout>
                    <LateralMenu pagina = "listcompanyusers" />
                
                    <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                            <Title className = "titleForm" level={1}> Editar Perfil </Title>
                            <Divider className = "dividerForm" />

                            {/* Simple User's Cpf */}
                            <Row>
                                <Form.Item
                                    validateStatus={cpfError ? 'error' : ''} help={cpfError || ''}
                                    label={
                                        <span>
                                            CPF&nbsp;
                                            <Tooltip title="Qual é o seu CPF?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('cpf', {
                                        rules: [ {required: true}, {message: 'Insira seu CPF!' }],
                                    })(<Input onChange={this.onChangeCpf} />)}
                                </Form.Item>
                            </Row>

                            {/* Simple User's Name */}
                            <Row>
                                <Form.Item
                                    validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                                    label={
                                        <span>
                                            Nome&nbsp;
                                            <Tooltip title="Qual é o seu nome?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('name', {
                                        // initialValue: this.state.name
                                        rules: [{ required: true, message: 'Insira o seu nome!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Row>

                            {/* Simple User's Email */}
                            <Row>
                                <Form.Item
                                    validateStatus={emailError ? 'error' : ''} help={emailError || ''}
                                    label={
                                        <span>
                                            E-mail&nbsp;
                                            <Tooltip title="Qual o seu email?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{ type: 'email', message: 'Esse não é um e-mail válido!' },
                                        { required: true, message: 'Insira o seu email!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Row>

                            {/* Simple User's Password */}
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}
                                        label={
                                            <span>
                                                Senha&nbsp;
                                                <Tooltip title="Insira uma senha para sua conta.">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                        }
                                    >
                                        {getFieldDecorator('password', {
                                        // initialValue: this.state.password,
                                            rules: [{ required: true, message: 'Insira uma senha para sua conta!' }],
                                        })(<Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Senha"
                                        />)}
                                    </Form.Item>
                                </Col>
                                
                            {/* Simple User's Confirm Password */}
                                <Col span={12}>
                                    <Form.Item
                                        validateStatus={confirmpasswordError ? 'error' : ''} help={confirmpasswordError || ''}
                                        label={
                                            <span>
                                                Confirme a senha&nbsp;
                                                <Tooltip title="Confirme a senha para sua conta.">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                        }
                                    >
                                        {getFieldDecorator('confirmpassword', {
                                            // initialValue: this.state.password,
                                            rules: [{ required: true, message: 'Confirme a senha para sua conta!' }],
                                        })(<Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Confirme a senha"
                                        />)}
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* Submit Button */}
                            <Row className="buttonForm">
                                <Col span={20} style={{ textAlign: 'right' }}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                            Atualizar
                                        </Button>
                                        <Link style = {{paddingLeft: "5px"}} to = { "/profilesimpleuser/" + this.state.id} >
                                            <Button className = "buttonNav" type = "primary">
                                                Cancelar
                                            </Button>
                                        </Link>
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

const WrappedCompanyUserForm = Form.create({ name: 'horizontal_simpleuserform' })(EditSimpleuser);
 export default WrappedCompanyUserForm;