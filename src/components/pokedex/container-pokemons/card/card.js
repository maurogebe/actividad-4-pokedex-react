import React, { useEffect, useState, useRef } from 'react';
import {
    Link,
    useParams
  } from "react-router-dom";
  

// Import style
import './card.css'

function Card(props) {

    let [imgPokemon, setImgPokemon] = useState(props.img)
    let refImgPokemon = useRef()
    let { regionName } = useParams()

    useEffect(() => {
        if(props.currentRegion === 5) {
            const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${props.idPokemon}.png`
            setImgPokemon(urlImg)
            refImgPokemon.current.style.bottom = '5%'
            refImgPokemon.current.style.height = '110px'
        } else if(props.currentRegion === 6) {
            const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${props.idPokemon}.png`
            setImgPokemon(urlImg)
            refImgPokemon.current.style.bottom = '5%'
            refImgPokemon.current.style.height = '110px'
        } else if(props.currentRegion === 7) {
            const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${props.idPokemon}.png`
            setImgPokemon(urlImg)
            refImgPokemon.current.style.bottom = '5%'
            refImgPokemon.current.style.height = '110px'
        } else if(props.currentRegion === 8) {
            const urlImg = `https://gifs-pokedex.s3.amazonaws.com/Shiny-Gen-8/${props.idPokemon}.gif`
            setImgPokemon(urlImg)
            refImgPokemon.current.style.bottom = '0%'
            refImgPokemon.current.style.height = '110px'
        }

        // setTimeout(() => {


        //     if(refImgPokemon.current.clientHeight < 30) {
        //         // setImgPokemon(`https://www.pokencyclopedia.info/sprites/3ds/spr_3ds/3spr__${props.idPokemon}.png`) 
        //         setImgPokemon(`https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${props.idPokemon}.png`)
        //         // console.log(idPokemonImg.clientHeight)
        //         // refImgPokemon.current.style.width = '75px'
        //         // refImgPokemon.current.style.bottom = '12%'
                
        //         alert('hoal')
        //     }
        // }, 1000)

        // const idPokemonImg = document.getElementById(`id-pokemon-img-${props.idPokemon}`)
        
    }, [])

    const iterarTypes = (value) => {
        return value.types.map( types => {
            let nameType = types.type.name;
            // console.log(nameType);
            if(types.slot === 1) {
                return <h3 className={`type-${nameType}`}></h3>
            } else {
                return <h3 className={`type-${nameType} type-secondary`}></h3>
            }
            
        })
    }

    return(
        <>
            {
                <Link to={{
                    pathname: `/pokedex/regions/${regionName}/${props.pokemon.name}`
                }}>
                    <div className="card-container">
                        <h3 className="title-pokemon">
                            #{props.idPokemon} <span className="text-pokemon">{props.pokemon.name}</span>
                        </h3>
                        {
                            props.detailsPokemon ? (
                                iterarTypes(props.detailsPokemon)
                            ) : null
                            
                        }
                        <img ref={refImgPokemon} onClick={() => props.selectDetailPerPokemonFn(props.pokemon.name, props.detailsPokemon, imgPokemon)} id={`id-pokemon-img-${props.idPokemon}`} className="img-pokemon" src={imgPokemon} alt={props.pokemon.name} />
                    </div>
                </Link>
            }
        </>
    )
}

export default Card;