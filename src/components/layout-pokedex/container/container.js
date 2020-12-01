import React from 'react'
import {
    Switch,
    Route,
  } from "react-router-dom";


// Import Components
import ContainerPokemons from './container-pokemons/container-pokemons'
import ContainerRegions from './container-regions/container-regions'
import DetailPokemon from './detail-pokemon/detail-pokemon'

// Import Style
import './container.css'


class Container extends React.Component {

    render() {

        return (
            <>
                <div className="container-pokemon">
                    <Switch>
                        <Route path="/regions" exact>
                            <ContainerRegions 
                                key='regions'
                                sourceRegions={this.props.sourceRegions}
                                selectPokemonsFn={this.props.selectPokemonsFn}
                            />
                        </Route>
                    {/* {
                        this.props.showRegions ? (
                            <ContainerRegions 
                                sourceRegions={this.props.sourceRegions}
                                selectPokemonsFn={this.props.selectPokemonsFn}
                            />
                        ) : null
                        
                    } */}
                        <Route path="/regions/:regionName" exact>
                            <ContainerPokemons
                                // pokemons={this.props.pokemons}
                                currentPage={this.props.currentPage}
                                imgPokemonsFn={this.props.imgPokemonsFn}
                                detailsPokemon={this.props.detailsPokemon}
                                selectDetailPerPokemonFn={this.props.selectDetailPerPokemonFn}
                                showDetailPerPokemon={this.props.showDetailPerPokemon}
                                detailPerPokemon={this.props.detailPerPokemon}
                                currentRegion={this.props.currentRegion}
                                getDetail={this.props.getDetail}
                            />
                        </Route>

                        {/* {
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
                        } */}

                        <Route path="/regions/:regionName/:pokemon">
                            <DetailPokemon
                                detailPerPokemon={this.props.detailPerPokemon}
                                currentRegion={this.props.currentRegion}
                                imgPokemonsFn={this.props.imgPokemonsFn}
                                backPokemonDetailFn={this.props.backPokemonDetailFn}
                            />
                        </Route>

                        {/* {
                            this.props.showDetailPerPokemon ? (
                                <DetailPokemon
                                    detailPerPokemon={this.props.detailPerPokemon}
                                    currentRegion={this.props.currentRegion}
                                    imgPokemonsFn={this.props.imgPokemonsFn}
                                    backPokemonDetailFn={this.props.backPokemonDetailFn}
                                />
                            ) : null
                        } */}

                    </Switch>
                    
                    
                </div>
            </>
        )
    }
}

export default Container