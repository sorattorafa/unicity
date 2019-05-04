import React, {Component} from 'react';
import axios from 'axios'; 

export default class DeleteSimpleuser extends Component {

    constructor(props) {
        super(props);

        this.onChangeSimpleuserId = this.onChangeSimpleuserId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {   
        id: ''
        }
    }

    componentDidMount() {
        axios.get('/simpleusers/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.data.id
                    
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeSimpleuserId(e) {
        this.setState({
            id: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        axios.delete('/simpleusers/delete/'+this.props.match.params.id)
        //this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Delete selected User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="form-group">
                            <input type="submit" value="Delete Simple User" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}