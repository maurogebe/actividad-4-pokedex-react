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
    // let [authentication, setAuthentication] = useState(true)

    // Verificando si hay un usuario con sesion iniciada
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            // if(user) {
                setUser(user)
            // } else {
            //     setAuthentication(false)
            // }
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
                            Inicia Sesion <Link to="/">aqui</Link> para acceder a la Pokedex
                        </h1>
                    )
                }
            </Route>
        </>
    )
}