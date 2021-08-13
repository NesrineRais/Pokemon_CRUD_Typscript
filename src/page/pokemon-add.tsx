import React,{FunctionComponent, useState,  useEffect} from "react"
import PokemonApi from "../api/pokemon-api"
import Pokemon from '../models/pokemon';//Pokemons c est un type
import PokemonForm from "../components/pokemon-form";



const PokemonAdd:  FunctionComponent = () =>{
    const [id]=useState<number>(new Date().getTime()); //function natif javascript permet de crer un id unique en miliseconde
    const [pokemon] = useState<Pokemon>(new Pokemon(id))//creer pokemon vierge avec id unique
    
 
    return(
        <div className="container">
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <h1 className="center">Add</h1>
                    <PokemonForm pokemone={pokemon}/>
                </div>
            </div>
           
           
        </div>


    )
}

export default PokemonAdd;