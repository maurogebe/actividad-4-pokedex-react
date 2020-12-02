import React, { useState } from 'react'
import {
    Route,
  } from "react-router-dom";

// Import Style
import './private-route.css'


export default function PrivateRoute(props) {

    let [user, setUser] = useState(props.user)

    return (
        <>
            <Route path={props.path}>
                {user ? (
                    props.children
                ) : (
                    <h1>No tienes acceso</h1>
                )}
            </Route>
        </>
    )
}