import React, { useState, useEffect } from 'react'
import {
    Switch,
    Route,
    useLocation,
    useParams
  } from "react-router-dom";


// Import Components
import SideLeft from './side-left/side-left'
import SideRight from './side-right/side-right'
import EffectBg from './effect-bg/effect-bg'
import ContainerPokemons from './container-pokemons/container-pokemons'
import ContainerRegions from './container-regions/container-regions'
import DetailPokemon from './detail-pokemon/detail-pokemon'

// Import Style
import './layout-pokedex.css'

function LayoutPokedex(props) {

    const location = useLocation()
    let { regionName, pokemonName } = useParams()

    useEffect(() => {
        if(location.pathname === '/') {
            props.directlyAccessPathFn()
        }
    }, [])

    return (
        <>
            <Switch>
                <div className={`container-side`}>
                    <SideLeft 
                        transitionPokedex={props.transitionPokedex}
                        showDisplayFn={props.showDisplayFn}
                        showDirectlyAccess={props.showDirectlyAccess}
                        showShowDirectlyAccess={props.showShowDirectlyAccess}
                    />

                        <Route path="/regions" exact>
                            <div className="container-pokemon">
                                <ContainerRegions 
                                    key='regions'
                                    sourceRegions={props.sourceRegions}
                                    selectPokemonsFn={props.selectPokemonsFn}
                                />
                            </div>
                        </Route>

                        <Route path="/regions/:regionName" exact>
                            <div className="container-pokemon">
                                <ContainerPokemons
                                    // pokemons={props.pokemons}
                                    currentPage={props.currentPage}
                                    imgPokemonsFn={props.imgPokemonsFn}
                                    detailsPokemon={props.detailsPokemon}
                                    selectDetailPerPokemonFn={props.selectDetailPerPokemonFn}
                                    showDetailPerPokemon={props.showDetailPerPokemon}
                                    detailPerPokemon={props.detailPerPokemon}
                                    currentRegion={props.currentRegion}
                                    getDetail={props.getDetail}
                                />
                            </div>
                        </Route>

                        <Route path="/regions/:regionName/:pokemonName">
                            {/* {
                                props.
                            } */}
                            <div className="container-pokemon">
                                <DetailPokemon
                                    detailPerPokemon={props.detailPerPokemon}
                                    currentRegion={props.currentRegion}
                                    imgPokemonsFn={props.imgPokemonsFn}
                                    backPokemonDetailFn={props.backPokemonDetailFn}
                                />
                            </div>
                        </Route>
                        
                    <SideRight 
                        showPokemons={props.showPokemons}
                        transitionPokedex={props.transitionPokedex}
                        showDirectlyAccess={props.showDirectlyAccess}
                        showShowDirectlyAccess={props.showShowDirectlyAccess}
                    />
                </div>
                <EffectBg />
            </Switch>
        </>
    )

}

export default LayoutPokedex