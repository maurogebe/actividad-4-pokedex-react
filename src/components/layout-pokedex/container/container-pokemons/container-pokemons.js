import React from 'react';
import axios from 'axios'

// Import Components
import Card from './card/card';

// Import style
import './container-pokemons.css';

class ContainerPokemons extends React.Component {

  getImg = (name, id) => {

    const urlImg = `https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${this.props.imgPokemonsFn(id)}_00.png`

    // const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${id}.png`
    
    // const urlImg = `https://img.pokemondb.net/sprites/home/normal/${name}.png`
    // const urlImg = `https://img.pokemondb.net/sprites/go/normal/${name}.png`
    // const urlImg = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`
    
    return urlImg
  }

    render() {

        return (
                <div className="pokedex-container">
                {
                    this.props.pokemons.map( (pokemon, index) => {
                      return (
                        <Card 
                          key={index + 1} 
                          pokemon={pokemon}
                          img={this.getImg(pokemon.name, this.props.detailsPokemon[index].id)}
                          idPokemon={this.props.detailsPokemon[index].id} 
                          detailsPokemon={this.props.detailsPokemon[index]}
                          selectDetailPerPokemonFn={this.props.selectDetailPerPokemonFn}
                          showDetailPerPokemon={this.props.showDetailPerPokemon}
                          detailPerPokemon={this.props.detailPerPokemon}
                          currentRegion={this.props.currentRegion}
                        />
                      )
                    })
                }
                </div>
        )
    }
}

export default ContainerPokemons