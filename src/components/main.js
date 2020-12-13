import React, { useState, useEffect, useRef } from 'react';
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

  let [showDisplay, setShowDisplay] = useState(false)
  let [showPokemons, setShowPokemons] = useState(false)
  let [transitionPokedex, setTransitionPokedex] = useState(false)
  let [sourceRegions, setRegions] = useState(regions)
  let [showDirectlyAccess, setShowDirectlyAccess] = useState(true)
  let [showShowDirectlyAccess, setShowShowDirectlyAccess] = useState(true)
  let [showProfileOptions, setShowProfileOptions] = useState(false)
  let [showListFilteredPokemon, setShowListFilteredPokemon] = useState(false)
  const refProfileOptions = useRef()
  const history = useHistory()
  const { regionName } = useParams()

  // For para acceder a los detalles de cada pokemon para evitar la asincronia ya que el forEach no funciona con async await
  const asyncForEach = async(array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  
  // Metodo para acceder a los detalles de los pokemones, y a la vez tratando la asincronia
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

  const directlyAccessPathFn = () => {
    setShowDirectlyAccess(false)
    setShowShowDirectlyAccess(true)
  }

  const showDisplayFn = (value) => {
    if(showDisplay) {
      setShowDisplay(false)
      history.push("/pokedex")
    } else {
      if(value) {
          history.push("/pokedex/regions")
          setShowDisplay(true)
          setShowShowDirectlyAccess(false)
          setShowDirectlyAccess(false)
      } else {
          setShowShowDirectlyAccess(false)
          setTimeout(() => {
            history.push("/pokedex/regions")
            setShowDisplay(true)
          }, 1000)
      }
      
    }
    transitionPokedex ? setTransitionPokedex(false) : setTransitionPokedex(true)
  }

  // Le pasa el cualquier numero, lo valida y lo devuelve con dos ceros antes del numero si solo ponen uno si ponen dos numero devuelve solo un cero
  const imgPokemons = (value) => {
    if(value.toString().length === 1) {
      return `00${value}`
    } else if(value.toString().length === 2) {
      return `0${value}`
    } else {
      return value
    }
  }


  // ocultamos el detalle del profile y los pokemones buscados tocando en cualquier parte de la pantalla
  const showProfileOptionsAndPokemonsSearch = () => {

    if(showProfileOptions) {
      refProfileOptions.current.style.display = 'none'
      setShowProfileOptions(false)
    }

    if(showListFilteredPokemon) {
      const idFilteredPokemon = document.getElementById('filtered-pokemon')
      idFilteredPokemon.style.height = ''
      setShowListFilteredPokemon(false)
      
    }
}

const showProfileOptionsFn = () => {

  if(showProfileOptions) {
      refProfileOptions.current.style.display = 'none'
      setShowProfileOptions(false)
  } else {
      refProfileOptions.current.style.display = 'block'
      setShowProfileOptions(true)
  }
}



return (
  <div className="container-style-pokedex" onClick={showProfileOptionsAndPokemonsSearch}>
    <Switch>

      <Route path="/" exact>
        <LogIn />
      </Route>

      <Route path="/sign-in">
        <SignIn />
      </Route>
      
      <PrivateRoute path="/pokedex">
        <Pokedex 
          imgPokemonsFn={imgPokemons}
          showDisplayFn={showDisplayFn}
          transitionPokedex={transitionPokedex}
          sourceRegions={sourceRegions}
          showPokemons={showPokemons}
          getDetail={getDetail}
          showDirectlyAccess={showDirectlyAccess}
          showShowDirectlyAccess={showShowDirectlyAccess}
          directlyAccessPathFn={directlyAccessPathFn}
          showProfileOptionsFn={showProfileOptionsFn}
          refProfileOptions={refProfileOptions}
          showListFilteredPokemon={showListFilteredPokemon}
          setShowListFilteredPokemon={setShowListFilteredPokemon}
        />
      </PrivateRoute>
    </Switch>
  </div>
)

}


export default Main