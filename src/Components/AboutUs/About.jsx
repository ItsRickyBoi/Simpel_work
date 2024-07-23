import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <main className="card-content">
        <div className="card">
          <h2>More Efficient</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <img src="/assets/clock.png" alt="Clock icon" />
        </div>
        <div className="card">
          <h2>Better Management</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <img src="/assets/book.png" alt="Book icon" />
        </div>
        <div className="card">
          <h2>Easier to Maintain</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <img src="/assets/book.png" alt="Book icon" />
        </div>
        <div className="card">
          <h2>New Card</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <img src="/assets/clock.png" alt="Clock icon" />
        </div>
        <div className="card">
          <h2>Another Card</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <img src="/assets/book.png" alt="Book icon" />
        </div>
        <div className="card">
          <h2>Yet Another Card</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          <img src="/assets/clock.png" alt="Clock icon" />
        </div>
      </main>
    </div>
  );
};

export default About;
