// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

// Components
import App from './components/app.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';
import FriendsProvider from './providers/FriendsProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

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
