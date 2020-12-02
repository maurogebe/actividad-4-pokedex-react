import React, { useState, useEffect } from 'react';
import {
    Link,
    useParams
  } from "react-router-dom";

// Import Sources
import { regions } from '../../../sources'

// Import style
import './detail-pokemon.css'

// Import Material UI
import { ArrowBackIos } from '@material-ui/icons/';

function DetailPokemon(props) {

    let [sourceRegions, setSourceRegions] = useState(regions)
    let [currentRegion, setCurrentRegion] = useState(0)
    let [pokemonDetail, setPokemonDetail] = useState( { types: [], stats: [] } )
    let { regionName, pokemonName } = useParams()

    useEffect(async() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
        let response = await fetch(url);
        let data = await response.json();
        let results = data;
        setPokemonDetail(results)
        const region = sourceRegions.findIndex((r) => regionName.toUpperCase() === r.name.toUpperCase()) 
        setCurrentRegion(region + 1)
    }, [])

    useEffect(() => {
        pokemonDetail.stats.map( (stats, index) => {
            const getId = document.getElementById(`bar-stat-${index}`)
            let getStatPorcentual = stats.base_stat * 1.75
            let getCenterPerStat = (350 - getStatPorcentual) / 2
            getId.style.width = `${getStatPorcentual}px`
            getId.style.left = `${getCenterPerStat}px`

        })
    }, [pokemonDetail])

    const firstLetterMayus = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const getImgPerRegion = (name, id) => {
        if(currentRegion === 1) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_1/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 2) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_2/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 3) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_3/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 4) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen-4/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 5) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-5/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 6) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-6/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 7) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-7/${firstLetterMayus(name)}.gif`
            return urlImg
        } else if(currentRegion === 8) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-8/${id}.gif`
            return urlImg
        }else {
            // if('https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_644_00.png' === false) {
            //     alert('hola')
                
            // }
            // const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${id}.png`
            // return urlImg
        }

        console.log(currentRegion)
        
    }

    return (
        <div className="detail-pokemon">
            {/* <div onClick={() => props.backPokemonDetailFn()}> */}
            <Link to={{
                pathname: `/pokedex/regions/${regionName}`
            }}>
                <ArrowBackIos className="icon-back-ios" fontSize="large" />
            </Link>
            {/* </div> */}
            <div className="card-details-pokemon">
                <h1 className="detail-pokemon__title-pokemon">
                    #{pokemonDetail.id} <span className="detail-pokemon__text-pokemon">{pokemonName}</span>
                </h1>
                <div className="container-types">
                    {
                        pokemonDetail.types.map( types => {
                            console.log(types)
                            return (
                                <span className={`detail-type-${types.type.name}`}>{types.type.name}</span>
                            )
                        })
                    }
                </div>
                <div className="container-stats">
                    {
                        pokemonDetail.stats.map( (stats, index) => {
                            return (
                                <div className="container-stat">
                                    <span className="title-stat">{stats.stat.name.replace('special-', 'SP ')}: {stats.base_stat}</span>
                                    <div id={`stat-id-${index}`} className={`stat-linear stat-linear-${stats.stat.name}`}>
                                        <div id={`bar-stat-${index}`} className="bar-stat"></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <img className="detail-pokemon__img-pokemon" src={getImgPerRegion(pokemonName, pokemonDetail.id)} alt={pokemonName} />
        </div>
    )
}

export default DetailPokemon;