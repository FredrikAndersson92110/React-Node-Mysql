import React, { Component, Fragment } from "react"; 
import "./styles.css"; 
import Main from "./components/GitHub/Main";
import Nav from "./components/Nav/Nav";
import Specific from "./components/GitHub/Specific";
import Data from "./components/GitHub/Data";  
import Favorite from "./components/Favorite/Favorite";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Profile from "./components/Profile/Profile";
// Private Route 
import PrivateRoute from "./PrivateRoute"; 

import { BrowserRouter as Router, Route } from "react-router-dom"; 
import { Provider } from 'react-redux'; 
// Action 
import { reUserState } from "./store/actions";

//Store Redux
import { createStore } from "redux"; 
import rootReducer from "./store/reducers";
//


class App extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            isAuthenticated: false, 
        }; 

        // Create store
        this.store = createStore(
            rootReducer, 
            window.__REDUX_DEVTOOLS_EXTENSION__ && 
            window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    }

    // check if User is Authnticated
    async componentDidMount() {
        if (localStorage.getItem("token")) { // user auth 
            this.store.dispatch(reUserState(true));
            this.setState({ isAuthenticated: true }); 
        } else { // not Auth 
            this.store.dispatch(reUserState(false)); 
            this.setState({ isAuthenticated: false });
        }
        await this.store.subscribe(() => {
            this.setState({ isAuthenticated: this.store.getState()["Users"]["isAuthenticated"]}); 
        })
    }

    logOut = () => {
        localStorage.removeItem("token");
        this.store.dispatch(reUserState(false));
        this.setState({ isAuthenticated: false })
    }

    render() {
        return (
            <Fragment>
                <Provider store={this.store}>
                    <Router>
                        <Nav logOut={this.logOut} store={this.store} />
                        <Route exact path="/" component={Main} />
                        <Route exact path="/Data/:id" component={Data} />
                        <Route exact path="/Specific/:login" component={Specific} />
                        <Route exact path="/Favorite" component={ Favorite} />
                        <Route exact path="/LoginRegister" component={ LoginRegister } />
                        <PrivateRoute 
                            exact path="/profile" 
                            LogOut={ this.logOut } 
                            Auth={ this.state.isAuthenticated }
                            component={ Profile } 
                        />
                    </Router>
                </Provider>
            </Fragment>
        );
    }
}


export default App;















// let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// function App() {
//     return (
//         <Fragment>
//             <Provider store={store}>
//                 <Router>
//                     <Nav store={store} />
//                     <Route exact path="/" component={Main} />
//                     <Route exact path="/Data/:id" component={Data} />
//                     <Route exact path="/Specific/:login" component={Specific} />
//                 </Router>
//             </Provider>
//         </Fragment>
//     );
// }
