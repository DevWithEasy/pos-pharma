import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import useUserStore from '../store/userStore';
import baseUrl from '../utils/baseUrl';
import toast_alert from '../utils/toast_alert';


const Delete_data = ({ id, path, remove, setRemove }) => {
  const { removeEntity } = useUserStore()
  const cancelRef = useRef()
  const { onClose } = useDisclosure()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const deleteData = async () => {
    setLoading(true)
    try {
      const res = await axios.delete(`${baseUrl}/api/${path}/delete/${id}`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      if (res.data.status === 200) {
        setLoading(false)
        removeEntity(path, id)
        setRemove(!remove)
        toast_alert(
          toast,
          res.data.message
        )
      }
    } catch (error) {
      setLoading(false)
      toast_alert(
        toast,
        error?.response?.data?.message,
        'error'
      )
    }
  }
  return (
    <>
      <AlertDialog
        isOpen={remove}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setRemove(false)
          onClose()
        }}
        className='bg-red-500'
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => {
                setRemove(false)
                onClose()
              }}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => deleteData()} ml={3}>
                {
                  loading ? 'Deleting...' : 'Delete'
                }
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Delete_data;