import { useState,useEffect, useCallback } from 'react';

import {API_KEY, API_URL } from '../../config'

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const fetchData = useCallback(
      
       async () => {
            try {
                const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
               const result =  await fetch(endpoint).then(res=> res.json());
                const creditEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
               const credits =  await fetch(creditEndpoint).then(res=> res.json());

                const directors = credits.crew.filter(member => member.job ==='Director')

                setState({
                    ...result,
                    actors:credits.cast,
                    directors
                })
            }
            catch(error){
                setError(true);
                console.log(error)
            }
            
            setLoading(false);
        },
        [movieId],
    )

    useEffect(() => {
        if(localStorage.getItem(movieId)){
         
            setLoading(false);
            setState(JSON.parse(localStorage.getItem(movieId)));
        }else{
           
            fetchData()
        }
    },[movieId,fetchData]) ;

    useEffect(() =>{
        localStorage.setItem(movieId, JSON.stringify(state)) 
    },[movieId, state]);
    return [{state,loading,error}] ;
}

   