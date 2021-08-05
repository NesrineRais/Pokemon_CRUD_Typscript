import React , {FunctionComponent, useState,  useEffect} from "react";
import Pokemon from "../models/pokemon";
import POKEMONS from '../models/mock-pokemon'
import PokemonCard from "../components/pokemon-card";


const PokemonList: FunctionComponent = () =>{
    const [pokmons, setPokemons] = useState<Pokemon[]> ([]);

    useEffect(() => {
        setPokemons(POKEMONS)
        
     }, [])
     return(
        <div className="container">
                 <h1 className="center">Pokémons</h1>
                 <div className="row">
                        {pokmons.map((pokmon)=>{
                            //console.log(pokmon)
                            //pokemon c est le props dans pokeemon card
                            return( <PokemonCard key={pokmon.id} pokemon={pokmon} />
                                )
                        })}
                 </div>
         </div>
     )

   
}
export default PokemonList;