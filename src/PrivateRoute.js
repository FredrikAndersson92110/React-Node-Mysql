import React from "react";
import { Route, Redirect } from "react-router-dom"; 

function PrivateRoute({ component: Component, Auth, LogOut, ...rest }) {
    return (
        <Route { ...rest } render={ props => 
        Auth ?
        <Component { ...props} LogOut= {LogOut}/>
        :
        <Redirect to="/LoginRegister" />
        } />
    )
}

export default PrivateRoute; 