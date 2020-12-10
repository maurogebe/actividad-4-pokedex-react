import React, { useState, useRef, useEffect } from 'react';
import {
   useParams, 
   Link,
   useHistory
  } from "react-router-dom";
// import AWS from 'aws-sdk'

// Import sources
import { regions } from '../../../sources'

// Import Components
import Card from './card/card';

// Import style
import './container-pokemons.css';

// Import Icons
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

//  Import Material UI
import { Skeleton } from '@material-ui/lab'

function ContainerPokemons(props) {

  // let [region, setRegion] = useState(regions)

  let [pokemons, setPokemons] = useState([])
  let [pokemonsDetails, setPokemonsDetails] = useState([])
  let [regionsAll, setRegionsAll] = useState(regions)
  let [pokemonPerPage, setPokemonPerPage] = useState(0)
  let [limitPokemon, setLimitPokemon] = useState(20)
  let [currentRegion, setCurrentRegion] = useState()
  let [scrollActive, setScrollActive] = useState(true)
  let [scrollFinish, setScrollFinish] = useState(true)

  // Estados para la busqueda de pokemones
  let [listSearchPokemon, setListSearchPokemon] = useState([])
  let [listSearchPokemonDetail, setListSearchPokemonDetail] = useState([])
  let [valueSearchInput, setValueSearchInput] = useState('')
  let [onlyRequestSearch, setOnlyRequestSearch] = useState(true)


  let valueScroll = useRef(0)
  const refPokemonSearch = useRef()
  let refListFilteredPokemon = useRef()
  let { regionName } = useParams()
  const history = useHistory()


  // Hacer la peticion a la API cada vez que entren por la url o escogiendo la region 
  useEffect(() => {
    const region = regionsAll.find( region => region.name.toLowerCase() === regionName)
    setCurrentRegion(region)
    let copyPokemon = []
    let copyDetail = []
    const getPokemons = async() => {
      const url = 'https://pokeapi.co/api/v2/pokemon'
      let response = await fetch(`${url}?limit=${limitPokemon}&offset=${region.startPokemons + pokemonPerPage}`);
      let data = await response.json();
      let results = data.results;
      let details = await props.getDetail(results)
      copyPokemon = [...pokemons, ...results]
      copyDetail = [...pokemonsDetails, ...details]
      setPokemonsDetails(copyDetail)
      setPokemons(copyPokemon)
    }
    getPokemons()

    // console.log(details)
  }, [pokemonPerPage])


  // Cada que pokemonsDetails cambie de valor debe activar de nuevo la vista de los pokemones para que muestre la lista actualizada despues de hacer el scroll infinito
  useEffect(() => {
    if(pokemonsDetails.length > pokemonPerPage) {
      setScrollActive(true)
    }
  }, [pokemonsDetails])


  // url de imagen para no colocar todo el url en el src
  const getImgFn = (id) => {

    const urlImg = `https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${props.imgPokemonsFn(id)}_00.png`
    
    return urlImg
  }


  // Creando infinity scroll, se identifica cuando esta al final del scroll y se pone un condicional para que espere que haga la llamada a la API para que no haga mas llamadas hasta que no termine la que se pidio
  const getEndScrollFn = () => {
    if(scrollFinish) {
      if(scrollActive) {
        if((pokemonPerPage + 40) < currentRegion.limitPokemon) {
          let currentScroll = valueScroll.current.scrollTop + valueScroll.current.offsetHeight
          if(currentScroll === valueScroll.current.scrollHeight) {
            setPokemonPerPage(pokemonPerPage + 20)
            setScrollActive(false)
          }
        } else {
          let currentScroll = valueScroll.current.scrollTop + valueScroll.current.offsetHeight
          if(currentScroll === valueScroll.current.scrollHeight) {
            const finishScrollLimit = currentRegion.limitPokemon - (pokemonPerPage + 20)
            setPokemonPerPage(currentRegion.limitPokemon - finishScrollLimit)
            setLimitPokemon(finishScrollLimit)
            console.log(currentRegion.limitPokemon - (currentRegion.limitPokemon - 20))
            setScrollActive(false)
            setScrollFinish(false)
          }
        }
      }
    }
    

  }

  const pokemonSearch = (event) => {
    event.preventDefault()

    history.push(`/pokedex/regions/${regionName}/${refPokemonSearch.current.value.toLowerCase()}`)
  }



  // Cuando haga clic en el input para hacer uns busqueda, va a hacer una peticion de todos los pokemones, con sus detalles para mostrar las opciones mientras va escribiendo
  const requestSearchPokemon = async() => {
    if(onlyRequestSearch) {
      const url = 'https://pokeapi.co/api/v2/pokemon'
      let response = await fetch(`${url}?limit=893&offset=0`);
      let data = await response.json();
      let results = data.results;
      let details = await props.getDetail(results)
      setListSearchPokemonDetail(details)
      setListSearchPokemon(results)
      setOnlyRequestSearch(false)
    }
  }


  // Capturamos el valor de input con onChange
  const catchValueSearchInput = (event) => {
    setValueSearchInput(event.target.value)
  }


  // Conseguimos las imagenes de cada pokemon filtrado
  const getImgPokemon = (pokemon) => {
    const detailPerPokemon = listSearchPokemonDetail.find( poke => pokemon === poke.name)
    return detailPerPokemon.sprites.front_default
  }

  return (
    <>
      <div className="search">
        <Link to={{
            pathname: `/pokedex/regions`
        }}>
            <ArrowBackIos className="icon-back-ios-regions" fontSize="large" />
        </Link>
        <div className="container-pokemon-search">
          <form className="form-pokemon-search" onSubmit={pokemonSearch}>
            <input onClick={() => requestSearchPokemon()} onChange={catchValueSearchInput} className="pokemon-search" ref={refPokemonSearch} type="text" placeholder="Search Pokemon"/>
            <button className="button-pokemon-search" type="submit">
              <ArrowForwardIos className="icon-submit-pokemon-search" fontSize="small" />
            </button>
          </form>
          <div ref={refListFilteredPokemon} className="filtered-pokemon-search">
            {
              // Filtramos los pokemones segun vamos buscando
              listSearchPokemon
              .filter( pokemon => {
                if(valueSearchInput === '') {
                  return null
                } else {
                  return (
                    pokemon.name
                      .toLowerCase()
                      .includes(
                        valueSearchInput
                          .toLowerCase()
                      )
                  )
                }
              })
              .map( (poke, index) => {
                if(index > 5) {
                  refListFilteredPokemon.current.style.height = "40vh"
                } else {
                  refListFilteredPokemon.current.style.height = ""
                }
                return (
                  <Link>
                    <div className="filtered-pokemon-option">
                      <img className="filtered-pokemon-img" src={getImgPokemon(poke.name)}/>
                      <h3 className="filtered-pokemon-name">{poke.name}</h3>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
      <div ref={valueScroll} onScroll={getEndScrollFn} className="pokedex-container">
      {
          pokemons.map( (pokemon, index) => {
            return (
              pokemonsDetails.length != 0 ? (
                <Card 
                  key={index + 1}
                  pokemon={pokemon}
                  img={getImgFn(pokemonsDetails[index].id)}
                  idPokemon={pokemonsDetails[index].id}
                  detailsPokemon={pokemonsDetails[index]}
                />
              ) : (
                <Skeleton variant="rect" height={150}/>
              )
            )
          })
          
      }
      </div>
    </>
  )
}

export default ContainerPokemons