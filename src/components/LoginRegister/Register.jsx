import React, { Component, Fragment } from "react";
import axios from "axios"; 

class Register extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            email: "",
            password: "",
            errors: ""
        };
    }

    onChange = (event) => { this.setState({ [event.target.name]: event.target.value })}

    Register = (event) => {
        event.preventDefault(); 
        this.setState({ [event.target.name]: event.target.value });

        const data = {
            name: this.state.name,
            password: this.state.password, 
            email: this.state.email
        }
        axios.post(`${this.props.URL_backend}/register`, { data })
        .then((res) => {
            const err = res.data.message;
            this.setState({ errors: err }); 
            if (!err) {
                alert("You did register succesfully!"); 
                console.log(this.state);
                const newEmail = this.state.email;
                const newPassword = this.state.password;
                this.setState({
                    email: newEmail,
                    password: newPassword
                });
            }
        })
        .catch((err) => { console.log(err);})
    }

    render() {
        return (
            <Fragment>
                { this.state.errors ? 
                <i className="alert alert-danger">
                    { this.state.errors }
                </i>: 
                ""}
                <hr />
                <form className="form-Reigester">
                    <h4 className="h3 mb-3 font-weight-normal grey">Register</h4>
                    <input value={ this.state.name } onChange={this.onChange} name="name" type="text" id="inputname" className="form-control" placeholder="Name" />
                    <input value={ this.state.email } onChange={this.onChange} name="email" type="email"  className="form-control" placeholder="Email address" />
                    <input value={ this.state.password } onChange={this.onChange} name="password" type="password"  className="form-control" placeholder="Password" />
                    <button onClick={ this.Register } className="btn btn-md btn-success btn-block" type="submit">Regester</button>
                </form>
            </Fragment>
        )
    }
}

export default Register;