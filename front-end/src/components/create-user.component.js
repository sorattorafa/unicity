import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props); 
 
        this.onChangeCpf = this.onChangeCpf.bind(this);
        this.onChangeName = this.onChangeName.bind(this);  
        this.onChangeEmail = this.onChangeEmail.bind(this); 
        this.onChangePassword = this.onChangePassword.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            cpf: '',
            name: '',
            email: '',  
            password: '', 
            active: true
        }
    }
//    componentWillMount() {  
//       axios.get('/categories')
//            .then(res => console.log(res.data));    
//  }

    onChangeCpf(e) {
        this.setState({
            cpf: e.target.value
        });
    } 

    onChangeName(e) {
        this.setState({
            name: e.target.value
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


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`); 

        console.log(`User Cpf: ${this.state.cpf}`);
        console.log(`User Name: ${this.state.name}`);
        console.log(`User Email: ${this.state.email}`); 
        console.log(`User Password: ${this.state.password}`); 

        const newUser = { 
            cpf: this.state.cpf,
            name: this.state.name,
            email: this.state.email, 
            password: this.state.password,  
            // reports: this.state.reports, 
            // notifications: this.state.notifications, 
        }

        axios.post('/simpleusers/add', newUser)
            .then(res => console.log(res.data));

        this.setState({ 
            cpf:'',
            name: '',
            email: '', 
            password: '', 
            active: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Criar novo usuário</h3>
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <label>Cpf: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.cpf}
                                onChange={this.onChangeCpf}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input  type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                    </div> 

                    <div className="form-group">
                        <label>Password: </label>
                        <input  type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                />
                    </div>  
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}