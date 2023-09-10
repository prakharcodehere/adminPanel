import React from "react";
import "./SearchBar.css"

const SearchBar =({search}) => {

    
        const Update = (e) => {
          search(e);
        };


    return(
        <div className="search-bar">
 <input type="text" placeholder="Search by name, email or role"   onChange={Update}/>
         
        </div>
       
    )
}

export default SearchBar;