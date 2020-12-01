import React, {useEffect} from 'react';
import {
    Link,
    useParams
  } from "react-router-dom";

// Import style
import './detail-pokemon.css'

// Import material UI
import { LinearProgress } from '@material-ui/core/'

// Import Icons
import { ArrowBackIos } from '@material-ui/icons/';

function DetailPokemon(props) {

    let { regionName } = useParams()

    useEffect(() => {
        props.detailPerPokemon[1].stats.map( (stats, index) => {
            const getId = document.getElementById(`bar-stat-${index}`)
            let getStatPorcentual = stats.base_stat * 1.75
            let getCenterPerStat = (350 - getStatPorcentual) / 2
            getId.style.width = `${getStatPorcentual}px`
            getId.style.left = `${getCenterPerStat}px`

        })
    }, [])

    const getImgPerRegion = (name, id) => {
        if(props.currentRegion === 1) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_1/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 2) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_2/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 3) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen_3/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 4) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Gen-4/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 5) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-5/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 6) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-6/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 7) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-7/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 8) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-8/${name}.gif`
            return urlImg
        }else {
            // if('https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_644_00.png' === false) {
            //     alert('hola')
                
            // }
            const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${id}.png`
            return urlImg
        }
        
    }

    return (
        <div className="detail-pokemon">
            {/* <div onClick={() => props.backPokemonDetailFn()}> */}
            <Link to={{
                pathname: `/regions/${regionName}`
            }}>
                <ArrowBackIos className="icon-back-ios" fontSize="large" />
            </Link>
            {/* </div> */}
            <div className="card-details-pokemon">
                <h1 className="detail-pokemon__title-pokemon">
                    #{props.detailPerPokemon[1].id} <span className="detail-pokemon__text-pokemon">{props.detailPerPokemon[0].name}</span>
                </h1>
                <div className="container-types">
                    {
                        props.detailPerPokemon[1].types.map( types => {
                            console.log(types)
                            return (
                                <span className={`detail-type-${types.type.name}`}>{types.type.name}</span>
                            )
                        })
                    }
                </div>
                <div className="container-stats">
                    {
                        props.detailPerPokemon[1].stats.map( (stats, index) => {
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
                {/* <LinearProgress className="stats" variant="determinate" value='100'/> */}
            </div>

            <img className="detail-pokemon__img-pokemon" src={getImgPerRegion(props.detailPerPokemon[0].name, props.detailPerPokemon[1].id)} alt={props.detailPerPokemon[0].name} />
        </div>
    )
}

export default DetailPokemon;