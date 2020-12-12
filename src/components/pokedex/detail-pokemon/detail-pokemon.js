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
    let [pokemonDetail, setPokemonDetail] = useState( { types: [], stats: [], sprites: { other: {} } } )
    let [pokemonImg, setPokemonImg] = useState()
    let [showPokemonDetail, setShowPokemonDetail] = useState(false)
    let { regionName, pokemonName } = useParams()

    // Haciendo la peticion para acceder a los detalles del pokemon cuando se ingrese por el link en la lista o por el url directamente
    useEffect(async() => {
        // const regionId = regionsAll.findIndex( region => region.name.toLowerCase() === regionName)
        // setCurrentRegion(regionId + 1)
        // setPokemonImg(`https://gifs-pokedex.s3.amazonaws.com/Gen_1/${firstLetterMayus(pokemonName)}.gif`)
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
        let response = await fetch(url);
        let data = await response.json();
        let results = data;
        setPokemonDetail(results)
        const regionId = sourceRegions.findIndex( region => regionName === region.name.toLowerCase()) 
        setCurrentRegion(regionId + 1)
    }, [])

    // Cuando el valor de pokemonDetail va a agregar los stats
    useEffect(() => {
        pokemonDetail.stats.map( (stats, index) => {
            const getId = document.getElementById(`bar-stat-${index}`)
            let getStatPorcentual = stats.base_stat / 1.5
            let getCenterPerStat = (100 - getStatPorcentual) / 2
            getId.style.width = `${getStatPorcentual}%`
            getId.style.left = `${getCenterPerStat}%`

        })
        setShowPokemonDetail(true)


        if(pokemonDetail.id <= 151) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_1/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else if(pokemonDetail.id <= 251) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_2/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else if(pokemonDetail.id <= 386) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_3/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else if(pokemonDetail.id <= 493) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen-4/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else if(pokemonDetail.id <= 649) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-5/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else if(pokemonDetail.id <= 721) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-6/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else if(pokemonDetail.id <= 809) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-7/${firstLetterMayus(pokemonName)}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        } else {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-8/${pokemonDetail.id}.gif`
            setPokemonImg(urlImg)
            // return urlImg
        }


    }, [pokemonDetail])

    // Metodo para devolver la primera una palabra sin cambiar su valor
    const firstLetterMayus = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const changeImgForError = () => {
        const urlImg = pokemonDetail.sprites.other['official-artwork'].front_default
        setPokemonImg(urlImg)
        // return pokemonDetail.sprites.other['official-artwork'].front_default
    }

    return (
        <div className="detail-pokemon">
            <Link to={{
                pathname: `/pokedex/regions/${regionName}`
            }}>
                <ArrowBackIos className="icon-back-ios" fontSize="large" />
            </Link>
            <div className="card-details-pokemon">
                <h1 className="detail-pokemon__title-pokemon">
                    #{pokemonDetail.id} <span className="detail-pokemon__text-pokemon">{pokemonName}</span>
                </h1>
                <div className="container-types">
                    {
                        pokemonDetail.types.map( types => {
                            console.log(types)
                            return (
                                <span className={`detail-type-${types.type.name}`}>{firstLetterMayus(types.type.name)}</span>
                            )
                        })
                    }
                </div>
                <div className="container-stats">
                    <h3>Stats:</h3>
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

            {
                pokemonDetail.types.length != 0 ? (
                    <img className="detail-pokemon__img-pokemon" src={pokemonImg} alt={pokemonName} onError={changeImgForError} />
                ) : null
            }
        </div>
    )
}

export default DetailPokemon;