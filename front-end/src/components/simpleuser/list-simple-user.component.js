import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Simpleuser = props => (
    <tr>
        <td className={props.simpleuser.simpleuser_completed ? 'completed' : ''}>{props.simpleuser.cpf}</td>
        <td className={props.simpleuser.simpleuser_completed ? 'completed' : ''}>{props.simpleuser.name}</td> 
        <td className={props.simpleuser.simpleuser_completed ? 'completed' : ''}>{props.simpleuser.email}</td> 
        <td>
            <Link to={"/edit/"+props.simpleuser._id}>Edit</Link> 
        </td> 
        <td>
            <Link to={"/delete/"+props.simpleuser._id}>Delete</Link> 
        </td>
    </tr>
)

export default class SimpleusersList extends Component {

    constructor(props) {
        super(props);
        this.state = {simpleusers: []};
    }
    componentDidMount() { 
        axios.get('/simpleusers')
            .then(response => {
                this.setState({simpleusers: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    simpleuserList() {
        return this.state.simpleusers.map(function(currentsimpleuser, i) {
            return <Simpleuser simpleuser={currentsimpleuser} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Lista de usuários simples</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Cpf</th>
                            <th>Name</th> 
                            <th>Email</th> 
                        </tr>
                    </thead>
                    <tbody>
                        { this.simpleuserList() }
                    </tbody>
                </table>
            </div>
        )
    }
}