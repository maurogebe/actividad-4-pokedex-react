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
    
    // const user = firebase.auth().currentUser;
    // const historyLogin = useHistory()

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       // User is signed in.
    //       setUser(user)
    //       console.log(user)
    //     } else {
    //       // No user is signed in.
    //     }
    //   });

    useEffect(() => {
        // const actualizandoUser = async() => {
        //     const userAuth = await firebase.auth().currentUser
        //     setUser(userAuth)
        // }
        // actualizandoUser()
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            setUser(user)
            setShowDisplayAuth(true)
        });
        setTimeout(() => {
            
            console.log(user)
        },5000)
    }, [])

    // const userAuth = () => {
    //     // const authUser = async() => {
            
    //     //     return setUser(userState)
    //     // }
        
    //     if (user) {
    //         // User is signed in.
    //         // setShowDisplayAuth(true)
    //         return props.children
    //         console.log(user)
    //     } else {
    //         // No user is signed in.
    //         console.log(user)
    //         // setShowDisplayAuth(true)
    //         return (<h1>
    //                     Inicia Sesion <Link to="/log-in">aqui</Link> para acceder a la Pokedex
    //                 </h1>)

    //     }
    //     // console.log('gof')
    // }
      

// if (user) {
//   // User is signed in.
// } else {
//   // No user is signed in.
// }

    return (
        <>
            <Route path={props.path} exact={props.exact}>
                {
                    // showDisplayAuth ? (
                        user ? (
                            props.children
                        ) : (
                            <h1>
                                Inicia Sesion <Link to="/log-in">aqui</Link> para acceder a la Pokedex
                            </h1>
                        )
                    // ) : (
                    //     <h1>Esperando...</h1>
                    // )
                    
                //    user ? (
                //         props.children
                //     ) : (
                //         <h1>
                //             Inicia Sesion <Link to="/log-in">aqui</Link> para acceder a la Pokedex
                //         </h1>
                //     )
                }
            </Route>
        </>
    )
}