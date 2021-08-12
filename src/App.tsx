import React , {FunctionComponent, useState,  useEffect} from 'react';
//import POKEMONS from './models/mock-pokemon'
//import Pokemon from './models/pokemon';
import PokemonList from './page/pokemon-list';
import './App.css';
import Header from './components/header';
import PokemonDetail from './page/pokemon-details';
import {Route, Switch} from 'react-router-dom';
import PageNotFound from './page/page-not-found';
import PokemonForm from './components/pokemon-form';
import PokemonEdit from './page/pokemon-edit';
import PokemonAdd from './page/pokemon-add';

const App: FunctionComponent = (props) => {
 //const name: String = 'React';
//const [pokmons, setPokemons] = useState<Pokemon[]> ([])

useEffect(() => {
   // const pokmons = setPokemons(POKEMONS)
   
}, [props])

// const formDate = (date:Date):string =>{
//    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}}`;
// }

//console.log(pokmons)
 return (
    <div className="App">
       <Header />
       <Switch>
        <Route exact path="/" component={PokemonList} />
         <Route exact path="/List" component={PokemonList} />
         <Route exact path="/List/:id" component={PokemonDetail} />
         <Route exact path="/Form" component={PokemonForm} />
         <Route  exact path="/Edit/:id" component={PokemonEdit} />
         <Route  exact path="/Add" component={PokemonAdd} />
        <Route component={PageNotFound}/> {/* route not found */}
       </Switch>
      
    </div>
   //  <div>
       
   //      <div className="container">
   //      <h1>Il y a {pokmons.length} pokemons</h1>
   //      <div className="row">
   //       {pokmons.map(({id,name,picture,created})=>{
          
   //          return(
   //             {created.toString()}
   //                  {formDate(created)}
   //                   <div className="col s4" key={id}>
   //                <div className="right">
   //                  <div> {name}</div>
   //                  </div>
   //               <img src={picture} className="left"/>
                  
   //             </div>
   //          )
   //       })}
   //    </div>
   //      </div>
    
    
 
 )
}
  
export default App;