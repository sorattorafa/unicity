import { Form, Row, Col, Icon, Input, Button, Tooltip, Select } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

const { Option } = Select;
const TextArea = Input.TextArea;

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

    this.state = { 
      title: '',
      cep: '',
      street: '',  
      number: '',
      description: '',
      active: true
    }
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

  onChangeDescription(e) {
    this.setState({
        description: e.target.value
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

        axios.post('/reports/add', values)
            .then(res => console.log(res.data));

        this.setState({ 
          title: '',
          cep: '',
          street: '',  
          number: '',
          description: '',
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
    const titleError = isFieldTouched('title') && getFieldError('title');
    const cepError = isFieldTouched('cep') && getFieldError('cep');
    const streetError = isFieldTouched('street') && getFieldError('street');
    const numberError = isFieldTouched('number') && getFieldError('number');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    // const cityError = isFieldTouched('city') && getFieldError('city');
    // const categoryError = isFieldTouched('category') && getFieldError('category');

    return (
      <Row>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                rules: [{ required: true, message: 'Insira o CEP do local do relato!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
          </Row>

          {/* Report's Street */}
          <Row gutter={24}>
            <Col span={16}>
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
                  rules: [{ required: true, message: 'Insira a rua do local do relato!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
            </Col>

          {/* Report's number */}
            <Col span={8}>
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
                  rules: [{ required: true, message: 'Insira o número do estabelecimento mais próximo do local do relato!' }],
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
            {/* <Col span={12}>
              <Form.Item label={
                <span>
                  Categoria&nbsp;
                  <Tooltip title="Qual a categoria do relato?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              } hasFeedback>
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: 'Insira a categoria do relato!' }],
                })(
                  <Select>
                    <Option value="1">Segurança pública</Option>
                    <Option value="2">Mobilidade</Option>
                    <Option value="3">Vias</Option>
                    <Option value="4">Iluminação</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row> */}

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
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                  Relatar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Row>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(CreateReport);
 export default WrappedHorizontalLoginForm;