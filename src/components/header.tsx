import { types } from "@babel/core";
import React,{FunctionComponent} from "react"
import { Link } from "react-router-dom";

type Props={

}


const Header : FunctionComponent<Props>=()=>{
    return(
        <nav>
           <div className="container">
                
                    <Link to="/List">List Pokemon</Link>
               
            </div>
        </nav>
        
    )
}

export default Header;