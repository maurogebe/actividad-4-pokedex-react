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
                                    <div onClick={() => this.props.selectPokemonsFn(region, index)} className="outline">
                                        <div className="in">
                                            <div className="in-top">
                                                <div className="in-top--left"></div>
                                                <div className="in-top--right"></div>
                                            </div>
                                                <h3>{region.name}</h3>
                                            <div className="in-bottom">
                                                <div className="in-bottom--left"></div>
                                                <div className="in-bottom--right"></div>
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