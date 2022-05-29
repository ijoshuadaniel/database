import React from 'react';
import './index.scss';

const Header = ({ showsignup, setSignApp, buttonText }) => {
  return (
    <div className='header'>
      <h3>IDatabase</h3>
      {showsignup && (
        <h3
          className='header-signUp'
          onClick={() => setSignApp((state) => !state)}
        >
          {buttonText}
        </h3>
      )}
    </div>
  );
};

export default Header;
