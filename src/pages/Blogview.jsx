import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Flex,
  Box,
  CardHeader,
  Text,
  Heading,
  IconButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialog,
  CardBody,
  CardFooter,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  useDisclosure,
} from '@chakra-ui/react';
import { viewBlog } from '../redux/actions/blogActions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../redux/actions/blogActions';
const Blogview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const blogs = useSelector((state) => state.blog);
  const { blog, loading, error } = blogs;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  console.log(blog, loading);
  const [tempTitle, setTempTitle] = useState(blog.title);
  const [tempDesc, setTempDesc] = useState(blog.description);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const cancelRef = useRef();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(viewBlog(id));
  }, [dispatch, id]);
  const handleSubmit = () => {};
  const handleDeleteBlog = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteBlog = () => {
    dispatch(deleteBlog(id));
    setIsDeleteDialogOpen(false);
  };

  const cancelDeleteBlog = () => {
    setIsDeleteDialogOpen(false);
  };
  return (
    <div>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>OOPS! Sorry.</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        blog && (
          <Card maxW='8xl'>
            <CardHeader>
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Box>
                    <Heading size='sm'>Blog creator id</Heading>
                    <Text>{blog.owner}</Text>
                  </Box>
                </Flex>
                {/* <IconButton
                variant='ghost'
                colorScheme='gray'
                aria-label='See menu'
                //   icon={<BsThreeDotsVertical />}
              /> */}
              </Flex>
            </CardHeader>
            <Image src={blog.imageUrl} alt='blog image' w={220} h={220} />
            <CardBody>
              <Heading>{blog.tile}</Heading>
              <Text>{blog.description}</Text>
            </CardBody>
            {/* <CardBody> */}
            {/* <Heading>{blog.pragraphs[0]?.title || ''}</Heading>
              <Text>{blog.pragraphs[0]?.description || ''}</Text>
            </CardBody>
            <Image src={blog.paragraphs[0]?.imageUrl || ''} alt='blog image' /> */}

            <CardFooter
              mb={10}
              justify='space-between'
              flexWrap='wrap'
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button
                colorScheme='blue'
                isDisabled={blog.owner != userInfo.userData._id}
                onClick={onOpen}
              >
                Edit
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit Blog</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder='Title'
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          placeholder='...'
                          value={tempDesc}
                          onChange={(e) => {
                            setTempDesc(e.target.value);
                          }}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' m={3} onClick={handleSubmit}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Button>
              <Button
                colorScheme='red'
                isDisabled={blog.owner != userInfo.userData._id}
                onClick={() => handleDeleteBlog(id)}
              >
                Delete
              </Button>
              <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Confirm Delete
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to delete this note?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={cancelDeleteBlog}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme='red'
                        onClick={confirmDeleteBlog}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
};

export default Blogview;
