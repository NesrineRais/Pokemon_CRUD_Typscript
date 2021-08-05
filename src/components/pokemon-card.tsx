import React , {FunctionComponent, useState,  useEffect} from "react";
import {Link, Redirect,useHistory} from 'react-router-dom';
import Pokemon from '../models/pokemon';
import FormDate from '../helpers/format-date'
import FormatType from '../helpers/format-type'
//props déclaration
type Props = {
    pokemon : Pokemon,
    borderColor?: string //definit un prop facultative: liée a typescript
}

const PokemonCard : FunctionComponent<Props> = ({pokemon, borderColor='#009688'})=>{

    const [color,setColor]=useState<string>();//string doit étre miniscule et borderColor
    //const [redirect,setRedirect]=useState<boolean>(false);
    const history = useHistory();

    const showBorder = ()=>{
        setColor(borderColor)
    }
    const hideBorder = ()=>{
        setColor("#f5f5f5"); //on remet la bordure en gris

    }
    // const showDetail = ()=>{
    //     console.log("click")
    //     setRedirect(true)
    // }
    const goToPokemon = (id:number)=>{//gestionnaire d'evenement
        history.push(`/List/${id}`)
    }
    return (
        <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={()=>goToPokemon(pokemon.id)}>
       {/*methode redirect { redirect && <Redirect to={"/List/"+pokemon.id} /> }*/}

            <div className="card horizontal" style={{ borderColor:color }}> {/* borderColor(c'est le props qu on a définit dans les props) */}
                <div className="card-image"> 
                    <img src={pokemon.picture} alt={pokemon.name} className="center"/>
                </div>
                <div className="card-stacked">
                        <div className="card-content" >
                            
                            <p> {pokemon.name}</p>
                            <p> {FormDate(pokemon.created)}</p>
                            <div>
                            {pokemon.types.map((type,index)=>{
                                    return <div key={index} className={FormatType(type)}>{type}</div>
                                })}
                            </div>
                               
                            
                         </div>
                </div>
                
              </div>
        </div>
    )
}

export default PokemonCard;