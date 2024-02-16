import '../../css/exercise.css';
import Nav_public from './nav_public';
import BreathingExercise from '../breathing';
import { useState, useEffect } from 'react';
import Unscramble from '../Unscramble/Unscramble';



export default function Exercise_public() {
    return (
        <body>
            <Nav_public color = 'black' page = 'exercise' absolute = 'true' rIcon = 'black'/>
            <Exercise_main_public />
        </body>
    );
}

function Exercise_main_public (){

    useEffect(() => {
        document.body.style.overflow = 'auto';
      }, [])

    const [breathExe, setBreathExe] = useState(false);

    const handleBreathExe = () => {
        setBreathExe(true)
        document.body.style.overflow = 'hidden';
    }
    const handleBreathExeClose = () => {
        setBreathExe(false)
        document.body.style.overflow = 'auto';
    }

    const handleUnscramble = () => {
        setUnscramble(true)
        document.body.style.overflow = 'hidden';
    }
    const handleUnscrambleClose = () => {
        setUnscramble(false)
        document.body.style.overflow = 'auto';
    }

    const [unscramble, setUnscramble] = useState(false);

    return(
        <div>
            <div class="hero-exe">
                <div class="hero-cntxt-exe">
                    <h1>Breathing Exercise</h1>
                    <p>Revitalize your mind and body with our rejuvenating breathing exercise, designed to bring tranquility and focus into your daily life.</p>
                    <a class = "btn-mn" onClick={handleBreathExe}>Try me</a>
                </div>
                <div class="hero-img-exe">
                    <img src = "/img/exercise.png" />
                </div>
            </div>


            <div class="exercise">
                <div class="h1">
                    <h1>Other assessments</h1>
                </div>
                <div class="container-exe">
                    <div class="wrapper-exe">
                        <h2>Unscramble</h2>
                        <p>Unscramble is a word game where you rearrange mixed-up letters to make real words, testing your brain and vocabulary while having fun.</p>
                        <button onClick={handleUnscramble}>Try me</button>
                    </div>
                </div>
            </div>

            <div style={{display: breathExe ? 'flex' : 'none', top: `${window.scrollY}px`}} className='unscramble'>
                <div className='close-btn-breathing' onClick={handleBreathExeClose}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <BreathingExercise />
            </div>
            <div style={{display: unscramble ? 'flex' : 'none', top: `${window.scrollY}px`, overflowY: 'scroll'}} className='unscramble'>
                <Unscramble handleUnscrambleClose={handleUnscrambleClose}/>
            </div>


        </div>
    );
}