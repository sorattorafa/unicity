import { Layout, Form, Row, Col, Icon, Input, Button, Tooltip, Select } from 'antd';
import React from 'react';
//import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';

const { Option } = Select;
const TextArea = Input.TextArea;

// Return the errors in hte fields
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateCategory extends React.Component {
  constructor(props) {
    super(props); 

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = { 
      name: '',
      description: '',
      active: true
    }
  }

  onChangeName(e) {
    this.setState({
        name: e.target.value
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

        axios.post('/categories/', values)
            .then(res => console.log(res.data));

        this.setState({ 
          name: '',
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
    const nameError = isFieldTouched('name') && getFieldError('name');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    // const cityError = isFieldTouched('city') && getFieldError('city');
    // const categoryError = isFieldTouched('category') && getFieldError('category');

    return (
      <Layout style = {{ minHeight: '100vh' }}>
        <NavBar />
        
        <Layout style = {{ background: '#fff', padding: "40px 20px 0 20px" }}>
          <LateralMenu pagina = "confirmacaoPromocao" />
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {/* Category name */}
            <Row>
              <Form.Item
                validateStatus={nameError ? 'error' : ''} help={nameError || ''}
                label={
                  <span>
                    Nome&nbsp;
                    <Tooltip name="Como a categoria pode ser resumida em uma frase?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Insira um nome para a categoria!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
            </Row> 

            {/* Categories Description */}
            <Row>
              <Form.Item
                validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}
                label={
                  <span>
                    Descrição&nbsp;
                    <Tooltip title="Qual a descrição da categoria?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Insira uma descrição sobre a categoria!', whitespace: true }],
                })(<TextArea rows={4} />)}
              </Form.Item>
            </Row>
            
            {/* Submit Button */}
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Cadastrar categoria
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

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(CreateCategory);
 export default WrappedHorizontalLoginForm;