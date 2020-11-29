import React from 'react'


// Import Components
import SideLeft from './side-left/side-left'
import SideRight from './side-right/side-right'
import EffectBg from './effect-bg/effect-bg'
import Container from './container/container'

// Import Style
import './layout-pokedex.css'


class LayoutPokedex extends React.Component {

    render() {

        return (
            <>
                <div className={`container-side`}>
                    <SideLeft 
                        transitionPokedex={this.props.transitionPokedex}
                        showDisplayFn={this.props.showDisplayFn}
                    />
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
                            />
                        ) : null
                    }
                    <SideRight 
                        showPokemons={this.props.showPokemons}
                        transitionPokedex={this.props.transitionPokedex}
                    />
                </div>
                <EffectBg />
            </>
        )
    }
}

export default LayoutPokedex