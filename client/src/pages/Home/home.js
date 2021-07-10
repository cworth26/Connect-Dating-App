import React from 'react';
import './home.css';

const Home = (props) => {
  return( 
  <div
  className='hero-container'
  style={{
    width: "100%",
    height: "100vh",
    backgroundImage: `url('https://www.wallpaperflare.com/man-and-woman-holding-hands-couple-holding-each-other-hands-wallpaper-zpthv')`,
    backgroundPosition: "fixed",
    backgroundSize: "cover",
  }}
>
  <h1>Connect the Dots to True Love...</h1>
  <p>What are you waiting for?</p>
  <div className='home-btns'>
    {/*<Button 
      className='btns'
      buttonStyle='btn--outline'
      buttonSize='btn--large'
      >
      GET STARTED
    </Button>*/}
  </div>
  </div>
  )
}

Home.propTypes = {};

export default Home;
