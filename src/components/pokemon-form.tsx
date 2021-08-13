import React,{FunctionComponent,useEffect,useState}  from "react";
import {Link, Redirect,useHistory} from 'react-router-dom';
import Pokemon from "../models/pokemon"
import POKEMONS from "../models/mock-pokemon"
import formatType from '../helpers/format-type';
import { types } from '@babel/core';
import PokemonApi from '../api/pokemon-api';




type Props={
    pokemone: Pokemon
}

//declaration types modelisation formulaire

//modalisation champs dans le formulaire
//chaque champs a une valeur,message d eroor et propriété si valid ou nn
type Field={
    value?: any,
    error?: string,
    isValid?: boolean
}

//declare le formulaire avec les champs qui existe

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
        
    
    //de la ligne 38 a 41 on declare les states qui représente les champs et les donné et de formulaire
    const history = useHistory();
    const [redirect, setRedirect] = useState(false)

    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];
    //methode "hasType" prend en parametre le "type" et renvois(boolean) :
    //si ce type apartient au pokemon ou nn
    //si c'est le cas  la case de type sa sera cocher si non elle reste n est pas cocher
    const hasType = (type:string):boolean=>{
        return form.types.value.includes(type);
    }
    //methode hastype renvois un booleen permettant de savoir si ce type passer en parametre appartient au pokemon oi ou nn
    //on utilise methode javascript includes pour savoir si c'est le bon type oui ou nn

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const isFomValid = valiateForm()

        if(isFomValid){
           console.log("pokemone.name",pokemone.name)
           console.log("form.name.value",form.name.value)
           pokemone.name=form.name.value
           pokemone.hp = form.hp.value
           pokemone.cp = form.cp.value
           pokemone.types = form.types.value
            PokemonApi.updatePokemn(pokemone)
                .then((pokemon)=>{ history.push(`/List/${pokemone.id}`)})
        }

    }
    

    //methode verification régle des champs
    const valiateForm =() =>{
        let newForm: Form = form;
        //validator name
       // Validator name
       //regex : [a-zA-Zàéè ] accept caracter de a à z et majuscul 
       //{3,25} accepte de 3 a 25 caracter
        if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ name: newField } };
        } else {
            const newField: Field = { value: form.name.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ name: newField } };
        }
  
        // Validator hp
        if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
            const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
            newForm = { ...newForm, ...{ hp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ hp: newField } };
        }
    
        // Validator cp
        if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99';
            const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
            newForm = { ...newForm, ...{ cp: newField } };
        } else {
            const newField: Field = { value: form.cp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ cp: newField } };
        }
    
        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    const isTypesValid = (type:string): boolean=>{
        if(form.types.value.length === 1 && hasType(type)){
            return false

        }
        //si user selection un seule case il faut empecher de deselectionner cette case
        //appel class hastype pour verifier que nous veruilleon pas des cases que l utilisateuur deja selectionner
        if(form.types.value.length === 3 && !hasType(type)){
            return false

        }
        //si user a selectinner 3 case alors on l enpeche de selectionner un autre 
        //mais il peut deselctonner un autre type
        return true
    }
   //isTypevalid return true ou false si la case a cocher est verouiller ou nn
   const deletePokemon = () =>{
     
           PokemonApi.deletePokemon(pokemone).then(()=>{
               history.push('/List')
           })
       
   }
    return(
        <div>
            <button onClick={deletePokemon} className="right">
                <span className="material-icons  md-18">
                    delete
                </span>                     
            </button>
            <form onSubmit={e=>handleSubmit(e)}>
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
                                            value={form.name.value}//la valeur de l input va contenir le state dans le formulaire qui contient name et sa valeur
                                            onChange={e=> handleInputChange(e)}
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
                                            onChange={e=>handleInputChange(e)}
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
                                            onChange={e=>handleInputChange(e)}
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
                                                    disabled={!isTypesValid(type)}// ! => si le type n est pas valide nous verrouillons ce case a cocher
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
        </div>
        
    )
}   

export default PokemonForm;