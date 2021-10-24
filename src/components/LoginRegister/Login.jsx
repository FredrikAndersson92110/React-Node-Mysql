import React, { Component, Fragment } from "react";

class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <form className="form-signin">
                    <h4 className="h3 mb-3 font-weight-normal grey">Sign In</h4>
                    <input name="email" type="email"  className="form-control" placeholder="Email address" />
                    <input name="password" type="password"  className="form-control" placeholder="Password" />
                    <button className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </Fragment>
        )
    }
}

export default Login;