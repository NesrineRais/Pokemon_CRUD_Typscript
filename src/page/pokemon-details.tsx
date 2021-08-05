import React,{FunctionComponent, useState,  useEffect} from "react"
import { RouteComponentProps, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';

type Params={
    id:string
};
//console.log(POKEMONS)
const PokemonDetail : FunctionComponent<RouteComponentProps<Params>>=({match})=>{
    const [pokemon,setPokemons]=useState<Pokemon|null>(null)
    
    useEffect(()=>{
       POKEMONS.forEach((pokemon)=>{
           if(match.params.id===pokemon.id.toString()){
            setPokemons(pokemon)
           }
       })
       
    },[match.params.id])
    
    return(
        <div>
            {pokemon ? (
                 <div className="row">
                     <div className="col s12 m8 offset-m2">
                        <div className="card hoverable"> 
                            
                            <div className="col s12 m8 offset-m2"> 
                                <h2 className="header center">{ pokemon.name }</h2>
                                     <div className="card hoverable"> 
                                        <div className="card-content">
                                            <div className="card-image">
                                                <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
                                                <Link to={"/Edit/"+pokemon.id} className="right">
                                                    <span className="material-icons md-18">
                                                          mode_edit_outline
                                                    </span>
                                                    
                                                </Link>

                                            </div>
                                        </div>
                                        <div className="card-stacked">
                                            <div className="card-content">
                                            <table className="bordered striped">
                                                <tbody>
                                                <tr> 
                                                    <td>Nom</td> 
                                                    <td><strong>{ pokemon.name }</strong></td> 
                                                </tr>
                                                <tr> 
                                                    <td>Points de vie</td> 
                                                    <td><strong>{ pokemon.hp }</strong></td> 
                                                </tr> 
                                                <tr> 
                                                    <td>Dégâts</td> 
                                                    <td><strong>{ pokemon.cp }</strong></td> 
                                                </tr> 
                                                <tr> 
                                                    <td>Types</td> 
                                                    <td>
                                                    {pokemon.types.map(type => (
                                                    <span key={type} className={formatType(type)}>{type}</span>
                                                    ))}</td> 
                                                </tr> 
                                                <tr> 
                                                    <td>Date de création</td> 
                                                    <td>{formatDate(pokemon.created)}</td> 
                                                </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                            <div className="card-action">
                                                <Link to="/">Retour</Link>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <div>il y a pas de pokemon</div>
            )}
        </div>
        
           
        
    )
}

export default PokemonDetail;