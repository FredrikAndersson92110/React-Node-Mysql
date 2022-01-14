import React, { Component, Fragment } from "react";
import axios from "axios";

import PropTypes from "prop-types"; 
import { connect } from "react-redux"; 
import { reUserState } from "../../store/actions"; 


class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            email: "", 
            password: "",
            errors: ""
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    Login = (event) => {
        event.preventDefault(); 
        this.setState({[event.target.name]: event.target.value});

        const data = {
            email: this.state.email, 
            password: this.state.password
        }

        axios.post(`${this.props.URL_backend}/login`, {data})
        .then((res) => {
            console.log(res);
            if (res["data"]) { // successfull login

                console.log(res["data"]);
                localStorage.setItem("token", res.data.token);
                this.props.reUserState(true); 

                this.props.props.history.push("/profile");
            }
            if (!res) { //failure 
                const err = res.data; 
                this.setState({ errors: err});
            }
        })
        .catch((err) => this.setState({ errors: "Username or password is wrong"}) );
    }

    

    render() {
        return (
            <Fragment>
                { this.state.errors ?
                <i className="alert alert-danger">
                    { this.state.errors }
                </i> :
                    ""
                }
                <hr />
                <form className="form-signin">
                    <h4 className="h3 mb-3 font-weight-normal grey">Sign In</h4>
                    <input value={ this.state.email } 
                        onChange={this.onChange} 
                        name="email" 
                        type="email"  
                        className="form-control" 
                        placeholder="Email address" 
                        />
                    <input value={ this.state.password } 
                        onChange={this.onChange} 
                        name="password" 
                        type="password"  
                        className="form-control" 
                        placeholder="Password" 
                        />
                    <button onClick={this.Login} className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </Fragment>
        )
    }
}

Login.propTypes = {
    reUserState: PropTypes.func.isRequired,
    Users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Users: state.Users
});


export default connect(mapStateToProps, { reUserState })(Login);