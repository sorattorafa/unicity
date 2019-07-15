import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip, Select, notification } from 'antd';
import React from 'react';
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
// import "./index.css";
import axios from 'axios';

import NavBar from '../../components/navbar/navbar';
import LateralMenu from '../../components/lateralmenu/lateralmenu';
import { getToken, getStatus, getUserId } from '../services/auth';

const TextArea = Input.TextArea;
const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

// Return errors in fields
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditReport extends React.Component {

    constructor(props) {
        super(props); 
    
        this.onChangeStatusreport = this.onChangeStatusreport.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        const iduser = getUserId(); 
        this.state = {
          statusreport: '', 
          report:[],
          
          active: true, 
          id: '',
          visibility: true,
          status: getStatus(),           // 0: simpleuser; 1: companyuser; 2: admin
          // status: '2'                 // 0: simpleuser; 1: companyuser; 2: admin

          author: getUserId,
          comment_report: '',
          content: '',
          comment_status: ''

        }

        if (this.state.status === '1') {
          this.state.visibility = false;
        }

    }

    componentWillMount(){ 
        console.log(getUserId())
    //  componentDidMount() {
    //  console.log(this.props.match.params);
        axios.get('/reports/' + this.props.match.params.id)
        .then(response => {
            this.props.form.setFieldsValue({
                statusreport: response.data.status,
            });
            this.setState({
                id: this.props.match.params.id, 
                report: response.data    
            }); 
            console.log(this.state.report);
        });

    }

    onChangeStatusreport(e) {
        this.setState({
            statusreport: e.target.value,
            comment_status: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }
    
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                values.solver = getUserId()
                values.author = getUserId()
                values.comment = this.state.id        
                axios.post('/comments/add', values)
                axios.put('/reports/' + this.state.id , values)
                    .then(res => {
                      // console.log(res.data);
                      // console.log("Status: " + res.status);

                      // Exibe notificação de sucesso
                     // if(res.status === 200) {
                        notification['success']({
                          message: 'Sucesso!',
                          description: 'Relato atualizada!'
                        });
                        console.log('Relato atualizado com sucesso');
                        // Atualiza página
                        let id_report = this.state.id;
                        this.setState({ nav: '/viewreport/' + id_report }); 
                        //window.location.replace("http://localhost:3000/viewreport/"+id_report);
                     // }   

                    });
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

        const statusError = isFieldTouched('statusreport') && getFieldError('statusreport');
        const contentError = isFieldTouched('content') && getFieldError('content');

        // Controla página exibida - Ao atualizar, muda de página
        if(this.state.nav)
            return <Redirect to = { this.state.nav } />
        // Só exibe se estiver logado
        else if(getToken())
        // else if(getToken() && getStatus() === '2')
            return (
                <Layout style = {{ minHeight: '100vh' }}>
                    <NavBar />

                    <Layout>
                        <LateralMenu pagina = "listreport" />
          
                        <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Title className = "titleForm" level={1}> Relato </Title>
                                <Divider className = "dividerForm" />
                                {/* report status */}
                                <Row>
                                    <Col span={16}>
                                        <Form.Item
                                            validateStatus={statusError ? 'error' : ''} help={statusError || ''}
                                            label={
                                                <span>
                                                    Status&nbsp;
                                                    <Tooltip title="Qual é o status do relato?">
                                                    <Icon type="question-circle-o" />
                                                    </Tooltip>
                                                </span>
                                            }
                                        >
                                            {getFieldDecorator('status', {
                                                rules: [ {required: true}, {message: 'Insira o status!' }],
                                                initialValue: this.state.report.status,
                                            })(<Select>
                                                    <Option value="0">Aberto</Option>
                                                    <Option value="1">Em andamento</Option>
                                                    <Option value="2">Resolvido</Option>
                                                </Select>,<Input disabled={this.state.visibility}  />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* Edit Content */}
                                <Row>
                                    <Col span={16}>
                                        <Form.Item
                                            validateStatus={contentError ? 'error' : ''} help={contentError || ''}
                                            label={
                                            <span>
                                                Comentário&nbsp;
                                                <Tooltip title="Escreva o motivo da alteração do status.">
                                                <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                            }
                                        >
                                            {getFieldDecorator('content', {
                                                rules: [{ required: true, message: 'Justificativa obirgatória para alteração de status!', whitespace: true }],
                                            })(<TextArea rows={4} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* Submit Button */}
                                    <Row className="buttonForm">
                                        <Col span={16} style={{ textAlign: 'right' }}>
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

const WrappedReportForm = Form.create({ name: 'horizontal_reportform' })(EditReport);
 export default WrappedReportForm;