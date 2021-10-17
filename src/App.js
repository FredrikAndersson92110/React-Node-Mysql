import React, { Component } from "react"; 
import "./styles.css"; 
import Main from "./components/GitHub/Main";
import Nav from "./components/Nav/Nav";
import Specific from "./components/GitHub/Specific";
import Data from "./components/GitHub/Data"; 

import { BrowserRouter as Router, Route } from "react-router-dom"; 
import { Provider } from 'react-redux'; 

//Store Redux
import { createStore } from "redux"; 
import rootReducer from "./store/reducers";


class App extends Component {

    constructor(props) {
        super(props); 
        this.State = {}; 

        // Create store
        this.store = createStore(
            rootReducer, 
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );

    }


    render() {
        return (
            <>
            <Provider store={this.store} />
            <Nav store={this.store} />
            <Router>
                <Route exact path="/" component={Main} />
                <Route exact path="/Data/:id" component={Data} />
                <Route exact path="/Specific/:login" component={Specific} />
            </Router>
            </>
        );
    }
}


export default App;