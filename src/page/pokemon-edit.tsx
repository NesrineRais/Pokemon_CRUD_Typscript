import React,{FunctionComponent, useState,useEffect} from "react";
import {RouteComponentProps} from "react-router-dom"
import Pokemon from '../models/pokemon';//Pokemons c est un type
//import POKEMANS from "../models/mock-pokemon";//POKEMONS c est la liste des pokemons
import PokemonForm from "../components/pokemon-form";
import PokemonApi from '../api/pokemon-api';



type Params={
    id:string
}
//nous déclarant un prop de type id
//id de pokemon
//ensuite en passe l id dans le prop de composasnt {match}
const PokemonEdit : FunctionComponent<RouteComponentProps<Params>>=({match})=>{
    const [pokemon,setPokemon]= useState<Pokemon|null> (null)
    useEffect(()=>{
        PokemonApi.getPokemon(+match.params.id).then((pokemon)=>{
            setPokemon(pokemon)
        })


        
    },[match.params.id])
   

    return(
        <div className="container">
            
            {pokemon && 
                
                //definit props pokemon  pour passer une pokemon
                <div> 
                  <h2 className="center">Editer le {pokemon.name} </h2>
                  <PokemonForm pokemone={pokemon}/>
                </div>
            }
        </div>
    )
}

export default PokemonEdit;