import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip, Select } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Option } = Select;
const TextArea = Input.TextArea;
const { Title } = Typography;
const { Content } = Layout;

// Return the errors in hte fields
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateReport extends React.Component {
  constructor(props) {
    super(props); 

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCep = this.onChangeCep.bind(this);  
    this.onChangeStreet = this.onChangeStreet.bind(this); 
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this); 
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this); 
    this.onChangeLng = this.onChangeLng.bind(this);
    this.state = {  
      lat:'',  
      lng:'',
      title: '',
      cep: '',
      street: '',  
      number: '', 
      category: '',
      description: '', 
      active: true
    }
  }
 

  onChangeLng(e) {
    this.setState({
        lng: e.target.value
    });
  } 
  onChangeLat(e) {
    this.setState({
        lat: e.target.value
    });
  } 
  onChangeTitle(e) {
    this.setState({
        title: e.target.value
    });
  }
  onChangeCep(e) {
    this.setState({
        cep: e.target.value
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
  onChangeCategory(e) {
    this.setState({
        category: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
        description: e.target.value
    });
  }  

  componentDidMount() {
    // To disabled submit button at the beginning.
   // this.setState({
   //   lat:
   //   lng
   // }) 
    this.props.form.validateFields(); 
    this.props.form.setFieldsValue ({ 
      lat: this.props.location.state.position2.lat, 
      lng: this.props.location.state.position2.lng
    }); 
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        axios.post('/reports/add', values)
            .then(res => console.log(res.data));

        this.setState({  
          lat: '', 
          lng: '',
          title: '',
          cep: '',
          street: '',  
          number: '', 
          category:'',
          description: '',
          active: true
        }) 
        window.location.replace("http://localhost:3000/map"); 
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
    const titleError = isFieldTouched('title') && getFieldError('title');
    const cepError = isFieldTouched('cep') && getFieldError('cep');
    const streetError = isFieldTouched('street') && getFieldError('street');
    const numberError = isFieldTouched('number') && getFieldError('number'); 
    const categoryError = isFieldTouched('category') && getFieldError('category');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    // const cityError = isFieldTouched('city') && getFieldError('city');
    // const categoryError = isFieldTouched('category') && getFieldError('category');

    return (
      <Layout style = {{ minHeight: '100vh' }}>
        <NavBar />
        
        <Layout>
          <LateralMenu pagina = "createreport" />
          
          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Title className = "titleForm" level={1}> Adicionar relato </Title>
              <Divider className = "dividerForm" />
            {/* Report's Title */}
            <Row>
              <Form.Item
                validateStatus={titleError ? 'error' : ''} help={titleError || ''}
                label={
                  <span>
                    Título&nbsp;
                    <Tooltip title="Como o problema pode ser resumido em uma frase?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Insira um título para o problema!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
            </Row>

            {/* Report's CEP */}
            <Row>
              <Form.Item
                validateStatus={cepError ? 'error' : ''} help={cepError || ''}
                label={
                  <span>
                    CEP&nbsp;
                    <Tooltip title="Qual o CEP do ocorrido?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('cep', {
                  rules: [{ message: 'Insira o CEP do local do relato!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
               
             {/* Report's LogLat */}
            {/* <Col span={8}>
              <Form.Item
                label={
                  <span>
                    Lat&nbsp;
                    <Tooltip title="latitude ?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('lat', {
                  rules: [{ required: true, message: 'Insira o número da latitude relato!' }],
                })(<Input
                    disabled={true}
                  />)}
              </Form.Item>
            </Col>  

            <Col span={8}>
              <Form.Item
                label={
                  <span>
                    Lng&nbsp;
                    <Tooltip title="longitude ?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('lng', {
                  rules: [{ required: true, message: 'Insira o número da latitude relato!' }], 
                })(<Input
                    disabled={true}
                  />)}
              </Form.Item>
            </Col>  */}

          </Row>

            {/* Report's Street */}
            <Row gutter={24}>
              <Col span={14}>
                <Form.Item
                  validateStatus={streetError ? 'error' : ''} help={streetError || ''}
                  label={
                    <span>
                      Rua&nbsp;
                      <Tooltip title="Qual a rua do ocorrido?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('street', {
                    rules: [{ message: 'Insira a rua do local do relato!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>
              </Col>

            {/* Report's number */}
              <Col span={10}>
                <Form.Item
                  validateStatus={numberError ? 'error' : ''} help={numberError || ''}
                  label={
                    <span>
                      Número&nbsp;
                      <Tooltip title="Qual o número do estabelecimento mais próximo do ocorrido?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('number', {
                    rules: [{ message: 'Insira o número do estabelecimento mais próximo do local do relato!' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>

            {/* Report's City */}
            {/* <Row gutter={24}>
              <Col span={12}>
                <Form.Item label={
                  <span>
                    Cidade&nbsp;
                    <Tooltip title="Qual a cidade de ocorrência do relato?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                } hasFeedback>
                  {getFieldDecorator('city', {
                    rules: [{ required: true, message: 'Insira a cidade de ocorrência do relato!' }],
                  })(
                    <Select>
                      <Option value="1">Campo Mourão</Option>
                      <Option value="2">Maringá</Option>
                      <Option value="3">Cianorte</Option>
                      <Option value="4">Ivaiporã</Option>
                      <Option value="5">Araruna</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col> */}

            {/* Report's Category */}  
            <Row gutter={24}>
               <Col span={12}>
                <Form.Item  
                validateStatus={categoryError ? 'error' : ''} help={categoryError || ''}
                label={
                  <span>
                    Categoria&nbsp;
                    <Tooltip title="Qual a categoria do relato?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                } hasFeedback>
                  {getFieldDecorator('category', {
                    rules: [{ required: true, message: 'Insira a categoria do relato!', whitespace: true  }],
                  })(
                    <Select>
                      <Option value="5d0431577425506f0589c71b">Segurança pública</Option>
                      <Option value="5d053c8f9dbdf87818fbfc44">Mobilidade</Option>
                      <Option value="5d053c469dbdf87818fbfc43">Vias</Option>
                      <Option value="5d053cc99dbdf87818fbfc45">Iluminação</Option> 
                      <Option value="5d0bfc8591baa12cf537b9ec">Natureza</Option> 
                      <Option value="5d0d451a27bb113f9265cf4b">Acessibilidade</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row> 
            {/* Report's Description */}
            <Row>
              <Form.Item
                validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}
                label={
                  <span>
                    Descrição&nbsp;
                    <Tooltip title="Qual a descrição do ocorrido?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Insira uma descrição sobre o relato!', whitespace: true }],
                })(<TextArea rows={4} />)}
              </Form.Item>
            </Row>
            
            {/* Submit Button */}
            <Row className="buttonForm">
              <Col span={24} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Relatar
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

const WrappedCreateReport = Form.create({ name: 'horizontal_createreport' })(CreateReport);
 export default WrappedCreateReport;