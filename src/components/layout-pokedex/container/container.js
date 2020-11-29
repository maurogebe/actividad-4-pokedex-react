import React from 'react'


// Import Components
import ContainerPokemons from './container-pokemons/container-pokemons'
import ContainerRegions from './container-regions/container-regions'
import DetailPokemon from './container-pokemons/card/detail-pokemon/detail-pokemon'

// Import Style
import './container.css'


class Container extends React.Component {

    render() {

        return (
            <>
                <div className="container-pokemon">
                    {
                        this.props.showRegions ? (
                            <ContainerRegions 
                                sourceRegions={this.props.sourceRegions}
                                selectPokemonsFn={this.props.selectPokemonsFn}
                            />
                        ) : null
                        
                    }
                    {
                        this.props.showPokemons ? (
                            <ContainerPokemons
                                pokemons={this.props.pokemons}
                                currentPage={this.props.currentPage}
                                imgPokemonsFn={this.props.imgPokemonsFn}
                                detailsPokemon={this.props.detailsPokemon}
                                selectDetailPerPokemonFn={this.props.selectDetailPerPokemonFn}
                                showDetailPerPokemon={this.props.showDetailPerPokemon}
                                detailPerPokemon={this.props.detailPerPokemon}
                                currentRegion={this.props.currentRegion}
                            />
                        ) : null
                    }
                    {
                        this.props.showDetailPerPokemon ? (
                            <DetailPokemon
                                detailPerPokemon={this.props.detailPerPokemon}
                                currentRegion={this.props.currentRegion}
                                imgPokemonsFn={this.props.imgPokemonsFn}
                                backPokemonDetailFn={this.props.backPokemonDetailFn}
                            />
                        ) : null
                    }
                </div>
            </>
        )
    }
}

export default Container