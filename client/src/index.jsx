// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

// Components
import App from './components/App.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';
import FriendsProvider from './providers/FriendsProvider.jsx';

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Router>
       <UsersProvider>
         <FriendsProvider>
          <App />
         </FriendsProvider>
       </UsersProvider>
     </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
