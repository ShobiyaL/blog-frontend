import Carousel from 'react-bootstrap/Carousel';

import img1 from '../images/Orange & Purple Geometric Tehnology Linkdln Banner.png';
import img2 from '../images/Clean Work Place LinkedIn Banner.png';
import img3 from '../images/Clean Work Place LinkedIn Banner (1).png';
import img4 from '../images/Clean Work Place LinkedIn Banner (2).png';
import img6 from '../images/Blue Modern Lets Do This LinkedIn Banner.png';
import img7 from '../images/Simple Work LinkedIn Banner.png';
const Carousel1 = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          src={img1}
          alt='banner-1'
          style={{ height: '280px', width: '100%' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={img2}
          alt='banner-2'
          style={{ height: '280px', width: '100%' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={img3}
          alt='banner-3'
          style={{ height: '280px', width: '100%' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={img4}
          alt='banner-4'
          style={{ height: '280px', width: '100%' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={img6}
          alt='banner-5'
          style={{ height: '280px', width: '100%' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={img7}
          alt='banner-6'
          style={{ height: '280px', width: '100%' }}
        />
      </Carousel.Item>
      {/* <Carousel.Item>
        <ExampleCarouselImage text='Third slide' />
        <Carousel.Caption>
          <img src={img3} alt='banner-3' />
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default Carousel1;
