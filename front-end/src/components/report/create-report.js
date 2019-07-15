import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip, Select } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getUserId } from '../services/auth';

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
    this.onChangeStreet = this.onChangeStreet.bind(this); 
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this); 
    this.onChangeCategory = this.onChangeCategory.bind(this); 
    this.onChangeSimpleuser = this.onChangeSimpleuser.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this); 
    this.onChangeLng = this.onChangeLng.bind(this); 
    const {lat,lng} = this.props.location.state.position2; 
    const iduser = getUserId(); 
    this.state = {  
      lat: lat,  
      lng: lng,
      title: '',
      street: '',  
      number: '', 
      category: '',
      description: '',  
      simpleuser: iduser,
      comments:'',
      active: true
    } 
  }

  onChangeLng(e) {
    this.setState({
        lng: e.target.value
    });
  }  

  onChangeSimpleuser(e) {
    this.setState({
        simpleuser: e.target.value
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

    console.log(this.state.position2)
    this.props.form.validateFields((err, values) => {
      if (!err) {  
        values.simpleuser = getUserId() 
        values.lat = this.state.lat; 
        values.lng = this.state.lng;
        console.log('Received values of form: ', values); 
        axios.post('/reports/add', values)
            .then(res => console.log(res.data));

        this.setState({  
          lat: '', 
          lng: '',
          title: '',
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
    const simpleuserError = isFieldTouched('simpleuser') && getFieldError('simpleuser');
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
                <Col span={16}>
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
                </Col>
              </Row>
                
              {/* Report's Street */}
              <Row>
                <Col span={16}>
                  <Form.Item
                    validateStatus={streetError ? 'error' : ''} help={streetError || ''}
                    label={
                      <span>
                        Rua&nbsp;
                        <Tooltip title="Qual a rua do problema?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('street', {
                      rules: [{ message: 'Insira a rua onde o problema se encontra!', whitespace: true }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>

              {/* Report's number */}
              <Row> 
                <Col span={16}>
                  <Form.Item
                    validateStatus={numberError ? 'error' : ''} help={numberError || ''}
                    label={
                      <span>
                        Número&nbsp;
                        <Tooltip title="Qual o número do estabelecimento mais próximo do problema?">
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
              <Row>
                <Col span={16}>
                  <Form.Item  
                    validateStatus={categoryError ? 'error' : ''} help={categoryError || ''}
                    label={
                      <span>
                        Categoria&nbsp;
                        <Tooltip title="Em qual dessas categorias o problema melhor se enquadra?">
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
                          <Option value="5d12b26269d6b84798edc226">Saneamento</Option> 
                          <Option value="5d12b2a769d6b84798edc227">Prefeitura</Option>
                        </Select>,
                      )}
                  </Form.Item>
                </Col>
              </Row> 

              {/* Report's Description */}
              <Row>
                <Col span={16}>
                  <Form.Item
                    validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}
                    label={
                      <span>
                        Descrição&nbsp;
                        <Tooltip title="Escreva uma breve descrição sobre o problema, para ajudar a identificá-lo e resolvê-lo.">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Insira uma descrição sobre o relato!', whitespace: true }],
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Col>
              </Row>
              

              {/* Report's LogLat */}
              {/* <Row>
                <Col span={16}>
                  <Form.Item
                    label={
                      <span>
                        Latitude&nbsp;
                        <Tooltip title="Esta é a latitude do problema, obtida automaticamente.">
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
              </Row>  


              <Row>
                <Col span={16}>
                  <Form.Item
                    label={
                      <span>
                        Longitude&nbsp;
                        <Tooltip title="Esta é a longitude do problema, obtida automaticamente.">
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
                </Col>  
              </Row> */}

              {/* Submit Button */}
              <Row className="buttonForm">
                <Col span={16} style={{ textAlign: 'right' }}>
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