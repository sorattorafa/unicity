import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip, Select } from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getStatus } from '../services/auth';

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
            id: '',
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
            active: true,
            visibility: true,
            status: getStatus()                 // 0: simpleuser; 1: companyuser; 2: admin
          // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin
        }

        if (this.state.status === '2') {
          this.state.visibility = false;
        }

    }

    componentWillMount() {
      console.log(this.props.match.params);
      axios.get('/companyusers/' + this.props.match.params.id)
      .then(response => {
          console.log(response.data);
          this.setState({
              id: this.props.match.params.id,
              cnpj: response.data.cnpj,
              name: response.data.name, 
              apresentation: response.data.apresentation,
              city: response.data.city, 
              street: response.data.street, 
              number: response.data.number,
              email: response.data.email,
              password: response.data.password,
              confirmpassword: response.data.password,
              category: response.data.category 
          })  
      })

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
    
                axios.put('/companyusers/' + this.state.id , values)
                    .then(res => console.log(res.data));
    
                // return <Redirect to = { this.state.nav } />
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

        return (
            <Layout style = {{ minHeight: '100vh' }}>
                <NavBar />
        
                <Layout>
          <LateralMenu pagina = "listcompanyusers" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Title className = "titleForm" level={1}> Cadastrar usuário empresarial </Title>
              <Divider className = "dividerForm" />

                        {/* Company User's Cnpj */}
                        <Row>
                            <Form.Item
                                validateStatus={cnpjError ? 'error' : ''} help={cnpjError || ''}
                                label={
                                    <span>
                                        CNPJ&nbsp;
                                        <Tooltip title="Qual é o CNPJ da empresa?">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                {getFieldDecorator('cnpj', {
                                    // rules: [ {required: true}, {message: 'Insira o CNPJ da empresa!' }],
                                    initialValue: this.state.cnpj,
                                })(<Input disabled={this.state.visibility} />)}
                            </Form.Item>
                        </Row>

                        {/* Company User's Name */}
                        <Row>
                            <Form.Item
                                validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                                label={
                                    <span>
                                        Nome&nbsp;
                                        <Tooltip title="Qual é o nome da empresa?">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                {getFieldDecorator('name', {
                                    initialValue: this.state.name
                                    // rules: [{ required: true, message: 'Insira o nome da empresa!', whitespace: true }],
                                })(<Input disabled={this.state.visibility} />)}
                            </Form.Item>
                        </Row>

                        {/* Company User's Apresentation */}
                        <Row>
                            <Form.Item
                                validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                                label={
                                    <span>
                                        Apresentação&nbsp;
                                        <Tooltip title="Insira uma mensagem de apresentação da empresa">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                {getFieldDecorator('apresentation', {
                                    initialValue: this.state.apresentation,
                                    // rules: [{ required: true, message: 'Insira uma mensagem de apresentação da empresa', whitespace: true }],
                                })(<TextArea rows={4} disabled={!this.state.visibility} />)}
                            </Form.Item>
                        </Row>

                        {/* Company User's Category */}  
                        <Row gutter={24}>
                        <Col span={12}>
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
                                <Select disabled={this.state.visibility}>
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
                            <Form.Item
                                validateStatus={cityError ? 'error' : ''} help={cityError || ''}
                                label={
                                    <span>
                                        Cidade&nbsp;
                                        <Tooltip title="Qual a cidade da empresa?">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                {getFieldDecorator('city', {
                                    initialValue: this.state.city,
                                    // rules: [{ required: true, message: 'Insira a cidade da empresa!', whitespace: true }],
                                })(<Input disabled={this.state.visibility} />)}
                            </Form.Item>
                        </Row>

                        {/* Company User's Street */}
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    validateStatus={streetError ? 'error' : ''} help={streetError || ''}
                                    label={
                                        <span>
                                            Rua&nbsp;
                                            <Tooltip title="Qual a rua do endereço da empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('street', {
                                        initialValue: this.state.street,
                                        // rules: [{ required: true, message: 'Insira a rua do endereço da empresa!', whitespace: true }],
                                    })(<Input disabled={this.state.visibility} />)}
                                </Form.Item>
                            </Col>

                        {/* Company User's Number */}
                            <Col span={12}>
                                <Form.Item
                                    validateStatus={numberError ? 'error' : ''} help={numberError || ''}
                                    label={
                                        <span>
                                            Número&nbsp;
                                            <Tooltip title="Qual o número do endereço da empresa?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('number', {
                                        initialValue: this.state.number,
                                        // rules: [{ required: true, message: 'Insira o número do endereço da empresa!', whitespace: true }],
                                    })(<Input disabled={this.state.visibility} />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Company User's Email */}
                        <Row>
                            <Form.Item
                                validateStatus={emailError ? 'error' : ''} help={emailError || ''}
                                label={
                                    <span>
                                        E-mail&nbsp;
                                        <Tooltip title="Qual o email da empresa?">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                {getFieldDecorator('email', {
                                    initialValue: this.state.email,
                                    // rules: [{ type: 'email', message: 'Esse não é um e-mail válido!' },
                                    // { required: true, message: 'Insira o email da empresa!', whitespace: true }],
                                })(<Input disabled={!this.state.visibility} />)}
                            </Form.Item>
                        </Row>

                        {/* Company User's Password */}
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}
                                    label={
                                        <span>
                                            Senha&nbsp;
                                            <Tooltip title="Insira uma senha para a empresa!">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('password', {
                                      initialValue: this.state.password,
                                        // rules: [{ required: true, message: 'Insira uma senha para a empresa!' }],
                                    })(<Input
                                        disabled={!this.state.visibility}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />)}
                                </Form.Item>
                            </Col>
                            
                        {/* Company User's Confirm Password */}
                            <Col span={12}>
                                <Form.Item
                                    validateStatus={confirmpasswordError ? 'error' : ''} help={confirmpasswordError || ''}
                                    label={
                                        <span>
                                            Confirme a senha&nbsp;
                                            <Tooltip title="Confirme a senha para a empresa!">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('confirmpassword', {
                                        initialValue: this.state.password,
                                        // rules: [{ required: true, message: 'Confirme a senha para a empresa!' }],
                                    })(<Input
                                        disabled={!this.state.visibility}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Confirm Password"
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