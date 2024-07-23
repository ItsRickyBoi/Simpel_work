import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <div className="home-container">
      <main className="main-content">
        <div className="content-left">
          <h1>Easier Management</h1>
          <p>More productivity</p>
          <p>Less Worry</p>
          <button className='button-learn' onClick={handleLearnMoreClick}>Learn More</button>
        </div>
        <div className="content-right">
          <a href='#'>
            <div className="picture-placeholder">
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
