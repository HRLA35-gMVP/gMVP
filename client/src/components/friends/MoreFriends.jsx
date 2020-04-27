import React from 'react';
import AddFriend from '../userPage/AddFriend.jsx';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/core';

const MoreFriends = () => {
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <React.Fragment>
      <Button
        bg="#FFB6BA"
        rounded="20px"
        fontSize="sm"
        w="80%"
        onClick={() => setIsOpen(true)}
      >
        Add more friends to your Profile
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Enter your Friend Code
          </AlertDialogHeader>

          <AlertDialogBody>
            <AddFriend />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="#BEEBE9" onClick={onClose} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default MoreFriends;
