import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import './slider.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import BlogCard from './BlogCard';
import { Divider, Heading, Flex, Text } from '@chakra-ui/react';
import { allBlogs } from '../redux/actions/blogActions';
const BlogSlider = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const { blogs } = blog;
  console.log(blogs);
  useEffect(() => {
    dispatch(allBlogs());
  }, []);
  return (
    <>
      <Divider />
      <Flex alignItems='center' justify='center'>
        <Text>Blogs..</Text>
      </Flex>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        style={{ marginBottom: '20px' }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {blogs.map((blog) => {
          return (
            <SwiperSlide>
              <BlogCard key={blog._id} blog={blog} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default BlogSlider;
