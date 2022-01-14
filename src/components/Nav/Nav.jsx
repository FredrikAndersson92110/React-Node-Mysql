import React, { Component } from "react"; 
import {Link} from "react-router-dom";

class Nav extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isAuthenticated: false
        }; 
    }

    async componentDidMount() {
        await this.props.store.subscribe(() => {
            this.setState({
                isAuthenticated: this.props.store.getState()["Users"]["isAuthenticated"]
            });
        });
    }

    logOut = () => {
        this.props.logOut(); 
    }

    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="navTitle my-0 mr-md-auto font-weight-normal"><a href="/">React With Node</a></h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link to="/Favorite" className="navLink p-2 text-dark">
                    <i className="fas fa-heart"></i> Favorites                    
                    </Link>       
                </nav>
                { this.state.isAuthenticated ?
                    <Link to="/profile" className="navLink p-2 text-dark">
                        <i className="fas fa-user"></i> Profile
                    </Link> : ""
                }

                { this.state.isAuthenticated ?
                <button onClick={this.logOut} className="btn btn-outline-danger p-2 ml-4">
                    Logout
                </button> :
                <Link to="/LoginRegister" className="p-2 text-dark">
                    <button className="btn btn-outline-primary" href="/login">Sign up</button>
                </Link>
                }

            </div>
        )
    }
}

export default Nav;