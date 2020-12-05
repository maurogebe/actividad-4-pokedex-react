import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

// Import Components

// Import Style
import './container-regions.css'

function ContainerRegions(props) {

    return (
        <>
            <div className="container-region">
                    {
                        props.sourceRegions.map( (region, index)=> {
                            return (
                                <>
                                    <Link to={{
                                            pathname: `/pokedex/regions/${region.name.toLowerCase()}`
                                        }}>
                                        <div className="outline">
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
                                    </Link>
                                </>
                            )
                        })
                    }
            </div>
        </>
    )

}

export default ContainerRegions