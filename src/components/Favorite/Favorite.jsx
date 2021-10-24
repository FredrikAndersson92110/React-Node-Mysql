import React, { Component } from "react";
import PropTypes from "prop-types"; 
import { connect } from "react-redux"; 
import { addToFavorites, deleteFromFavorites, getFavoriteState } from "../../store/actions"; 


class Favorite extends Component {
    constructor(props) {
        super(props); 
        this.state = { users:[] };
        this.props.getFavoriteState();
        this.data();

    }

    async data() {
        console.log(this.props);

        let data = await this.props.Favorite.favoritedata; 
        let bigData = []; 

        for (let i = 0; i < data.length; i++) {
            const user = data[i]; 
            const fetchUsers = async (user) => {
                const api_call = await fetch(`https://api.github.com/users/${user}`);
                const data = await api_call.json(); 
                return { data }
            }; 

            fetchUsers(user)
            .then((res) => {
                if (!res.data.message) {
                    res.data.is_user_in_Favorite = true; 
                    bigData.push(res.data); 
                    this.setState({ users: bigData });
                }
            })
        }
    }

    RemoveFromFavorite(user) {
        this.props.deleteFromFavorites(user); 

        let array = this.state.users; 
        let newArray = []; 

        for (let i = 0; i < array.length; i++) {
            const element = array[i]; 
            if (element.login === user) {
                element.is_user_in_Favorite = false; 
            }
            newArray.push(element);            
        }
        this.setState({users: newArray}); 
    }

    ReAddToFavorite(user) {
        this.props.addToFavorites(user); 

        let array = this.state.users; 
        let newArray = []; 

        for (let i = 0; i < array.length; i++) {
            const element    = array[i]; 
            if (element === user ) {
                element.is_user_in_Favorite = true; 
            }
            newArray.push(element); 
        }
    }

    goFetchOneUser(username) {
        this.props.history.push({
            pathname: `/Specific/${username}`
        });
    }

    render() {
        return (               
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">

                            { this.state.users.map((user) => (
                                <div key={user.id} className="col-md-4">
                                    <div key={user.id} className="card mb-4 shadow-sm">
                                        <img 
                                            className="bd-placeholder-img card-img-top" 
                                            width="100%" 
                                            src={user.avatar_url}
                                            alt=''  
                                        />
                                        <div className="card-body">
                                            <p className="card-text text-center">
                                            Name : {user.login}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => {
                                                            this.goFetchOneUser(user.login)
                                                        }}
                                                        key={user.id}
                                                        >View
                                                    </button>
                                                </div>

                                                { user.is_user_in_Favorite ?
                                                <button 
                                                    onClick={() => {
                                                        this.RemoveFromFavorite(user.login)
                                                    }} 
                                                    type="button" c
                                                    lassName="btn btn-sm ">
                                                        <i className="fas fa-heart Fave"></i>
                                                </button> :
                                                <button 
                                                    onClick={() => {
                                                        this.ReAddToFavorite(user.login)
                                                    }} 
                                                    type="button" c
                                                    lassName="btn btn-sm ">
                                                        <i className="fas fa-heart NotFave"></i>
                                                </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) )}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

Favorite.propTypes = {
    addToFavorites: PropTypes.func.isRequired,
    deleteFromFavorites: PropTypes.func.isRequired,
    getFavoriteState : PropTypes.func.isRequired,
    Favorite: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Favorite: state.Favorite
});

export default connect(mapStateToProps, { addToFavorites, deleteFromFavorites, getFavoriteState })(Favorite); 