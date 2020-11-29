import React from 'react'


// Import Components

// Import Style
import './container-regions.css'


class ContainerRegions extends React.Component {

    render() {

        return (
            <>
                <div className="container-region">
                        {
                            this.props.sourceRegions.map( (region, index)=> {
                                return (
                                    <div onClick={() => this.props.selectPokemonsFn(region, index)} class="outline">
                                        <div class="in">
                                            <div class="in-top">
                                                <div class="in-top--left"></div>
                                                <div class="in-top--right"></div>
                                            </div>
                                                <h3>{region.name}</h3>
                                            <div class="in-bottom">
                                                <div class="in-bottom--left"></div>
                                                <div class="in-bottom--right"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
            </>
        )
    }
}

export default ContainerRegions