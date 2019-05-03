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

        console.log(`User title: ${this.state.title}`);
        console.log(`User cep: ${this.state.cep}`);
        console.log(`User street: ${this.state.street}`); 
        console.log(`User number: ${this.state.number}`); 

        const newReport = { 
            title: this.state.title,
            cep: this.state.cep,
            street: this.state.street, 
            number: this.state.number,  
            description: this.state.description, 
            city: this.state.city,
            categories: this.state.categories 
        }

        axios.post('/simpleusers/add', newReport)
            .then(res => console.log(res.data));

        this.setState({ 
            title:'',
            cep: '',
            street: '', 
            number: '', 
            description: '',
            // status: '',
            city: '',
            categories: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionar relato</h3>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Título</Label>
                        <Input type="text" name="title" id="tile" placeholder="Título do relato" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Título</Label>
                        <Input type="text" name="title" id="tile" placeholder="Título do relato" />
                $$$$    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Radio Buttons</legend>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Option one is this and that—be sure to include why it's great
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Option two can be something else and selecting it will deselect option one
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Option three is disabled
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            Check me out
                        </Label>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}