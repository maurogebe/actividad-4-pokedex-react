import React, { useState, useRef } from 'react';
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


    // Iterando en los tipos de cada pokemon para que se muestre uno o mas tipos a los que pertenece
    const iterarTypes = (value) => {
        return value.types.map( types => {
            let nameType = types.type.name;
            // console.log(nameType);
            if(types.slot === 1) {
                return <h3 className={`type type-${nameType}`}></h3>
            } else {
                return <h3 className={`type type-${nameType} type-secondary`}></h3>
            }
            
        })
    }


    // Cambiando imagen cuando la url de error 404
    const changeImgError = () => {
        // const urlImgCurrent = props.img
        if(imgPokemon === props.img) {
            const urlImg = `https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${props.idPokemon}.png`
            setImgPokemon(urlImg)
            refImgPokemon.current.style.bottom = '5%'
            refImgPokemon.current.style.height = '65%'
        } else {
            const urlImg = props.detailsPokemon.sprites.other['official-artwork'].front_default
            setImgPokemon(urlImg)
            refImgPokemon.current.style.bottom = '0%'
            refImgPokemon.current.style.height = '65%'
        }
        
    }

    return(
        <>
            {
                <Link 
                    className="link-card"
                    to={{
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
                            <img ref={refImgPokemon} onError={changeImgError} id={`id-pokemon-img-${props.idPokemon}`} className="img-pokemon" src={imgPokemon} alt={props.pokemon.name} />
                        
                    </div>
                </Link>
            }
        </>
    )
}

export default Card;