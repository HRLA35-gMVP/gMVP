// Dependencies
import React, { Component } from 'react';
import {
  auth,
  signInWithGoogle,
  signInWithEmail,
  createUserProfileDocument
} from '../../../../firebase.js';

// Declarations
const imageSrc =
  'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format';

class Login extends Component {
  state = {
    register: false,
    email: '',
    password: '',
    displayName: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleRegistration = async (e) => {
    if (this.state.register) {
      const { email, password, displayName } = this.state;

      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        createUserProfileDocument(user, { displayName });

        this.setState({
          register: false,
          email: '',
          password: '',
          displayName: ''
        });
      } catch (error) {
        console.error('handleRegistration Error:', error);
      }
    } else {
      this.setState({ register: true });
    }
  };

  handleEmalSignIn = async (e) => {
    try {
      await signInWithEmail(this.state.email, this.state.password);
    } catch (error) {
      console.error('handleEmalSignIn Error:', error);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          {this.state.register ? (
            <input
              type="text"
              name="displayName"
              value={this.state.displayName}
              placeholder="Display Name"
              onChange={this.handleChange}
            />
          ) : (
            <div>
              <button onClick={signInWithGoogle}>Google OAuth</button>
              <button onClick={this.handleEmalSignIn}>Email Login</button>
            </div>
          )}
          <button onClick={this.handleRegistration}>Register</button>
          {this.state.register ? (
            <button onClick={() => this.setState({ register: false })}>
              Cancel
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}

export default Login;
