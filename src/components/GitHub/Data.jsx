import React, { Component, Fragment } from "react"; 

class Data extends Component {
    constructor(props) {
        super(props); 
        //set user state
        this.state = { 
            users: []
        }; 
        // set method that fetch the api 
        const fetchUsers = async (user) => {
            const API_Call = await fetch(`https://api.github.com/search/users?q=${user}`);
            const data = await API_Call.json(); 
            return {data};
        }
        // initialize methon 
        fetchUsers(props.match.params.id)
        .then((res) => {
            this.setState({ users: res.data.items })
            console.log(res.data.items);
        }); 
    }
    // redirect when User Component Clicked
    getUser(clickedUser) {
        this.props.history.push({
            pathname: `/Specific/${clickedUser}`
        });

    }

    render() {
        return (
            <Fragment>
                <main role="main">
                    <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">                   
                        {/* Map through the user array  */}
                        { this.state.users.map( user => (
                            <div 
                            className="col-md-3 cp" 
                            key={ user.login }
                            onClick={() => {
                                this.getUser(user.login);
                            }}
                            >
                                <div className="card mb-4 shadow-sm">
                                    <img 
                                        className="bd-placeholder-img card-img-top" 
                                        width="100%" height="225" 
                                        src={user.avatar_url} 
                                        alt=''/>
                                    <div className="card-body">
                                        <p className="card-text text-center">
                                        Name : { user.login }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )) }

                    </div>
                    </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default Data; 
