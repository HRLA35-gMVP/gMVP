// Dependencies
import React, { Component } from 'react';
import { auth, firestore, storage } from '../../firebase.js';
import { Box, Button } from '@chakra-ui/core';

class FileHelper extends Component {
  imageInput = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.file) {
      storage
        .ref()
        .child('user-profiles')
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => this.userRef.update({ photoURL }));
    }
  };

  render() {
    return (
      <Box>
        <form onSubmit={this.handleSubmit}>
          <input type="file" ref={(ref) => (this.imageInput = ref)} />
          <Button type="submit">Upload</Button>
        </form>
      </Box>
    );
  }
}

export default FileHelper;
