import React, { Component, Fragment } from "react";

class Repos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: []
        }

        //fetch 
        const fetchRepos = async (user) => {
            const API_Call = await fetch(`https://api.github.com/users/${user}/repos`);
            const data = await API_Call.json();
            return {data};
        }

        //initialize
        fetchRepos(props.user)
        .then((res) => {
            if (res.data.length > 0 && !res.data.message) {
                let items = []; 
                for (let i = 0; i < 5; i++) {
                    items.push(res.data[i]);
                    if (i === 4) {
                        this.setState({ repos: items });
                    }
                }
            }
        });
    }

    render() {
        return (
            <Fragment>
            <div>
            <div>
                <h3>Last 5 repo</h3>
                <div className="lastfiveRepo">

                    { this.state.repos.map( repo => {
                        return (
                            <div key={repo.id}>
                                <a 
                                key={repo.id} 
                                href={repo.html_url}>
                                {repo.name}
                                </a>                                
                            </div>
                        )
                    }) }

                </div>
                </div>

            </div>
            </Fragment>
        )
    }
}

export default Repos;