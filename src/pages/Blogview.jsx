import React, { useEffect } from 'react';
import {
  Card,
  Flex,
  Box,
  CardHeader,
  Text,
  Heading,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Image,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';
import { BiLike, BiShare, BiChat } from '@chakra-ui/icons';
import { viewBlog } from '../redux/actions/blogActions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Blogview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const blogs = useSelector((state) => state.blog);
  const { blog, loading, error } = blogs;
  console.log(blog, loading);

  //   const { title, owner, paragraphs, imageUrl, description } = blog;
  //   console.log(title);
  useEffect(() => {
    dispatch(viewBlog(id));
  }, [dispatch, id]);
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
            <Image src={blog.imageUrl} alt='blog image' />
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
              justify='space-between'
              flexWrap='wrap'
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button colorScheme='blue'>Edit</Button>
              <Button colorScheme='red'>Delete</Button>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
};

export default Blogview;
