import React, { Component } from "react"; 
import "./styles.css"; 
import Main from "./components/GitHub/Main";
import Nav from "./components/Nav/Nav";

class App extends Component {

    constructor(props) {
        super(props); 
        this.State = {}; 
    }

    render() {
        return (
            <>
            <Nav/>
            <Main/>
            </>
        );
    }
}


export default App;