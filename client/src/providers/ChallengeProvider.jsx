// Dependencies
import React, { Component, createContext } from 'react';
import { firestore } from '../firebase.js';

// Context
export const ChallengeContext = createContext([{}]);

class ChallengeProvider extends Component {
  state = {
    CUID: window.location.href.slice(
      window.location.href.length - 20,
      window.location.href.length + 20
    )
  };

  unsubscribeFromChallenge = null;

  componentDidMount = async () => {
    this.unsubscribeFromChallenge = firestore
      .collection('challenges')
      .doc(this.state.CUID)
      .onSnapshot((snapshot) => this.setState({ ...snapshot.data() }));
  };

  componentWillUnmount = () => {
    this.unsubscribeFromChallenge();
  };

  render() {
    const { children } = this.props;

    return (
      <ChallengeContext.Provider value={this.state}>
        {children}
      </ChallengeContext.Provider>
    );
  }
}

export default ChallengeProvider;
