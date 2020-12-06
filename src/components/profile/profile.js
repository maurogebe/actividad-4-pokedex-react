import React, { useState, useEffect, useRef } from 'react'
import firebase from '../../firebase/config'
import {
    useHistory,
  } from "react-router-dom";

// Import Style
import './profile.css'


export default function Profile() {

    let [showProfileOptions, setShowProfileOptions] = useState(false)
    let [user, setUser] = useState(false)
    const refProfileOptions = useRef()
    const history = useHistory()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
          setUser(user)
        });
      }, [])

    const showProfileOptionsFn = () => {

        if(showProfileOptions) {
            refProfileOptions.current.style.display = 'none'
            setShowProfileOptions(false)
        } else {
            refProfileOptions.current.style.display = 'block'
            setShowProfileOptions(true)
            console.log(user)
        }
    }

    // Cerrar sesion
    const signOut = () => {
        firebase.auth().signOut().then(function() {
            alert('Sesion Cerrada')
            history.push('/')
          }).catch(function(error) {

          });
          
    }

    return (

        <>
            <nav className="nav-profile">
                <img onClick={showProfileOptionsFn} className="img-profile" src={user.photoURL} alt="" />
                <div ref={refProfileOptions} className="profile-options">
                    <div className="profile-card">
                        <img className="img-options-profile" src={user.photoURL} alt="" />
                        <h3 className="profile-name">{user.displayName}</h3>
                        <h4 className="profile-email">{user.email}</h4>
                        <button onClick={signOut} className="profile-sign-out">Sign Out</button>
                    </div>
                </div>
            </nav>
        </>
    )
}