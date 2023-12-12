import React from 'react';
import Navbar from '../components/Navbar';
import Carousel1 from '../components/Carousel1';
import CategoriesSlider from '../components/CategoriesSlider';
import BlogSlider from '../components/BlogSlider';
import Footer from '../components/Footer';
const Homepage = () => {
  return (
    <div>
      <Carousel1 />
      <BlogSlider />
      <CategoriesSlider />
      <Footer />
    </div>
  );
};

export default Homepage;
