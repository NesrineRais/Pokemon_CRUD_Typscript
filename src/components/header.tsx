import { types } from "@babel/core";
import React,{FunctionComponent} from "react"
import { Link } from "react-router-dom";

type Props={

}


const Header : FunctionComponent<Props>=()=>{
    return(
      
           <div className="header-nav">
                  <nav>
                        <Link to="/List">List Pokemon</Link> 
                        <Link to="/Add">Add Pokemon</Link>
                  </nav>
                

            </div>
        
    )
}

export default Header;