import React, { Component, Fragment } from "react";
import Login from "./Login";
import Register from "./Register";

// const PORT = process.env.PORT || 4000; 
// const URL_backend = `http://localhost:${PORT}/api/users`;

// deploy to heroku 
const URL_backend = `https://my-ghub.herokuapp.com/api/users`

class LoginRegister extends Component {
    state = {}
    
    render() {
        return (
            <Fragment>
                <center>
                    <section className="Specific">
                        <div className="main" id="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <Login props={this.props} URL_backend={URL_backend} />
                                        <hr />
                                        <Register props={this.props} URL_backend={URL_backend} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </center>
            </Fragment>
        ); 
    }
}

export default LoginRegister; 
