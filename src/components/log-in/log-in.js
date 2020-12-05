import React, { useRef, useEffect } from 'react'
import firebase from '../../firebase/config'
import {
    Link,
    useHistory,
  } from "react-router-dom";

// Import Style
import './log-in.css'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


function LogIn(props) {

    let email = useRef()
    let password = useRef()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const historyPokedex = useHistory()

    // Cerrar sesion
    const cerrarSesion = () => {
        firebase.auth().signOut().then(function() {
            alert('Sesion Cerrada')
          }).catch(function(error) {

          });
          
    }

    // Iniciando sesion con google
    const showGooglePopup = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().signInWithPopup(googleProvider)
            console.log("Autenticado satisfactoriamente", result.user);
            props.setUserFn(result.user)
            historyPokedex.push('/pokedex')
        } catch (error) {
            console.log("Error en la autenticacion", error);
        }

    }

    // Iniciando Sesion con correo y contrasena
    const showSignInUserWithEmail = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().signInWithEmailAndPassword(email.current.value, password.current.value)
            console.log("Autenticado satisfactoriamente", result.user);
            historyPokedex.push('/pokedex')
        } catch (error) {
            alert('')
            console.log("Error en la autenticacion", error);
        };
    }

    return(
        <>
            <div className="contain-log-in">
                <h2 className="title-log">Log In</h2>
                <form onSubmit={showSignInUserWithEmail} className="form-log">
                    <label className="label-log" for="email">Enter your email</label>
                    <input ref={email} className="input-log" id="email" type="email" required />
                    <label className="label-log" for="password">Enter your password</label>
                    <input ref={password} className="input-log" id="password" type="password" minLength="8" required />
                    <input className="button-log" type="submit" />
                    <h4 className="text-log">OR</h4>
                    <button onClick={showGooglePopup} className="button-google-log">
                        <FontAwesomeIcon className="icon-google" icon={faGoogle} size="lg" /> Continue whit Google</button>
                    <p className="text-log text-log--position">
                    You are not a member? <Link to="/sign-in" className="link-log-to-sign">Sign In</Link>
                    </p>
                </form>
            </div>

            <button onClick={cerrarSesion}>Cerrar Sesion</button>
        </>
    )
}

export default LogIn