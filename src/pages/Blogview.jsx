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
} from '@chakra-ui/react';
import { BiLike, BiShare, BiChat } from '@chakra-ui/icons';
import { viewBlog } from '../redux/actions/blogActions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Blogview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogToView = useSelector((state) => state.blog);
  const { blog, loading } = blogToView;
  console.log(blog);
  //   const { title, owner, paragraphs, imageUrl, description } = blog;
  //   console.log(title);
  useEffect(() => {
    dispatch(viewBlog(id));
  }, []);
  return (
    <div>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Card maxW='md'>
          <CardHeader>
            <Flex spacing='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                  <Heading size='sm'>Blog creator id</Heading>
                  {/* <Text>{blog.owner}</Text> */}
                </Box>
              </Flex>
              <IconButton
                variant='ghost'
                colorScheme='gray'
                aria-label='See menu'
                //   icon={<BsThreeDotsVertical />}
              />
            </Flex>
          </CardHeader>
          <Image objectFit='cover' src={blog.imageUrl} alt='blog image' />
          <CardBody>
            <Text>{blog.description}</Text>
          </CardBody>
          <CardBody>
            <Heading>{blog.pragraphs.title}</Heading>
            <Text>{blog.pragraphs.description}</Text>
          </CardBody>
          <Image
            objectFit='cover'
            src={blog.paragraphs.imageUrl}
            alt='blog image'
          />

          <CardFooter
            justify='space-between'
            flexWrap='wrap'
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          ></CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Blogview;
