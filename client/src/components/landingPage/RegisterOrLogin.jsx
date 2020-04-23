// Dependencies
import React, { Component } from 'react';

// Components
import Register from './Register';
import Login from './Login';

class RegisterOrLogin extends Component {
  state = { register: false };

  render() {
    return this.state.register ? (
      <Register />
    ) : (
      <div>
        <Login />
        <button onClick={() => this.setState({ register: true })}>
          Register
        </button>
      </div>
    );
  }
}

export default RegisterOrLogin;
