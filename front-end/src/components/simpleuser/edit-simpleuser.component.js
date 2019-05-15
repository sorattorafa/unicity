import React, {Component} from 'react';
import axios from 'axios'; 

export default class EditSimpleuser extends Component {

    constructor(props) {
        super(props);

        this.onChangeSimpleuserCpf = this.onChangeSimpleuserCpf.bind(this);
        this.onChangeSimpleuserName = this.onChangeSimpleuserName.bind(this);
        this.onChangeSimpleuserEmail = this.onChangeSimpleuserEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {   
        cpf: '',
        name: '',
        email: ''  
        }
    }

    componentDidMount() {
        axios.get('/simpleusers/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    cpf: response.data.cpf, 
                    name: response.data.name, 
                    email: response.data.email 
                    
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeSimpleuserCpf(e) {
        this.setState({
            cpf: e.target.value
        });
    }

    onChangeSimpleuserName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSimpleuserEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            cpf: this.state.cpf,
            name: this.state.name,
            email: this.state.email
        };
        axios.put('/simpleusers/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Cpf: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.cpf}
                                onChange={this.onChangeSimpleuserCpf}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeSimpleuserName}
                                />
                    </div> 

                    <div className="form-group">
                        <label>Email: </label>
                        <input  type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeSimpleuserEmail}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <input type="submit" value="Update Simple User" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}