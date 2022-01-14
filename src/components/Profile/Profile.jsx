import React, { Component, Fragment } from "react";
import axios from "axios"; 
// cofirm component 
import { confirm as confirmation } from "./Confirm";

// local connection
// const PORT = process.env.PORT || 4000; 
// const URL_backend = `http://localhost:${PORT}/api/users`;

//deploy to heroku 
const URL_backend = `https://my-ghub.herokuapp.com/api/users`


class Profile extends Component {

    mounted = false; 

    constructor(props) {
        super(props); 
        this.state = {
            id:"", 
            name: "", 
            email: "", 
            password:"",
            adress: "", 
            picture: "",
            isEdit: false, 
            file: "", 
            errors: ""
        };
    }
// GET USER DATA FROM DB 
    componentWillUnmount() { this.mounted = false; }

    componentWillMount() {
        this.mounted = true; 

        const token = localStorage.getItem("token"); 
        if(token) {
            axios.get(`${URL_backend}/getUserData`, {
                headers: { authorization: token }
            }).then((res) => {
                console.log(res);
                console.log("res data", res.data.result[0]);
                if(this.mounted) {
                    const { id, name, email, password, adress, picture } = res.data.result[0];
                    this.setState({
                        id: id,
                        name: name, 
                        email: email, 
                        password: password, 
                        adress: adress, 
                        picture: picture
                    });
                }
            });
        }
    }

    Picture = () => {
        const picState = this.state.picture;
        if(picState === "undifined" || picState === undefined || picState === null || picState === "" ) {
            return false;
        } else {
            return true; 
        }
    }

    EditUserData = () => {
        this.setState({
            isEdit: true
        });
    }

    // edit Profile 
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    __handleImageChange = (event) => {
        event.preventDefault(); 
        let reader = new FileReader(); 
        let file = event.target.files[0]; 

        reader.onload = () => {
            this.setState({
                file: file,
                picture: reader.result
            }); 
        }

        reader.readAsDataURL(file); 
    }

    saveUserData = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }); 
        this.setState({
            isEdit: false
        });

        const file = this.state.file;
        const postData = new FormData();

        postData.append("name", this.state.name);
        postData.append("adress", this.state.adress); 
        postData.append("picture", this.state.picture); 
        postData.append("image", file); 

        // http request
        axios.put(`${URL_backend}/edit/${this.state.id}`, postData)
            .then( res => {
                console.log(res);
            })
            .catch( err => console.log(err));
    }
    // end edit profil

    // Delete User 
    handleClickRemove = () => {
        confirmation({ password: "Enter your password to confirm "})
            .then(({ input }) => {
                this.setState({ password: input });
                this.requestToRemove(); 
            }, () => { this.setState({ password: "canceled"})
        });
    }    

    requestToRemove = () => {
       const reqPassword = this.state.password; 
       // http request 
       axios.delete(`${URL_backend}/delete/${this.state.id}/${reqPassword}`)
        .then((res) => {
            // console.log(res.data);
            this.props.LogOut();
        })
        .catch((err) => { this.wrongPassword(err)}) 
    }

    wrongPassword = () => {
        this.setState({ errors: "Password is not correct"});
    }
    // end of delete 

    render() {
        return (
            <Fragment>
                <center>
                    <section className="Specific">
                        <div className="main" id="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        { this.state.errors ?
                                            <i className="alert alert-danger" role="alert">
                                                { this.state.errors }
                                            </i> : ""
                                        }

                                        {
                                            this.state.isEdit ? 
                                            // edit user data 
                                            <div className="SUsersData">
                                                <h4><i className="bl">Edit Profile</i></h4>
                                                {
                                                    this.Picture() ? 
                                                    <img className="m-4" src={this.state.picture} alt="" /> :
                                                    <img className="m-4" src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt="" />
                                                }
                                                <div className="clear"></div>
                                                <div>
                                                    <label htmlFor="file-upload" className="custom-file-upload"> Upload profile picture </label>
                                                    <input id="file-upload" 
                                                        type="file"
                                                        onChange={this.__handleImageChange} 
                                                    />
                                                </div>
                                                <input type="text" 
                                                    name="name" 
                                                    placeholder="Name"
                                                    className="form-control m-2"
                                                    value={this.state.name ? this.state.name : " " }
                                                    onChange={this.onChange} 
                                                />
                                                <input type="text" 
                                                    name="email" 
                                                    placeholder="Email"
                                                    className="form-control m-2"
                                                    value={this.state.email}
                                                    onChange={this.onChange} 
                                                    disabled
                                                />
                                                <input type="text" 
                                                    name="adress" 
                                                    placeholder="Adress"
                                                    className="form-control m-2"
                                                    value={this.state.adress ? this.state.adress : " " }
                                                    onChange={this.onChange} 
                                                />  
                                                <button onClick={this.saveUserData} className="edit btn btn-danger m-4">
                                                    <i className="fas fa-edit"></i> Save changes
                                                </button>

                                            </div> 
                                            :
                                            // show user data 
                                            <div className="SUsersData">
                                                <button onClick={this.EditUserData} className="edit btn btn-warning m-4">
                                                <i className="fas fa-edit"></i> Edit</button>
                                                <h4><i className="bl">My Profile</i></h4>
                                                {
                                                    this.Picture() ? 
                                                    <img className="m-4" src={this.state.picture} alt="" /> :
                                                    <img className="m-4" src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt="" />
                                                }
                                                <h4>Name  :<i className="bl"> {this.state.name ? this.state.name : "" } </i>  </h4> 
                                                <h4>Email  :<i className="bl"> {this.state.email} </i> </h4>
                                                <h4>Adress  :<i className="bl"> { this.state.adress ? this.state.adress : ""} </i> </h4>
                                            </div> 
                                            // end           
                                        } 
                                        
                                        <div className="REMOVEU">
                                            <button 
                                                className="btn btn-danger m-2"
                                                onClick={ this.handleClickRemove }> 
                                                Delete Profile
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </center>
            </Fragment>
        )
    }
}

export default Profile; 
