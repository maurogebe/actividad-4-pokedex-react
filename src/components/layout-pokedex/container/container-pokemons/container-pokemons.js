import React, { useState, useRef } from 'react';
import axios from 'axios';
// import AWS from 'aws-sdk'

// Import Components
import Card from './card/card';

// Import style
import './container-pokemons.css';

function ContainerPokemons(props) {

  let valueScroll = useRef(0)

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
    <div ref={valueScroll} onScroll={getEndScrollFn} className="pokedex-container">
    {
        props.pokemons.map( (pokemon, index) => {
          return (
            <Card 
              key={index + 1} 
              pokemon={pokemon}
              img={getImgFn(pokemon.name, props.detailsPokemon[index].id)}
              idPokemon={props.detailsPokemon[index].id} 
              detailsPokemon={props.detailsPokemon[index]}
              selectDetailPerPokemonFn={props.selectDetailPerPokemonFn}
              showDetailPerPokemon={props.showDetailPerPokemon}
              detailPerPokemon={props.detailPerPokemon}
              currentRegion={props.currentRegion}
            />
          )
        })
    }
    </div>
  )
}

export default ContainerPokemons