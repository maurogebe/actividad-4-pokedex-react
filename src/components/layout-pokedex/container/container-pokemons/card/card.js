import React, { useEffect, useState } from 'react';

// Import Components

// Import Material UI
import Skeleton from '@material-ui/lab/Skeleton';

// Import style
import './card.css'

function Card(props) {

    let [loadingCard, setLoadingCard] = useState(true)
    let [imgPokemon, setImgPokemon] = useState(props.img)

    useEffect(() => {
        const changeImg = async() => {
            const idPokemonImg = await document.getElementById(`id-pokemon-img-${props.idPokemon}`)
            setTimeout(() => {
                if(idPokemonImg.clientHeight < 50) {
                    // setImgPokemon(`https://www.pokencyclopedia.info/sprites/3ds/spr_3ds/3spr__${props.idPokemon}.png`) 
                    setImgPokemon(`https://www.pokencyclopedia.info/sprites/artworks/ken-sugimori/art__${props.idPokemon}.png`)
                    // console.log(idPokemonImg.clientHeight)
                    idPokemonImg.style.width = '75px'
                    idPokemonImg.style.bottom = '12%'
                } else {

                }
            }, 1000)
        }
        changeImg()
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

    const loadingCardFn = () => {
        return (
            <div className="card-container">
                <h3 className="title-pokemon">
                    <Skeleton variant="text"/> <span className="text-pokemon"></span>
                </h3>
                <h3 className="type"><Skeleton variant="circle"/></h3>
                <Skeleton variant="rect"/>
            </div>
        )
    }

    return(
        <>
            {
                loadingCard ? (
                    <div className="card-container">
                        <h3 className="title-pokemon">
                            #{props.idPokemon} <span className="text-pokemon">{props.pokemon.name}</span>
                        </h3>
                        {
                            props.detailsPokemon ? (
                                iterarTypes(props.detailsPokemon)
                            ) : null
                            
                        }
                        <img onClick={() => props.selectDetailPerPokemonFn(props.pokemon.name, props.detailsPokemon, imgPokemon)} id={`id-pokemon-img-${props.idPokemon}`} className="img-pokemon" src={imgPokemon} alt={props.pokemon.name} />
                    </div>
                ) : (
                    loadingCardFn()
                )
            }
        </>
    )
}

export default Card;