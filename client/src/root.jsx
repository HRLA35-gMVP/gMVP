// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './components/app.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';

ReactDOM.render(
  <UsersProvider>
    <App />
  </UsersProvider>,
  document.getElementById('root')
);
