// Dependencies
import React, { Component } from 'react';
import { auth, firestore, storage } from '../../firebase.js';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/core';
import ToastFileHelper from './ToastFileHelper.jsx';

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

  getfile = () => {
    return (
      <Flex direction="column" justify="center">
        <form
          onSubmit={this.handleSubmit}
          style={{ position: 'relative', border: 'black' }}
        >
          <Text mb="5%">
            1.{' '}
            <input
              type="file"
              id="file-import"
              style={{
                position: 'relative',
                textAlign: 'center',
                fontSize: '14px',
                background: 'white',
                width: '80%'
              }}
              ref={(ref) => (this.imageInput = ref)}
            />
          </Text>

          <Text>
            2.{' '}
            <Button
              type="submit"
              rounded="4px"
              w="50%"
              h="30px"
              textAlign="center"
              bg="#F7EEC7"
              _hover={{ bg: '#FFFF29' }}
            >
              <Icon name="download" /> Update Avatar
            </Button>
          </Text>
        </form>{' '}
      </Flex>
    );
  };

  render() {
    return (
      <Box align="center">
        <ToastFileHelper clear={this.clearFileUpload} getform={this.getfile} />
      </Box>
    );
  }
}

export default FileHelper;
