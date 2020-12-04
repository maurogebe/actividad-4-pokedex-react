import React, { useRef } from 'react'
import firebase from '../../firebase/config'
import {
    Link,
    useHistory,
  } from "react-router-dom";

// Import Style
import './sign-in.css'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


function SignIn(props) {

    let email = useRef()
    let password = useRef()
    const googleProvider = new firebase.auth.GoogleAuthProvider
    // const emailProvider = new firebase.auth.EmailAuthProvider
    const historyPokedex = useHistory()

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

    const showCreateUserWithEmail = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().createUserWithEmailAndPassword(email.current.value, password.current.value)
            console.log("Autenticado satisfactoriamente", result.user);
            props.setUserFn(result.user)
            historyPokedex.push('/pokedex')
        } catch (error) {
            alert('')
            console.log("Error en la autenticacion", error);
            // console.log(email.current)
        }
    }

    return(
        <>
            <div className="contain-sign-in">
                <h2 className="title-sign">Sign In</h2>
                <form onSubmit={showCreateUserWithEmail} className="form-sign">
                    <label className="label-sign" for="email">Enter your email</label>
                    <input ref={email} className="input-sign" id="email" type="email" required/>
                    <label className="label-sign" for="password">Create a password</label>
                    <input ref={password} className="input-sign" id="password" type="password" minLength="8" required/>
                    <input className="button-sign" type="submit" />
                    <h4 className="text-sign">OR</h4>
                    <button onClick={showGooglePopup} className="button-google-sign">
                        <FontAwesomeIcon className="icon-google" icon={faGoogle} size="lg" /> Continue whit Google  
                    </button>
                    <p className="text-sign text-sign--position">
                    You are already a member? <Link to="/log-in" className="link-sign-to-log">Log In</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default SignIn