import React,{FunctionComponent,useEffect,useState}  from "react";
import Pokemon from "../models/pokemon"
import POKEMONS from "../models/mock-pokemon"
import formatType from '../helpers/format-type';
import { types } from '@babel/core';

type Props={
    pokemone: Pokemon
}

//declaration types modelisation formulaire

//modalisation champs dans le formulaire
type Field={
    value?: any,
    error?: string,
    isValid?: boolean
}

//modalisation type form

type Form = {
    name:Field,
    hp:Field,
    cp:Field,
    types: Field,

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
   
    const hasType = (type:string):boolean=>{
        return form.types.value.includes(type);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const fieldName: string = e.target.name;
        //console.log(fieldName)
        const fieldValue: string = e.target.value;
        //console.log(fieldValue)
        const newField: Field = { [fieldName]: { value: fieldValue } };


        //console.log("form",{...form})
        //console.log("newField",{...newField})

        setForm({ ...form, ...newField});
        //new state 
        //valeur newfiled écrase l'ancien valeur du form  
        //syntax ecmascript6 nommé Spread operator
    }
    const selectType= (type: string,e: React.ChangeEvent<HTMLInputElement>): void=>{

        const checked = e.target.checked;
        let newField: Field;
        console.log("type",type)

        if(checked) {
            console.log("type if checked",type)
            //si l utilisateur coche un type, à l ajout des types de pokemeon
            const newTypes: string[] = form.types.value.concat([type]);
            newField = {value : newTypes}
            //console.log("newField checked",newField)
            //console.log("newTypes",newTypes)

        }else{
            //si usuer décoche un type on le retire de la liste des types de pokémon.
            const newTypes: string[] = form.types.value.filter((currentTypes: string) => 
                  currentTypes !== type
            );
            //console.log(newTypes)
            newField = {value : newTypes}
            //console.log("newField else",newField)

        }

        setForm({...form,...{types:newField}})
        //console.log("{...newField}",{...{types:newField}})
        //console.log("{...form}",{...form})


        //si user coche un type, à l ajoute à la liste de type pokémone

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
                                     name="name"
                                     type="text" 
                                     className="form-control" 
                                     value={form.name.value}
                                     onChange={e=> handleInputChange(e)}
                                />
                                    
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
                                    onChange={e=>handleInputChange(e)}
                                />
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
                                    onChange={e=>handleInputChange(e)}
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
                                            checked={hasType(type)}
                                            onChange={e=>selectType(type,e)}
                                            //type c'est le type de pokemon et e c 'est l evenemnt cocher et decocher
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