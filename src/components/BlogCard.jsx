import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineEditNote } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { viewBlog } from '../redux/actions/blogActions';

const BlogCard = ({ blog }) => {
  const MAX_DESCRIPTION_LENGTH = 100;

  const truncateDescription = (text) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) {
      return text;
    } else {
      return text.slice(0, MAX_DESCRIPTION_LENGTH) + '...';
    }
  };

  return (
    <div>
      <Card maxW='sm'>
        <CardBody pb={0}>
          <Image
            src={blog.imageUrl}
            alt='blog image'
            borderRadius='lg'
            h={150}
            w={220}
          />
          <Stack mt='6' spacing='1'>
            <Heading size='md'>{blog.title}</Heading>
            <Text>
              {truncateDescription(blog.description)}
              <Link to={`/${blog._id}`}>
                {' '}
                <b>Read more....</b>
              </Link>
            </Text>
          </Stack>
        </CardBody>

        {/* <CardFooter pt={0}>
          <ButtonGroup
            w={300}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button variant='solid' colorScheme='blue'>
              <MdOutlineEditNote />
            </Button>
            <Button variant='solid' colorScheme='red'>
              <RiDeleteBin6Line />
            </Button>
          </ButtonGroup>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default BlogCard;
