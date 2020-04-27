import React, { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/core';

function ToastFileHelper(props) {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        w="22%"
        h="20px"
        bg="#E8E8E8"
        fontSize="12px"
        ml="auto"
        mr="auto"
        boxShadow="1px 2px 2px #A2A2A2"
        position="absolute"
        onClick={() => setIsOpen(true)}
      >
        Edit Avatar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Upload Photo
          </AlertDialogHeader>

          <AlertDialogBody>{props.getform()}</AlertDialogBody>

          <AlertDialogFooter>
            <Button bg="#FFB6BA" onClick={onClose} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ToastFileHelper;
