import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  useBreakpointValue,
  useColorModeValue,
  Container,
  Heading,
  HStack,
  Text,
  Textarea,
  FormControl,
  Stack,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  useToast,
  Input,
  FormLabel,
  Select,
} from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import {
  useNavigate,
  Link as ReactLink,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { createBlog, listCategories } from '../redux/actions/blogActions';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  // console.log(userInfo);
  const blog = useSelector((state) => state.blog);
  const { categories, loading, error, blogFlag } = blog;
  console.log(blogFlag);
  const location = useLocation();
  // console.log(location.state)

  const toast = useToast();

  const headingBR = useBreakpointValue({ base: 'sm', md: 'md' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [paragraphs, setParagraph] = useState({
    title: '',
    description: '',
    image: null,
    imageUrl: '',
  });
  const [key, setKey] = useState(0);
  const [l, setL] = useState(false);

  const uploadImage = async (image) => {
    setL(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      console.log(formData);
      const response = await axios.post(
        'https://blog-backend-86a4.onrender.com/api/image/upload',
        formData
      );
      console.log(response, 'image');
      setL(false);
      if (response.data.status === 'success') {
        console.log('Image uploaded successfully', response.data.imageUrl);

        return response.data.imageUrl;
      } else {
        console.log('Failed to upload image');
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  let handleParagraphChange = (e) => {
    setParagraph((prevParagraph) => ({
      ...prevParagraph,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      toast({
        description: 'you have to login first to create blog post',
        status: 'info',
        isClosable: true,
        position: 'top-left',
      });
    }
  }, [userInfo, toast]);

  let handleSubmit = async (event) => {
    event.preventDefault();
    let imgUrl = await uploadImage(image);

    let p_imgUrl = await uploadImage(image);

    console.log(
      {
        title,
        description,
        imageUrl: imgUrl,
        category,
        paragraphs: {
          title,
          description,
          imageUrl: p_imgUrl,
        },
      },
      'blog data'
    );
    dispatch(
      createBlog({
        title,
        description,
        imageUrl: imgUrl,
        category,
        paragraphs: {
          title: paragraphs.title,
          description: paragraphs.description,
          imageUrl: p_imgUrl,
        },
      })
    );

    setTitle('');
    setDescription('');

    setImage(null);
    setKey(key + 1);
    setCategory('');
    setParagraph({
      title: '',
      description: '',
      image: null,
      imageUrl: '',
    });
  };

  return userInfo ? (
    <Container
      maxW='4xl'
      py={{ base: '12', md: '8' }}
      px={{ base: '0', md: '8' }}
      maxH='4xl'
    >
      <Stack spacing='6'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={headingBR}>Create Blog</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', md: '8' }}
          px={{ base: '4', md: '10' }}
          bg={{ boxBR }}
          boxShadow={{ base: 'none', md: 'xl' }}
        >
          <Stack spacing='6' as='form' onSubmit={handleSubmit}>
            {error && (
              <Alert
                status='error'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
              >
                <AlertIcon />
                <AlertTitle>OOPS!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Stack spacing='5'>
              <Stack spacing='8'>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type='text'
                    name='title'
                    placeholder='Title'
                    my={1}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <FormLabel>Description</FormLabel>
                  <Textarea
                    //   w='270px'
                    h='120px'
                    my={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                    size='sm'
                    borderRadius={5}
                  />

                  <FormLabel>Image</FormLabel>
                  <Input
                    key={key}
                    type='file'
                    placeholder='image'
                    my={1}
                    onChange={(e) => setImage(e.target.files?.[0])}
                  />

                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder='Select category'
                    my={1}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category, index) => {
                      return <option key={index}>{category}</option>;
                    })}
                  </Select>
                </FormControl>
                <Box boxShadow='inner' rounded='md' p={5}>
                  <FormControl>
                    <FormLabel>Paragraph Title</FormLabel>
                    <Input
                      type='text'
                      name='title'
                      placeholder='Title'
                      my={1}
                      value={paragraphs.title}
                      onChange={handleParagraphChange}
                    />

                    <FormLabel>Paragraph</FormLabel>
                    <Textarea
                      my={1}
                      //   w='270px'
                      name='description'
                      h='150px'
                      value={paragraphs.description}
                      onChange={handleParagraphChange}
                      placeholder='include your paragraph'
                      size='sm'
                      borderRadius={5}
                    />

                    <FormLabel>Image</FormLabel>
                    <Input
                      key={key}
                      type='file'
                      placeholder='image'
                      name='image'
                      my={1}
                      onChange={(e) => {
                        setParagraph({
                          ...paragraphs,
                          image: e.target.files?.[0],
                        });
                      }}
                    />
                  </FormControl>
                </Box>
              </Stack>
            </Stack>
            <Stack
              spacing='6'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Button
                size='md'
                fontSize='lg'
                isLoading={loading || l}
                type='submit'
                w={170}
                bgGradient='linear(to-r, teal.500, green.500)'
                color='white'
                _hover={{
                  bgGradient: 'linear(to-r, teal.500, green.600,yellow.100)',
                  color: 'black',
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  ) : (
    <>
      <Navigate to='/login' replace={true} state={{ from: location }} />
    </>
  );
};

export default CreateBlog;
