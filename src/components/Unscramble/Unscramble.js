import React from 'react';
import './Unscramble.css';

import Header from './Header';
import GameBoard from "./GameBoard";
import Footer from "./Footer";

function Unscramble({handleUnscrambleClose}) {
  return (
    <div className='unscramble'>
      <div className='close-btn' onClick={handleUnscrambleClose}>
          <ion-icon name="close"></ion-icon>
      </div>
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default Unscramble;
