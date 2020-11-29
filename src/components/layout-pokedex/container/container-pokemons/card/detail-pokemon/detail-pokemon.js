import React, {useEffect} from 'react';

// Import style
import './detail-pokemon.css'

// Import material UI
import { LinearProgress } from '@material-ui/core/'

// Import Icons
import { ArrowBackIos } from '@material-ui/icons/';

function DetailPokemon(props) {

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
            const urlImg = `./images/Gen_1/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 2) {
            const urlImg = `./images/Gen_2/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 3) {
            const urlImg = `./images/Gen_3/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 4) {
            const urlImg = `./images/Gen_4/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 5) {
            const urlImg = `./images/Shiny-Gen_5/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 6) {
            const urlImg = `./images/Shiny-Gen_6/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 7) {
            const urlImg = `./images/Shiny-Gen_7/${name}.gif`
            return urlImg
        } else if(props.currentRegion === 8) {
            const urlImg = `./images/Shiny-Gen_8/${name}.gif`
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
            <div onClick={() => props.backPokemonDetailFn()}>
                <ArrowBackIos className="icon-back-ios" fontSize="large" />
            </div>
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