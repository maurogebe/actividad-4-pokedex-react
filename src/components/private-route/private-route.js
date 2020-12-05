import React, { useState, useEffect } from 'react'
import {
    Route,
    Link
    // useHistory
  } from "react-router-dom";
  import firebase from '../../firebase/config'
  

// Import Style
import './private-route.css'


export default function PrivateRoute(props) {

    let [user, setUser] = useState({})
    let [showDisplayAuth, setShowDisplayAuth] = useState(false)

    // Verificando si hay un usuario con sesion iniciada
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            setUser(user)
            setShowDisplayAuth(true)
        });
    }, [])

    return (
        <>
            <Route path={props.path} exact={props.exact}>
                {
                    user ? (
                        props.children
                    ) : (
                        <h1>
                            Inicia Sesion <Link to="/log-in">aqui</Link> para acceder a la Pokedex
                        </h1>
                    )
                }
            </Route>
        </>
    )
}