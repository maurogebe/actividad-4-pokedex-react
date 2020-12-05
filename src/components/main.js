import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route, 
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import firebase from '../firebase/config'

// Import Components
import Pokedex from './pokedex/pokedex'
import LogIn from './log-in/log-in'
import SignIn from './sign-in/sign-in'
import PrivateRoute from './private-route/private-route'

// Import Sources
import { regions } from '../sources'

// Import style
import './main.css';

function Main() {

  let [pokemons, setPokemons] = useState([])
  let [showDisplay, setShowDisplay] = useState(false)
  let [showRegions, setShowRegions] = useState(false)  
  let [showPokemons, setShowPokemons] = useState(false)
  let [transitionPokedex, setTransitionPokedex] = useState(false)
  let [sourceRegions, setRegions] = useState(regions)
  let [showDirectlyAccess, setShowDirectlyAccess] = useState(true)
  let [showShowDirectlyAccess, setShowShowDirectlyAccess] = useState(true)
  let [user, setUser] = useState(false)
  const regionsHistory = useHistory()
  const pokemonDetailHistory = useHistory()
  const pokemonsHistory = useHistory()
  const { regionName } = useParams()

  // For para acceder a los detalles de cada pokemon para evitar la asincronia ya que el forEach no funciona con async await
  const asyncForEach = async(array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  
  const getDetail = async(arregloPokemones) => {
    let tempArrayDetail = [];
    return new Promise(async (resolve, reject) => {
      try{
        await asyncForEach(arregloPokemones, async(pokemon) => {
          let response = await fetch(pokemon.url);
          let data = await response.json();
          let results = data;
          tempArrayDetail.push(results);
        });
        resolve(tempArrayDetail);
      }catch(error){
        reject(error);
      }
    })
  }

  const showDisplayFn = (value) => {
    if(showDisplay) {
      setShowDisplay(false)
      regionsHistory.push("/pokedex")
    } else {
      if(value) {
          regionsHistory.push("/pokedex/regions")
          setShowDisplay(true)
          setShowShowDirectlyAccess(false)
          setShowDirectlyAccess(false)
      } else {
          setShowShowDirectlyAccess(false)
          setTimeout(() => {
            regionsHistory.push("/pokedex/regions")
            setShowDisplay(true)
          }, 1000)
      }
      
    }
    transitionPokedex ? setTransitionPokedex(false) : setTransitionPokedex(true)
  }

  const directlyAccessPathFn = () => {
    setShowDirectlyAccess(false)
    setShowShowDirectlyAccess(true)
  }

const imgPokemons = (value) => {
  if(value.toString().length === 1) {
    return `00${value}`
  } else if(value.toString().length === 2) {
    return `0${value}`
  } else {
    return value
  }
}

// const backPokemonDetailFn = () => {
//   setShowDetailPerPokemon(false)
//   setShowPokemons(true)
// }


return (
  <div className="container-style-pokedex">
    <Switch>
      <Route path="/log-in">
        <LogIn
          setUserFn={setUser}
        />
      </Route>

      <Route path="/sign-in">
        <SignIn 
          setUserFn={setUser}
        />
      </Route>
      
      <PrivateRoute path="/pokedex" user={user} >
        <Pokedex 
          pokemons={pokemons}
          imgPokemonsFn={imgPokemons}
          showDisplay={showDisplay}
          showDisplayFn={showDisplayFn}
          transitionPokedex={transitionPokedex}
          sourceRegions={sourceRegions}
          showRegions={showRegions}
          showPokemons={showPokemons}
          getDetail={getDetail}
          showDirectlyAccess={showDirectlyAccess}
          directlyAccessPathFn={directlyAccessPathFn}
          showShowDirectlyAccess={showShowDirectlyAccess}
        />
      </PrivateRoute>
    </Switch>
  </div>
)

}


export default Main