import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from 'axios';

export default class CreateReport extends Component {

    constructor(props) {
        super(props); 
 
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCep = this.onChangeCep.bind(this);  
        this.onChangeStreet = this.onChangeStreet.bind(this); 
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCategories = this.onChangeCategories.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            title: '',
            cep: '',
            street: '',  
            number: '',
            description: '',
            // status: '',
            city: '',
            categories: ''
        }
    }
//    componentWillMount() {  
//       axios.get('/categories')
//            .then(res => console.log(res.data));    
//  }

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

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeCategories(e) {
        this.setState({
            categories: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`); 

        console.log(`Report title: ${this.state.title}`);
        console.log(`Report cep: ${this.state.cep}`);
        console.log(`Report street: ${this.state.street}`); 
        console.log(`Report number: ${this.state.number}`); 
        console.log(`Report description: ${this.state.description}`); 

        const newReport = { 
            title: this.state.title,
            cep: this.state.cep,
            street: this.state.street, 
            number: this.state.number,  
            description: this.state.description
            //city: this.state.city,
            //categories: this.state.categories 
        }

        axios.post('/simpleusers/add', newReport)
            .then(res => console.log(res.data));

        this.setState({ 
            title:'',
            cep: '',
            street: '', 
            number: '', 
            description: ''
            // status: '',
            //city: '',
            //categories: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionar relato</h3>
                <Form className="formRelato" onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">Título</Label>
                        <Input type="text" name="title" id="tile" placeholder="Título do relato" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">CEP</Label>
                        <Input type="text" name="cep" id="cep" placeholder="CEP" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Rua</Label>
                        <Input type="text" name="street" id="street" placeholder="Rua" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Número</Label>
                        <Input type="text" name="number" id="number" placeholder="Número" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Descrição</Label>
                        <Input type="textarea" name="descricao" id="descricao" />
                    </FormGroup>
                    
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}