import React, { Component, Fragment } from "react";
import Repos from "./Repos"; 
import PropTypes from "prop-types"; 
import {connect} from "react-redux"; 
import { addToFavorites, deleteFromFavorites, getFavoriteState} from "../../store/actions";

class Specific extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isFavorite: false
        }; 

        //get State
        this.props.getFavoriteState(); 
        
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
            console.log(res);
        });
    }

    async componentDidMount() {
        console.log(this.props.Favorite.favoritedata);
        let data = this.props.Favorite.favoritedata;
        let theUser = this.props.match.params.login; 

        for (let i = 0; i < data.length; i++) {
            const element = data[i]; 
            if (element === theUser) {
                this.setState({isFavorite: true}); 
            }
        }
    }

    addToFav = () => {
        this.props.addToFavorites(this.state.user.login); 
        this.setState({isFavorite: true});
    }

    removeFav = () => {
        this.props.deleteFromFavorites(this.state.user.login); 
        this.setState({isFavorite: false});
    }

    checkData() {
        if (this.state.user.length === 0) {
            return (<i>There us no user found with this username</i>)
        } else {
            return (
                <center>
                <section className="Specific">
                    <div className="main" id="main">
                    <div className="container">
                    <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="SUsersData">
                        
                        {
                            this.state.isFavorite  === false ?
                            <i onClick={this.addToFav} 
                            className="fas fa-heart NotFave">
                            </i> :
                            <i onClick={this.removeFav} 
                            className="fas fa-heart Fave">
                            </i>
                        }

                        <h4>Name :<i className="bl">{this.state.user.name}</i></h4>
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
        );
    }
}


Specific.propTypes = {
    addToFavorites: PropTypes.func.isRequired,
    deleteFromFavorites: PropTypes.func.isRequired,
    getFavoriteState: PropTypes.func.isRequired,
    Favorite: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
    Favorite: state.Favorite
}); 

export default connect(mapStateToProps, { 
    addToFavorites, deleteFromFavorites, getFavoriteState })(Specific);