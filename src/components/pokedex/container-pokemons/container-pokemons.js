import React, { useState, useRef, useEffect } from 'react';
import {
   useParams
  } from "react-router-dom";
// import AWS from 'aws-sdk'

// Import sources
import { regions } from '../../../sources'

// Import Components
import Card from './card/card';
import PokemonSearch from './pokemon-search/pokemon-search'

// Import style
import './container-pokemons.css';

//  Import Material UI
import { Skeleton } from '@material-ui/lab'

function ContainerPokemons(props) {

  // let [region, setRegion] = useState(regions)

  let [pokemons, setPokemons] = useState([])
  let [pokemonsDetails, setPokemonsDetails] = useState([])
  let [regionsAll, setRegionsAll] = useState(regions)
  let [pokemonPerPage, setPokemonPerPage] = useState(0)
  let [limitPokemon, setLimitPokemon] = useState(20)
  let [currentRegion, setCurrentRegion] = useState()
  let [scrollActive, setScrollActive] = useState(true)
  let [scrollFinish, setScrollFinish] = useState(true)

  let valueScroll = useRef(0)
  let { regionName } = useParams()


  // Hacer la peticion a la API cada vez que entren por la url o escogiendo la region 
  useEffect(() => {
    const region = regionsAll.find( region => region.name.toLowerCase() === regionName)
    setCurrentRegion(region)
    let copyPokemon = []
    let copyDetail = []
    const getPokemons = async() => {
      const url = 'https://pokeapi.co/api/v2/pokemon'
      let response = await fetch(`${url}?limit=${limitPokemon}&offset=${region.startPokemons + pokemonPerPage}`);
      let data = await response.json();
      let results = data.results;
      let details = await props.getDetail(results)
      copyPokemon = [...pokemons, ...results]
      copyDetail = [...pokemonsDetails, ...details]
      setPokemonsDetails(copyDetail)
      setPokemons(copyPokemon)
    }
    getPokemons()

    // console.log(details)
  }, [pokemonPerPage])


  // Cada que pokemonsDetails cambie de valor debe activar de nuevo la vista de los pokemones para que muestre la lista actualizada despues de hacer el scroll infinito
  useEffect(() => {
    if(pokemonsDetails.length > pokemonPerPage) {
      setScrollActive(true)
    }
  }, [pokemonsDetails])


  // url de imagen para no colocar todo el url en el src
  const getImgFn = (id) => {

    const urlImg = `https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${props.imgPokemonsFn(id)}_00.png`
    
    return urlImg
  }


  // Creando infinity scroll, se identifica cuando esta al final del scroll y se pone un condicional para que espere que haga la llamada a la API para que no haga mas llamadas hasta que no termine la que se pidio
  const getEndScrollFn = () => {
    if(scrollFinish) {
      if(scrollActive) {
        if((pokemonPerPage + 40) < currentRegion.limitPokemon) {
          let currentScroll = valueScroll.current.scrollTop + valueScroll.current.offsetHeight
          if(currentScroll === valueScroll.current.scrollHeight) {
            setPokemonPerPage(pokemonPerPage + 20)
            setScrollActive(false)
          }
        } else {
          let currentScroll = valueScroll.current.scrollTop + valueScroll.current.offsetHeight
          if(currentScroll === valueScroll.current.scrollHeight) {
            const finishScrollLimit = currentRegion.limitPokemon - (pokemonPerPage + 20)
            setPokemonPerPage(currentRegion.limitPokemon - finishScrollLimit)
            setLimitPokemon(finishScrollLimit)
            console.log(currentRegion.limitPokemon - (currentRegion.limitPokemon - 20))
            setScrollActive(false)
            setScrollFinish(false)
          }
        }
      }
    }
  }

  return (
    <>
      <PokemonSearch 
        getDetail={props.getDetail}
        showListFilteredPokemon={props.showListFilteredPokemon}
        setShowListFilteredPokemon={props.setShowListFilteredPokemon}
      />
      <div ref={valueScroll} onScroll={getEndScrollFn} className="pokedex-container">
      {
          pokemons.map( (pokemon, index) => {
            return (
              pokemonsDetails.length != 0 ? (
                <Card 
                  key={index + 1}
                  pokemon={pokemon}
                  img={getImgFn(pokemonsDetails[index].id)}
                  idPokemon={pokemonsDetails[index].id}
                  detailsPokemon={pokemonsDetails[index]}
                />
              ) : null
            )
          })
          
      }
      {
        scrollFinish ? (
          <>
            <div className="container-scroll-pokemon">
              <Skeleton className="skeleton-card-pokemon" variant='rect' width={'100%'} height={'100%'}/>
            </div>
            <div className="container-scroll-pokemon">
              <Skeleton className="skeleton-card-pokemon" variant='rect' width={'100%'} height={'100%'}/>
            </div>
          </>
        ) : null
      }
      {
        window.screen.width > 950 ? (
          <div className="container-scroll-pokemon">
            <Skeleton className="skeleton-card-pokemon" variant='rect' width={'100%'} height={'100%'}/>
          </div>
        ) : null
      }
      {
        window.screen.width > 1200 ? (
          <div className="container-scroll-pokemon">
            <Skeleton className="skeleton-card-pokemon" variant='rect' width={'100%'} height={'100%'}/>
          </div>
        ) : null
      }
      </div>
    </>
  )
}

export default ContainerPokemons