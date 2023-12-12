import React, { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Text, Heading, Divider, Flex, Stack } from '@chakra-ui/react';
// import './slider.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import CategoryCard from './CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../redux/actions/blogActions';

const CategoriesSlider = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const { categories } = blog;
  // console.log(categories);
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  return (
    <>
      <Stack alignItems='center'>
        <Divider w={window.innerWidth / 2} mb={0} />
        <Heading>Categories</Heading>
      </Stack>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        style={{ margin: '10px 0px' }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {categories.map((category, index) => {
          return (
            <SwiperSlide>
              <CategoryCard key={index} category={category} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CategoriesSlider;
