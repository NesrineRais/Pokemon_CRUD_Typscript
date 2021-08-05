import React,{FunctionComponent, useState,useEffect} from "react";
import {RouteComponentProps} from "react-router-dom"
import Pokemon from '../models/pokemon';//Pokemons c est un type
import POKEMANS from "../models/mock-pokemon";//POKEMONS c est la liste des pokemons
import PokemonForm from "../components/pokemon-form";
type Params={
    id:string
}
//nous déclarant un prop de type id
//id de pokemon
//ensuite en passe l id dans le prop de composasnt {match}
const PokemonEdit : FunctionComponent<RouteComponentProps<Params>>=({match})=>{
    const [pokemon,setPokemon]= useState<Pokemon|null> (null)
    useEffect(()=>{
        POKEMANS.forEach((pokemon)=>{
            //console.log(pokemon)
            if(match.params.id === pokemon.id.toString()){
                setPokemon(pokemon)
            }
        })
    },[match.params.id])
   

    return(
        <div>
            
            {pokemon ? (
                
                //definit props pokemon  pour passer une pokemon
              <div> 
                  <h2>Editer le {pokemon.name} </h2>
                  <PokemonForm pokemone={pokemon}/>
                </div>
            ):(
                <div>N'existe pas ce pokemon</div>
            )}

        </div>
    )
}

export default PokemonEdit;