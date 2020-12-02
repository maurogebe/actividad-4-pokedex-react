import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route, 
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

// Import Components
import Pokedex from './pokedex/pokedex'
import LogIn from './log-in/log-in'
import PrivateRoute from './private-route/private-route'

// Import Sources
import { regions } from '../sources'

// Import style
import './main.css';

function Main() {

  let [pokemons, setPokemons] = useState([])
  let [detailsPokemon, setDetailsPokemons] = useState([])
  let [currentPage, setCurrentPage] = useState(1)
  let [showDisplay, setShowDisplay] = useState(false)
  let [showRegions, setShowRegions] = useState(false)  
  let [showPokemons, setShowPokemons] = useState(false)
  let [showDetailPerPokemon, setShowDetailPerPokemon] = useState(false)
  let [transitionPokedex, setTransitionPokedex] = useState(false)
  let [sourceRegions, setRegions] = useState(regions)
  let [detailPerPokemon, setDetailPerPokemon] = useState([])
  let [currentRegion, setCurrentRegion] = useState(0)
  let [showDirectlyAccess, setShowDirectlyAccess] = useState(true)
  let [showShowDirectlyAccess, setShowShowDirectlyAccess] = useState(true)
  let [user, setUser] = useState(false)
  const regionsHistory = useHistory()
  const pokemonDetailHistory = useHistory()
  const pokemonsHistory = useHistory()
  const { regionName } = useParams()
  // const location = useLocation()


  // useEffect(() => {
  //   const region = sourceRegions.findIndex((r) => regionName.toUpperCase() === r.name.toUpperCase()) 
  //   setCurrentRegion(region + 1)
  //   console.log(regionName)
  // }, [])


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

  const selectPokemonsFn = async(value, index) => {
    // let current = index + 1
    // setCurrentRegion(current)
    // setShowPokemons(true)
    // setShowRegions(false)
    // console.log(value)
  }

  const selectDetailPerPokemonFn = (pokemon, detail, img) => {
    const capitalize = (word) => {
      return word[0].toUpperCase() + word.slice(1);
    }
    let detailPokemonCopy = []
    detailPokemonCopy.push({name: capitalize(pokemon)}, detail, {urlImg: img})
    setDetailPerPokemon(detailPokemonCopy)
    setShowDetailPerPokemon(true)
    setShowPokemons(false)
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

const backPokemonDetailFn = () => {
  setShowDetailPerPokemon(false)
  setShowPokemons(true)
}


return (
  <div className="container-style-pokedex">
    <Switch>
      <Route path="/log-in">
        <LogIn
          setUserFn={setUser}
        />
      </Route>
      
      <PrivateRoute path="/pokedex" user={user} >
        <Pokedex 
          pokemons={pokemons}
          currentPage={currentPage}
          imgPokemonsFn={imgPokemons}
          detailsPokemon={detailsPokemon}
          showDisplay={showDisplay}
          showDisplayFn={showDisplayFn}
          transitionPokedex={transitionPokedex}
          sourceRegions={sourceRegions}
          showRegions={showRegions}
          showPokemons={showPokemons}
          showDetailPerPokemon={showDetailPerPokemon}
          selectPokemonsFn={selectPokemonsFn}
          selectDetailPerPokemonFn={selectDetailPerPokemonFn}
          detailPerPokemon={detailPerPokemon}
          currentRegion={currentRegion}
          backPokemonDetailFn={backPokemonDetailFn}
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