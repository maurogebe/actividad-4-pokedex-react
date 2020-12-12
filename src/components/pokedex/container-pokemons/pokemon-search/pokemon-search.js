import React, { useState, useRef } from 'react';
import {
   Link,
  } from "react-router-dom";

// Import style
import './pokemon-search.css';

// Import Icons
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

//  Import Material UI
import { Skeleton } from '@material-ui/lab'

function PokemonSearch(props) {

  let [listSearchPokemon, setListSearchPokemon] = useState([])
  let [listSearchPokemonDetail, setListSearchPokemonDetail] = useState([])
  let [valueSearchInput, setValueSearchInput] = useState('')
  let [onlyRequestSearch, setOnlyRequestSearch] = useState(true)
  let [showSearchSkeleton, setShowSearchSkeleton] = useState(false)

  const refPokemonSearch = useRef()
  let refListFilteredPokemon = useRef()


  // Cuando haga clic en el input para hacer uns busqueda, va a hacer una peticion de todos los pokemones, con sus detalles para mostrar las opciones mientras va escribiendo
  const requestSearchPokemon = async() => {
    
    if(onlyRequestSearch) {
      const url = 'https://pokeapi.co/api/v2/pokemon'
      let response = await fetch(`${url}?limit=893&offset=0`);
      let data = await response.json();
      let results = data.results;
      let details = await props.getDetail(results)
      setListSearchPokemonDetail(details)
      setListSearchPokemon(results)
      setOnlyRequestSearch(false)
    }
  }


  // Capturamos el valor de input con onChange
  const catchValueSearchInput = (event) => {
    setValueSearchInput(event.target.value)
    if(event.target.value === '') {
      refListFilteredPokemon.current.style.height = ""
    } else {
        setShowSearchSkeleton(true)
    }
  }


  // Conseguimos las imagenes de cada pokemon filtrado
  const getImgPokemon = (pokemon) => {
    const detailPerPokemon = listSearchPokemonDetail.find( poke => pokemon === poke.name)
    return detailPerPokemon.sprites.other['official-artwork'].front_default
  }

  // Consiguiendo el valor de la region segun su id para agregarlo en la ruta
  const getRegionPokemonRoute = (pokemon) => {
    const detailPerPokemon = listSearchPokemonDetail.find( poke => pokemon === poke.name)
      if((detailPerPokemon.id) <= 151) {
        const regionRoute = `kanto`
        return regionRoute
      } else if((detailPerPokemon.id) <= 251) {
          const regionRoute = `johto`
          return regionRoute
      } else if((detailPerPokemon.id) <= 386) {
          const regionRoute = `hoenn`
          return regionRoute
      } else if((detailPerPokemon.id) <= 493) {
          const regionRoute = `sinnoh`
          return regionRoute
      } else if((detailPerPokemon.id) <= 649) {
          const regionRoute = `tecelia`
          return regionRoute
      } else if((detailPerPokemon.id) <= 721) {
          const regionRoute = `kalos`
          return regionRoute
      } else if((detailPerPokemon.id) <= 809) {
          const regionRoute = `alola`
          return regionRoute
      } else {
          const regionRoute = `galar`
          return regionRoute
      }
  }


  // Accediendo a los tipos para agregar un hover dependiendo del tipo
  const getTypePokemonHover = (pokemon) => {
    const detailPerPokemon = listSearchPokemonDetail.find( poke => pokemon === poke.name)
    return `filtered-type-${detailPerPokemon.types[0].type.name}`
  }


  // Devolviendo el valor con la primera mayuscula
  const firstLetterMayus = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  // Cambiando imagen por si hay error
  const changeImgForError = (pokemon) => {
    const detailPerPokemon = listSearchPokemonDetail.find( poke => pokemon === poke.name)
    return detailPerPokemon.sprites.other.dream_world.front_default
  }


  return (
    <>
      <div className="search">
        <Link to={{
            pathname: `/pokedex/regions`
        }}>
            <ArrowBackIos className="icon-back-ios-regions" fontSize="large" />
        </Link>
        <div className="container-pokemon-search">
          <form className="form-pokemon-search">
            <input onClick={() => requestSearchPokemon()} onChange={catchValueSearchInput} className="pokemon-search" ref={refPokemonSearch} type="text" placeholder="Search Pokemon"/>
            <button className="button-pokemon-search" type="submit">
              <ArrowForwardIos className="icon-submit-pokemon-search" fontSize="small" />
            </button>
          </form>
          <div ref={refListFilteredPokemon} className="filtered-pokemon-search">
            {
              // Filtramos los pokemones segun vamos buscando
              listSearchPokemonDetail.length != 0 ? (
                listSearchPokemon
                .filter( pokemon => {
                  if(valueSearchInput === '') {
                    return null
                  } else {
                    return (
                      pokemon.name
                        .toLowerCase()
                        .includes(
                          valueSearchInput
                            .toLowerCase()
                        )
                    )
                  }
                })
                .map( (poke, index) => {
                  if(index > 5) {
                    refListFilteredPokemon.current.style.height = "40vh"
                  } else {
                    refListFilteredPokemon.current.style.height = ""
                  }
                  return (
                    <Link className="filtered-pokemon-link" to={`/pokedex/regions/${getRegionPokemonRoute(poke.name)}/${poke.name}`}>
                      <div className={`filtered-pokemon-option ${getTypePokemonHover(poke.name)}`}>
                        <img className="filtered-pokemon-img" src={getImgPokemon(poke.name)} onError={changeImgForError(poke.name)} />
                        <h3 className="filtered-pokemon-name">{firstLetterMayus(poke.name)}</h3>
                      </div>
                    </Link>
                  )
                })
              ) : (
                showSearchSkeleton ? (
                    <div className='container-skeleton'>
                        <Skeleton className="skeleton" variant="rect"/>
                    </div>
                ) : null
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonSearch