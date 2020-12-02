import React from 'react'
import firebase from '../../firebase/config'
import {
    useHistory,
  } from "react-router-dom";

// Import Style
import './log-in.css'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


function LogIn(props) {

    const googleProvider = new firebase.auth.GoogleAuthProvider
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

    return(
        <>
            <div className="contain-log-in">
                <h2 className="title-log">Log In</h2>
                <form className="form-log">
                    <label for="email"></label>
                    <input className="input-log" id="email" type="email" />
                    <label for="password"></label>
                    <input className="input-log" id="password" type="password" />
                    <input className="button-log" type="submit" />
                    <h4 className="text-log">OR</h4>
                    <button onClick={showGooglePopup} className="button-google">
                        <FontAwesomeIcon className="icon-google" icon={faGoogle} size="lg" /> Continue whit Google</button>
                    <p className="text-log">
                    You are not a member? <a href="">Register</a>
                    </p>
                </form>
            </div>
        </>
    )
}

export default LogIn