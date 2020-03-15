import React from 'react';
import Header from './elements/Header';
import { Home } from './Home';
import { createGlobalStyle } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import { Router } from '@reach/router'
import NotFound from './NotFound';
import Movie from './Movie';

const App = () => (
        <>
            <Header/>
            <Router>
                <Home path ='/' />
                <Movie path = '/:movieId' />
                <NotFound default />
            </Router>
            <GlobalStyle/>
        </>
        )

export default App;
