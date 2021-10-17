import React, { useState, Component } from "react"; 


// function Main() {

//     const [checkbox, setCheckbox] = useState(false);
//     console.log("state", checkbox);
//     function handleChange() {
//         setCheckbox(() => !checkbox); 
//     }

//     return (
//         <section className="mainPage">
//             <center>
//                 <div className="main" id="main">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-12 col-md-12">
//                                 <div className="main__text-container">
//                                     <img src="images\Octocat.png" alt="gihub logo" width="200" />
//                                     <h1 className="main__title">
//                                         GitFetch - Profile Finder for GitHub
//                                     </h1>
//                                     <p className="main__subtitle">
//                                         Check out the repos, followers and more, just by entering a username!
//                                     </p>
//                                 </div>
//                                 <div className="container">
//                                     <div className="check">
//                                         <input 
//                                             className="" 
//                                             type="checkbox" 
//                                             name="checked" 
//                                             value={checkbox}
//                                             onChange={handleChange} 
//                                         />
//                                         Go Direct to The user Profile
//                                     </div>
//                                         <input type="text" id="search" name="Data" className="btn btn-outline-primary" placeholder="Enter a username..." value="" />
//                                         <span>
//                                             <button className="btn btn-outline-primary">Search</button>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                     </div>
//                 </div>
//             </center>
//         </section>
//     )
// }



class Main extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            data: "", 
            checked: false
        }
    }
    

    handleChange = () => {  
        this.setState(() => ({
            checked: !this.state.checked
        }));   
        console.log(this.state.checked);     
    }

    search = () => {
        console.log(this.state.data);
        if (this.state.data === "") return alert("You need to type a username to search");

        if(this.state.checked) {
            // localhost:3000/Specific/Fredrik
        } else {
            // localhost:3000/Data/Fredrik
        }
    }

    render() {
        return (
            <section className="mainPage">
                <center>
                    <div className="main" id="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="main__text-container">
                                        <img src="images\Octocat.png" alt="gihub logo" width="200" />
                                        <h1 className="main__title">
                                            GitFetch - Profile Finder for GitHub
                                        </h1>
                                        <p className="main__subtitle">
                                            Check out the repos, followers and more, just by entering a username!
                                        </p>
                                    </div>
                                    <div className="container">
                                        <div className="check">
                                            <input 
                                                className="mr-2" 
                                                type="checkbox" 
                                                name="checked"
                                                onChange={this.handleChange} 
                                                value={this.state.checked} 
                                            />
                                             Go Direct to The user Profile
                                        </div>
                                            <input 
                                                type="text" 
                                                id="search" 
                                                name="data" 
                                                className="btn btn-outline-primary" 
                                                placeholder={this.state.checked ? "Go to the user profile" : "Enter user name..."} 
                                                value={this.state.data}
                                                onChange={(event) => {this.setState({[event.target.name]: event.target.value})}}
                                            />
                                            <span>
                                                <button 
                                                    className="btn btn-outline-primary"
                                                    onClick={this.search}
                                                >Search
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </center>
            </section>
        );
    }
}


export default Main;