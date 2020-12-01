import React from 'react'
import {
    Switch,
    Route,
  } from "react-router-dom";


// Import Components
import SideLeft from './side-left/side-left'
import SideRight from './side-right/side-right'
import EffectBg from './effect-bg/effect-bg'
import Container from './container/container'
// import ContainerPokemons from './container-pokemons/container-pokemons'
// import ContainerRegions from './container-regions/container-regions'
// import DetailPokemon from './detail-pokemon/detail-pokemon'

// Import Style
import './layout-pokedex.css'


class LayoutPokedex extends React.Component {

    render() {

        return (
            <>
                <Switch>
                    <div className={`container-side`}>
                        <SideLeft 
                            transitionPokedex={this.props.transitionPokedex}
                            showDisplayFn={this.props.showDisplayFn}
                        />

                        {/* <Route path='/' exact>
                            <Container
                                pokemons={this.props.pokemons}
                                currentPage={this.props.currentPage}
                                imgPokemonsFn={this.props.imgPokemonsFn}
                                detailsPokemon={this.props.detailsPokemon}
                                sourceRegions={this.props.sourceRegions}
                                showRegions={this.props.showRegions}
                                showPokemons={this.props.showPokemons}
                                showDetailPerPokemon={this.props.showDetailPerPokemon}
                                selectPokemonsFn={this.props.selectPokemonsFn}
                                selectDetailPerPokemonFn={this.props.selectDetailPerPokemonFn}
                                detailPerPokemon={this.props.detailPerPokemon}
                                currentRegion={this.props.currentRegion}
                                backPokemonDetailFn={this.props.backPokemonDetailFn}
                                getDetail={this.props.getDetail}
                            />
                        </Route> */}



                        {
                            this.props.showDisplay ? (
                                <Container
                                    pokemons={this.props.pokemons}
                                    currentPage={this.props.currentPage}
                                    imgPokemonsFn={this.props.imgPokemonsFn}
                                    detailsPokemon={this.props.detailsPokemon}
                                    sourceRegions={this.props.sourceRegions}
                                    showRegions={this.props.showRegions}
                                    showPokemons={this.props.showPokemons}
                                    showDetailPerPokemon={this.props.showDetailPerPokemon}
                                    selectPokemonsFn={this.props.selectPokemonsFn}
                                    selectDetailPerPokemonFn={this.props.selectDetailPerPokemonFn}
                                    detailPerPokemon={this.props.detailPerPokemon}
                                    currentRegion={this.props.currentRegion}
                                    backPokemonDetailFn={this.props.backPokemonDetailFn}
                                    getDetail={this.props.getDetail}
                                />
                            ) : null
                        }
                        <SideRight 
                            showPokemons={this.props.showPokemons}
                            transitionPokedex={this.props.transitionPokedex}
                        />
                    </div>
                    <EffectBg />
                </Switch>
            </>
        )
    }
}

export default LayoutPokedex