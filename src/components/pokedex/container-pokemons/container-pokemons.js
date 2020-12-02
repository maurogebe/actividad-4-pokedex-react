import React, { useState, useRef, useEffect } from 'react';
import {
   useParams, 
   Link 
  } from "react-router-dom";
// import AWS from 'aws-sdk'

// Import sources
import { regions } from '../../../sources'

// Import Components
import Card from './card/card';

// Import style
import './container-pokemons.css';

// Import Icons
import { ArrowBackIos } from '@material-ui/icons/';

//  Import Material UI
import { Skeleton } from '@material-ui/lab'

function ContainerPokemons(props) {

  // let [region, setRegion] = useState(regions)

  let [pokemons, setPokemons] = useState([])
  let [pokemonsDetails, setPokemonsDetails] = useState([])
  let [regionsAll, setRegionsAll] = useState(regions)
  let [showCardsPokemons, setShowCardsPokemons] = useState(false)
  let valueScroll = useRef(0)
  let { regionName } = useParams()

  useEffect(() => {
    const region = regionsAll.find( region => region.name.toLowerCase() === regionName)
    const getPokemons = async() => {
      const url = 'https://pokeapi.co/api/v2/pokemon'
      let response = await fetch(`${url}?limit=20&offset=${region.startPokemons}`);
      let data = await response.json();
      let results = data.results;
      let details = await props.getDetail(results)
      setPokemons(results)
      setPokemonsDetails(details)
      console.log(details)
    }
    getPokemons()
    // console.log(details)
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowCardsPokemons(true)
  //   },1000)
  //   // setShowCardsPokemons(true)
  // }, [])

  const getImgFn = (name, id) => {

    const urlImg = `https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${props.imgPokemonsFn(id)}_00.png`

    // const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${id}.png`
    
    // const urlImg = `https://img.pokemondb.net/sprites/home/normal/${name}.png`
    // const urlImg = `https://img.pokemondb.net/sprites/go/normal/${name}.png`
    // const urlImg = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`
    
    return urlImg
  }

  const getEndScrollFn = () => {
    let currentScroll = valueScroll.current.scrollTop + valueScroll.current.offsetHeight
    if(currentScroll === valueScroll.current.scrollHeight) {
      alert('Final')
    }
    // console.log(currentScroll)
    // console.log(valueScroll.current.scrollHeight)

  }

  return (
    <>
      <Link to={{
          pathname: `/pokedex/regions`
      }}>
          <ArrowBackIos className="icon-back-ios" fontSize="large" />
      </Link>
      <div ref={valueScroll} onScroll={getEndScrollFn} className="pokedex-container">
      {
          pokemons.map( (pokemon, index) => {
            return (
              pokemonsDetails.length === 0 ? (
                <Card 
                  key={index + 1}
                  pokemon={pokemon}
                  img={getImgFn(pokemon.name, pokemonsDetails[index].id)}
                  idPokemon={pokemonsDetails[index].id} 
                  detailsPokemon={pokemonsDetails[index]}
                  selectDetailPerPokemonFn={props.selectDetailPerPokemonFn}
                  showDetailPerPokemon={props.showDetailPerPokemon}
                  detailPerPokemon={props.detailPerPokemon}
                  currentRegion={props.currentRegion}
                />
              ) : (
                <Skeleton variant="rect" height={150}/>
              )
            )
          })
          
      }
      </div>
    </>
  )
}

export default ContainerPokemons