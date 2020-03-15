import React from 'react'
import { StyledSearchBar, StyledSearchBarContent} from '../styles/StyledSearchBar'
import FontAwesome from 'react-fontawesome' ;
import { PropTypes } from 'prop-types';



export const SearchBar = ({ callback}) => {
    const doSearch = (e) => {
        callback(e.target.value)
    }
    return (
       <StyledSearchBar>
           <StyledSearchBarContent>
               <FontAwesome className="fa-search" name="search" size="2x"/>
               <input type="text"
               placeholder="Search Movie"
               onChange = {doSearch}/>
           </StyledSearchBarContent>
       </StyledSearchBar>
    )
}

SearchBar.propTypes = {
  callback : PropTypes.func
}
