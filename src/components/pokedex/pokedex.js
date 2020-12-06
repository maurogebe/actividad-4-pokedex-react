import React, { useEffect } from 'react'
import {
    useLocation,
  } from "react-router-dom";


// Import Components
import SideLeft from './side-left/side-left'
import SideRight from './side-right/side-right'
import EffectBg from './effect-bg/effect-bg'
import ContainerPokemons from './container-pokemons/container-pokemons'
import ContainerRegions from './container-regions/container-regions'
import DetailPokemon from './detail-pokemon/detail-pokemon'
import PrivateRoute from '../private-route/private-route'
import Profile from '../profile/profile'

// Import Style
import './pokedex.css'

function Pokedex(props) {

    const location = useLocation()

    useEffect(() => {
        if(location.pathname === '/pokedex') {
            props.directlyAccessPathFn()
        }
    }, [])

    return (
        <>  
            <Profile />
            <div className={`container-side`}>
                <SideLeft 
                    transitionPokedex={props.transitionPokedex}
                    showDisplayFn={props.showDisplayFn}
                    showDirectlyAccess={props.showDirectlyAccess}
                    showShowDirectlyAccess={props.showShowDirectlyAccess}
                />
                <PrivateRoute path="/pokedex/regions" exact={true}>
                    <div className="container-pokemon">
                        <ContainerRegions
                            sourceRegions={props.sourceRegions}
                        />
                    </div>
                </PrivateRoute>

                <PrivateRoute path="/pokedex/regions/:regionName" exact={true}>
                    <div className="container-pokemon">
                        <ContainerPokemons
                            imgPokemonsFn={props.imgPokemonsFn}
                            getDetail={props.getDetail}
                        />
                    </div>
                </PrivateRoute>

                <PrivateRoute path="/pokedex/regions/:regionName/:pokemonName" exact={false}>
                    <div className="container-pokemon">
                        <DetailPokemon

                        />
                    </div>
                </PrivateRoute>

                <SideRight 
                    showPokemons={props.showPokemons}
                    transitionPokedex={props.transitionPokedex}
                    showDirectlyAccess={props.showDirectlyAccess}
                    showShowDirectlyAccess={props.showShowDirectlyAccess}
                />

                
            </div>
            <EffectBg />
        </>
    )

}

export default Pokedex