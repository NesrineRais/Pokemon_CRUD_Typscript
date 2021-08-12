import React,{FunctionComponent, useState,  useEffect} from "react"
import PokemonApi from "../api/pokemon-api"
import Pokemon from '../models/pokemon';//Pokemons c est un type

type Props={
    pokemon: Pokemon
}
type Field={
    value?: any,
    error?: string,
    isValid?: boolean
}
type Form = {
    name:Field,
    hp:Field,
    cp:Field,
    types:Field
}
const PokemonAdd:  FunctionComponent<Props> = ({pokemon}) =>{
    const [form,setForm] = useState<Form>({
        name: {value:"", isValid:true},
        hp: {value:"", isValid:true},
        cp: {value:"", isValid:true},
        types: {value:"", isValid:true}
        
    });
    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

    }
    return(
        <div className="container">

            <h1>Add</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                  <div className="row">
                        <div className="card-image">
                            <input type="" />
                        </div>
                        <div className="card-stacked">
                                <div className="card-content">
                                    {/* Pokemon name */}
                                    <div className="form-group">
                                        <label htmlFor="name">Nom</label>
                                        <input
                                            id="name" 
                                            name="name"
                                            type="text" 
                                            className="form-control" 
                                            value={form.name.value}//la valeur de l input va contenir le state dans le formulaire qui contient name et sa valeur
                                            //onChange={e=> handleInputChange(e)}
                                        />
                                    {form.name.error && 
                                            <div className="card-panel red accent-1">
                                                {form.name.error}
                                            </div>
                                        }     
                                    </div>
                                    {/* Pokemon hp */}
                                    <div className="form-group">
                                        <label htmlFor="hp">Point de vie</label>
                                        <input 
                                            id="hp" 
                                            name="hp"
                                            type="number"
                                            className="form-control"
                                            value={form.hp.value}
                                            //onChange={e=>handleInputChange(e)}
                                        />
                                        {form.hp.error && 
                                            <div className="card-panel red accent-1">
                                                {form.hp.error}
                                            </div>
                                        }  
                                    </div>
                                    {/* Pokemon cp */}
                                    <div className="form-group">
                                        <label htmlFor="cp">Dégâts</label>
                                        <input 
                                            id="cp"
                                            name="cp"
                                            type="number" 
                                            className="form-control" 
                                            value={form.cp.value}
                                           // onChange={e=>handleInputChange(e)}
                                        />
                                        {form.cp.error && 
                                            <div className="card-panel red accent-1">
                                                {form.cp.error}
                                            </div>
                                        }  
                                    </div>
                                    {/* Pokemon types */}
                                    <div className="form-group">
                                        <label>Types</label>
                                        {types.map(type => (
                                            <div key={type} style={{marginBottom: '10px'}}>
                                            <label>
                                                <input 
                                                    id={type} 
                                                    type="checkbox"
                                                    className="filled-in"
                                                    value={type}
                                                   // disabled={!isTypesValid(type)}// ! => si le type n est pas valide nous verrouillons ce case a cocher
                                                   // checked={hasType(type)}
                                                  //  onChange={e=>selectType(type,e)}
                                                    //type c'est le type de pokemon et e c 'est l evenemnt cocher et decocher
                                                />
                                                    <span>
                                                        {/*<p className={formatType(type)}>{ type }</p> */}
                                                    </span>     
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-action center">
                                    {/* Submit button */}
                                    <button type="submit" className="btn">Valider</button>
                                </div>
                            </div>
                    </div>
            </form>
        </div>


    )
}

export default PokemonAdd;