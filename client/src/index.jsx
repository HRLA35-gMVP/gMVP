// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

// Components
import App from './components/App.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';
import FriendsProvider from './providers/FriendsProvider.jsx';

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
       <UsersProvider>
         <FriendsProvider>
           <App />
         </FriendsProvider>
       </UsersProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
