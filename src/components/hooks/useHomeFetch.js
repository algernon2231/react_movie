import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL } from '../../config'

export const useHomeFetch = search  => {
    const [state, setState]=  useState({ movies : []})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);

    const fetchMovies = async endpoint => {
        setError(false);
        setLoading(true);
        const isLoadMore =  endpoint.search('page');

            await fetch(endpoint)
            .then(response => response.json())
            .then(
               result => {
                setState(prev => ({
                    ...prev,
                    movies: isLoadMore !== -1 ? [...prev.movies, ...result.results]
                    : [...result.results],
                    heroImage: prev.heroImage || result.results[0],
                    currentPage : result.page,
                    totalPages: result.total_pages
                }))
               }  
            )
            .catch(error => {
                setError(true);
                
            })
           
        setLoading(false) 
    }   
    useEffect(() => {
        if(sessionStorage.homeState){
            
            setState(JSON.parse(sessionStorage.homeState));
            setLoading(false);

        }else {
           
            fetchMovies(POPULAR_BASE_URL);
        }
    }, [])

    useEffect(() => {
        if(!search){
            sessionStorage.setItem('homeState',JSON.stringify(state))
        }
    })
    

    return [{state,loading,error},fetchMovies]

}