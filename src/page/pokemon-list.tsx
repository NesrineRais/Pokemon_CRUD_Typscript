import React , {FunctionComponent, useState,  useEffect} from "react";
import {Redirect } from 'react-router-dom';
import Pokemon from "../models/pokemon";
import PokemonCard from "../components/pokemon-card";
import PokemonApi from "../api/pokemon-api"

const PokemonList: FunctionComponent = () =>{
    const [pokmons, setPokemons] = useState<Pokemon[]> ([]);
    const [redirect,setRedirect] = useState<boolean>(false);

    useEffect(() => {
        //methode static
      
        
            PokemonApi.getPokemons().then(
                
                pokemons => ( setPokemons(pokemons))
            )

        
     }, [])
     const addPokemon=()=>{

     }
     return(
       
            <div className="container">
        
                {pokmons  ? ( <div>
                      <h1 className="center">Pokémons</h1>
                       <div className="botton-add-pokemon">
                            <button onClick={addPokemon} >
                                <span className="material-icons ">
                                   add_circle_outline
                                </span>
                            </button>
                       </div>
                       <div className="row">
                           {pokmons.map((pokmon)=>{
                                   //console.log(pokmon)
                                   //pokemon c est le props dans pokeemon card
                                   return <PokemonCard key={pokmon.id} pokemon={pokmon} />
                           })}
                               
                           
                       </div>
                    </div>) :<Redirect to="/" /> }
         
                
                    
             </div>
      
     )

   
}
export default PokemonList;