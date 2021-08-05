import React,{FunctionComponent,useEffect,useState}  from "react";
import Pokemon from "../models/pokemon"
import POKEMONS from "../models/mock-pokemon"
import formatType from '../helpers/format-type';

type Props={
    pokemone: Pokemon
}

//declaration types modelisation formulaire

//modalisation champs dans le formulaire
type Field={
    value:any,
    erroe?:string,
    isValid?:boolean
}

//modalisation type form

type Form = {
    name:Field,
    hp:Field,
    cp:Field,
    types: Field
}

const PokemonForm : FunctionComponent<Props>=({pokemone})=>{
    const [form, setForm] = useState<Form>({
        name: {value:pokemone.name, isValid:true},
        hp:{value:pokemone.hp,isValid:true},
        cp:{value:pokemone.cp,isValid:true},
        types:{value:pokemone.types,isValid:true}

    });
    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
      ];
   
    const hastype = (type:string):boolean=>{
        return form.types.value.includes(type);
    }
    return(
       <form>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                     <div className="card-image">
                            <img src={pokemone.picture} alt={pokemone.name} style={{width: '250px', margin: '0 auto'}}/>
                    </div>
                     <div className="card-stacked">
                        <div className="card-content">
                            {/* Pokemon name */}
                            <div className="form-group">
                                 <label htmlFor="name">Nom</label>
                                <input
                                     id="name" 
                                     type="text" 
                                     className="form-control" 
                                     value={form.name.value}
                                />
                                    
                            </div>
                            {/* Pokemon hp */}
                            <div className="form-group">
                                 <label htmlFor="hp">Point de vie</label>
                                 <input id="hp" type="number"
                                  className="form-control"
                                  value={form.hp.value}
                                />
                            </div>
                            {/* Pokemon cp */}
                            <div className="form-group">
                                 <label htmlFor="cp">Dégâts</label>
                                 <input id="cp"
                                  type="number" 
                                  className="form-control" 
                                  value={form.cp.value}
                                />
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
                                            checked={hastype(type)}
                                        />
                                        <span>
                                              <p className={formatType(type)}>{ type }</p>
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
            </div>
       </form> 
    )
}   

export default PokemonForm;