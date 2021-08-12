import Pokemon from "../models/pokemon"

export default class PokemonApi{

    static getPokemons(): Promise<Pokemon[]>{//Promise type table de donné
        return fetch('http://localhost:3001/pokemons')
          .then(response=>response.json())
          .catch(error=>this.handleError(error))         

    }
    
    static getPokemon(id: number): Promise<Pokemon|null>{
        return fetch('http://localhost:3001/pokemons/'+id)
             .then(response=>response.json())
             .then(data=>this.isEmpty(data) ? null : data)
             .catch(error=>this.handleError(error));
                    
    }
       
    static updatePokemn(pokemon: Pokemon) : Promise<Pokemon>{
        return fetch('http://localhost:3001/pokemons/'+pokemon.id,{
            method: 'PUT',
            //api rest comprend les donnée modifier
            body: JSON.stringify(pokemon),//methode javascript native transforme un objet on un chaine de caractere equivalente
            headers:{'Content-Type':'application/json'}
        })
        .then(response=>response.json())
        .catch(error=>this.handleError(error));
    

    }

    static deletePokemon(pokemon:Pokemon) : Promise<{}>{
        return fetch('http://localhost:3001/pokemons/'+pokemon.id, {
            method : 'DELETE',
            headers:{'Content-Type':'application/json'}
        
        })
        .then(response=>response.json())
        .catch(error=>this.handleError(error));

    } 

    static addPokemon(pokemon:Pokemon) : Promise <Pokemon>{
        return fetch('http://localhost:3001/pokemons/',{
            method:'Post',
            body: JSON.stringify(pokemon),
            headers:{'Content-Type':'application/json'}

        })
        .then(response=>response.json())
        .catch(error=>this.handleError(error));
    }


    static isEmpty(data: Object):boolean{
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error):void{
        console.log(error)
    }
}