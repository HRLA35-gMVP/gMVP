// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';


// Components
import App from './components/app.jsx';

// evelyn's tests
//import EditProfile from './components/userPage/EditProfile.jsx';
//import ForgotPassword from './components/password/ForgotPw.jsx';
import CheckEmail from './components/password/CheckEmail.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';


// ReactDOM.render(
//   <ThemeProvider>
//     <CSSReset />
//     <Router>
//       <UsersProvider>
//         <App />
//       </UsersProvider>
//     </Router>
//   </ThemeProvider>,
//   document.getElementById('root')
// );


// for evelyn's testing
//ReactDOM.render(<EditProfile />, document.getElementById('evelyn'));
// ReactDOM.render(<ForgotPassword />, document.getElementById('evelyn'));
ReactDOM.render(<CheckEmail />, document.getElementById('evelyn'));