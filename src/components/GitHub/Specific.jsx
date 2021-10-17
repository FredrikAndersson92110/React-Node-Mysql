import React, { Component, Fragment } from "react";
import Repos from "./Repos"; 

class Specific extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }; 
        
        const fetchUser = async (user) => {
            const API_Call = await fetch(`https://api.github.com/users/${user}`);
            const data = await API_Call.json();
            return {data}; 
        }
        // initialize method
        fetchUser(props.match.params.login)
        .then((res) => {
            if (!res.data.message) {
                this.setState({ user: res.data });
            }
        });
    }

    checkData() {
        if (this.state.user.login === 0) {
            return (<i>There us no user found with the name: {this.props.match.params.login}</i>)
        } else {
            return (
                <center>
                <section className="Specific">
                    <div className="main" id="main">
                    <div className="container">
                    <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="SUsersData">
                        <i className="fas fa-heart  NotFave"></i><h4>Name :<i className="bl">{this.state.user.name}</i></h4>
                        <img src={this.state.user.avatar_url} alt="" />
                        <h4>followers :<i className="bl"> {this.state.user.followers} </i>  </h4> 
                        <h4>location :<i className="bl"> {this.state.user.location} </i> </h4>

                        <Repos user={this.props.match.params.login}/>

                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </section>
                </center>
            )
        }
    }
    




    render() {
        return (
            <Fragment>
                {this.checkData()}
            </Fragment>
        )
    }
}

export default Specific;