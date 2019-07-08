import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip, Select, notification } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getToken, getStatus } from '../services/auth';
import { Redirect } from "react-router-dom";

const TextArea = Input.TextArea;
const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

// Return errors in fields
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateCompanyUser extends React.Component {

    constructor(props) {
        super(props); 
    
        this.onChangeCnpj = this.onChangeCnpj.bind(this);
        this.onChangeName = this.onChangeName.bind(this); 
        this.onChangeApresentation = this.onChangeApresentation.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this); 
        this.onChangeNumber = this.onChangeNumber.bind(this); 
        this.onChangeEmail = this.onChangeEmail.bind(this); 
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmpassword = this.onChangeConfirmpassword.bind(this);
        this.onChangeCategories = this.onChangeCategories.bind(this);
    
        this.state = {
            nav: '',
            cnpj: '',
            name: '',
            apresentation: '',
            city: '',
            street: '',
            number: '',
            email: '',  
            password: '',
            confirmpassword: '',
            categories: '',
            active: true
        }
    }

    onChangeCnpj(e) {
        this.setState({
            cnpj: e.target.value
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeApresentation(e) {
        this.setState({
            apresentation: e.target.value
        });
    } 
    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    } 
    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        });
    } 
    onChangeNumber(e) {
        this.setState({
            number: e.target.value
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
    onChangeCategories(e) {
        this.setState({
            categories: e.target.value
        });
      } 
    
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
    
                axios.post('/companyusers/add', values)
                    .then(res => {
                        console.log(res.data);
                        if(res.status === 200) {
                            notification['success']({
                              message: 'Sucesso!',
                              description: 'Empresa cadastrada!'
                            });
                            
                            // Atualiza página
                            this.setState({ nav: '/listcompanyusers'});
                        }
                    });
    
                this.setState({
                    nav: '',
                    cnpj: '',
                    name: '',
                    apresentation: '',
                    city: '',
                    street: '',
                    number: '',
                    email: '',  
                    password: '',
                    categories:'',
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

        const cnpjError = isFieldTouched('cnpj') && getFieldError('cnpj');
        const nameError = isFieldTouched('name') && getFieldError('name');
        const apresentationError = isFieldTouched('apresentation') && getFieldError('apresentation');
        const cityError = isFieldTouched('city') && getFieldError('city');
        const streetError = isFieldTouched('street') && getFieldError('street');
        const numberError = isFieldTouched('number') && getFieldError('number');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const confirmpasswordError = isFieldTouched('confirmpassword') && getFieldError('confirmpassword');
        const categoriesError = isFieldTouched('categories') && getFieldError('categories');

        if(this.state.nav)
            return <Redirect to = { this.state.nav } />
        // Só exibe se estiver logado
        else if(!getToken() || !(getStatus() === '2'))
            return <Redirect to = { "/" } />
        else if(getToken() && (getStatus() === '2'))
        return (
            <Layout style = {{ minHeight: '100vh' }}>
                <NavBar />
        
                <Layout>
          <LateralMenu pagina = "createCompanyuser" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Title className = "titleForm" level={1}> Cadastrar Empresa </Title>
              <Divider className = "dividerForm" />

                        {/* Company User's Cnpj */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={cnpjError ? 'error' : ''} help={cnpjError || ''}
                                    label={
                                        <span>
                                            CNPJ&nbsp;
                                            <Tooltip title="Qual é o CNPJ da nova empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('cnpj', {
                                        rules: [{ required: true, message: 'Insira o CNPJ da nova empresa!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Name */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                                    label={
                                        <span>
                                            Nome&nbsp;
                                            <Tooltip title="Qual é o nome da nova empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Insira o nome da nova empresa!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Apresentation */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                                    label={
                                        <span>
                                            Apresentação&nbsp;
                                            <Tooltip title="Insira a carta de apresentação da empresa.">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('apresentation', {
                                        rules: [{ required: true, message: 'Insira uma mensagem de apresentação da empresa', whitespace: true }],
                                    })(<TextArea rows={4} />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Category */}  
                        <Row>
                            <Col span={16}>
                                <Form.Item  
                                validateStatus={categoriesError ? 'error' : ''} help={categoriesError || ''}
                                label={
                                <span>
                                    Categoria&nbsp;
                                    <Tooltip title="Qual a categoria da empresa?">
                                    <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                                } hasFeedback>
                                {getFieldDecorator('categories', {
                                    rules: [{ required: true, message: 'Insira a categoria da empresa!', whitespace: true  }],
                                })(
                                    <Select>
                                    <Option value="5d0431577425506f0589c71b">Segurança pública</Option>
                                    <Option value="5d053c8f9dbdf87818fbfc44">Mobilidade</Option>
                                    <Option value="5d053c469dbdf87818fbfc43">Vias</Option>
                                    <Option value="5d053cc99dbdf87818fbfc45">Iluminação</Option> 
                                    <Option value="5d0bfc8591baa12cf537b9ec">Natureza</Option>
                                    <Option value="5d058f37631ca618148481f2">Acessibilidade</Option>
                                    </Select>,
                                )}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's City */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={cityError ? 'error' : ''} help={cityError || ''}
                                    label={
                                        <span>
                                            Cidade&nbsp;
                                            <Tooltip title="Qual a cidade da nova empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('city', {
                                        rules: [{ required: true, message: 'Insira a cidade da nova empresa!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Street */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={streetError ? 'error' : ''} help={streetError || ''}
                                    label={
                                        <span>
                                            Rua&nbsp;
                                            <Tooltip title="Qual a rua do endereço da nova empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('street', {
                                        rules: [{ required: true, message: 'Insira a rua do endereço nova empresa!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Number */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={numberError ? 'error' : ''} help={numberError || ''}
                                    label={
                                        <span>
                                            Número&nbsp;
                                            <Tooltip title="Qual o número do endereço da nova empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('number', {
                                        rules: [{ required: true, message: 'Insira o número do endereço nova empresa!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Email */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={emailError ? 'error' : ''} help={emailError || ''}
                                    label={
                                        <span>
                                            E-mail&nbsp;
                                            <Tooltip title="Qual o email da nova empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{ type: 'email', message: 'Esse não é um e-mail válido!' },
                                        { required: true, message: 'Insira o email da nova empresa!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Password */}
                        <Row>
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}
                                    label={
                                        <span>
                                            Senha&nbsp;
                                            <Tooltip title="Insira uma senha para a nova empresa.">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Insira uma senha para a nova empresa!' }],
                                    })(<Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />)}
                                </Form.Item>
                            </Col>
                            
                        {/* Company User's Confirm Password */}
                            <Col span={16}>
                                <Form.Item
                                    validateStatus={confirmpasswordError ? 'error' : ''} help={confirmpasswordError || ''}
                                    label={
                                        <span>
                                            Confirme a senha&nbsp;
                                            <Tooltip title="Confirme a senha para a nova empresa.">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('confirmpassword', {
                                        rules: [{ required: true, message: 'Confirme a senha para a nova empresa!' }],
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
                            <Col span={16} style={{ textAlign: 'right' }}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
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

const WrappedCompanyUserForm = Form.create({ name: 'horizontal_companyuserform' })(CreateCompanyUser);
 export default WrappedCompanyUserForm;