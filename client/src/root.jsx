// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './components/app.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <UsersProvider>
      <App />
    </UsersProvider>
  </Router>,
  document.getElementById('root')
);
