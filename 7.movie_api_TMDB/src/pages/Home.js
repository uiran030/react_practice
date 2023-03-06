import React from 'react';
import HomeBody from '../components/HomeBody/HomeBody';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='home'>
      <div>
        <HomeBody />
      </div>
      <Footer />
    </div>
  );
};

export default Home;