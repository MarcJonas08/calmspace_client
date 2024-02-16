import '../../css/nav.css';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Nav_public(props) {

        const [isProfHovered, setIsProfHovered] = useState(false);

        
        const handleMouseOver_Prof= () => {
          setIsProfHovered(!isProfHovered);
        };

        const handleMouseLeave_Prof= () => {
            setIsProfHovered(false);
        };

        const stillProfPop = () => {
            setIsProfHovered(true);
        };
        
        const [navOpen, setNavOpen] = useState(false);
        const mbNavRef = useRef(null);
        const navOpenRef = useRef(null);
        const mainNavRef = useRef(null);

        const handleNavOpen = () => {
            setNavOpen(!navOpen);
            document.body.style.overflow = 'hidden';
          };
          const handleNavClose = () => {
            setNavOpen(false);
            document.body.style.overflow = 'auto';
          };


          useEffect(() => {
            const handleClickOutside = (event) => {
                const mbNavMain = mbNavRef.current;
                const navOpenMain = navOpenRef.current;
        
                if (!mbNavMain.contains(event.target) && !navOpenMain.contains(event.target)){
                    setNavOpen(!navOpen);
                }
            };
        
            if (navOpen === true) {
                document.body.addEventListener('click', handleClickOutside);
            } 
            
            return () => {
                document.body.removeEventListener('click', handleClickOutside);
            }
            
        }, [navOpen]);


    return(

        <nav ref={mainNavRef} style={{position: props.absolute === 'true' ? 'absolute' : '', zIndex: props.absolute === 'true' ? '100' : ''}}>
        <div class="left-nav">
            <img src='/img/logo.png'></img>
            <Link to = "/" style={{color: props.color === 'white' ? 'black' : 'white'}}><h1 className='nav-h1'>CalmSpace</h1></Link>
            <ul>
                <Link to = "/public/assessment" id = "asses">
                    <li style={{color: props.color === 'white' ? 'black' : 'white'}}>Assessments</li>
                    <span className='nice' id = 'asses-hover' style={{backgroundColor: props.color === 'white' ? 'black' : 'white', 
                width: props.page === 'assessment' ? '80%' : ''}}></span>
                </Link>
                <Link to = "/public/exercise" id = "exercise">
                    <li style={{color: props.color === 'white' ? 'black' : 'white'}}>Exercises</li>
                    <span className='nice' id = 'exercise-hover' style={{backgroundColor: props.color === 'white' ? 'black' : 'white', 
                width: props.page === 'exercise' ? '80%' : ''}}></span>
                </Link>
                <Link to = "/public/resource-hub" id = "resource">
                    <li style={{color: props.color === 'white' ? 'black' : 'white'}}>Resource Hub</li>
                    <span className='nice' id = 'resource-hover' style={{backgroundColor: props.color === 'white' ? 'black' : 'white', 
                width: props.page === 'resource' ? '80%' : ''}}></span>
                </Link>
            </ul>
        </div>
        <div class="right-nav">

            <Link to='/public/clinic' class = "button">Clinic</Link>
            <div class="r-n-icon" id = "profile">
                <a href = "profile.html" onMouseEnter ={handleMouseOver_Prof} onMouseLeave ={handleMouseLeave_Prof}
                style={{color: props.rIcon === 'white' ? 'black' : 'white'}}><ion-icon name="person-circle"></ion-icon></a>
                
                <div className='nav-pop-up-wrapper'style = {{display : isProfHovered === true ? 'flex' : 'none'}} 
                    onMouseLeave ={handleMouseLeave_Prof} onMouseEnter={stillProfPop}>

                    <div class="nav-pop-up" id = "profile-pop">
                        <div class="profile-pop-up">
                            <a href = "profile.html" class= "profile-pop-up-opt">
                                <ion-icon name="log-in" class = "pop-up-profile"></ion-icon>
                                <Link to = '/login' style={{textDecoration: 'none', color: 'black'}}>Log in</Link>
                            </a>
                        </div>
                    </div>
                </div>
            </div>   
        </div>

        <div class="mobile-nav">
            
            <div class="button">
                <Link to='/public/clinic'>Clinic</Link>
            </div>

            <div class="r-n-icon" id = "mb-nav-open" ref={navOpenRef}>
                <a href="#" style={{color: props.rIcon === 'white' ? 'black' : 'white'}}><ion-icon name="person-circle" onClick={handleNavOpen}></ion-icon></a>
            </div>


                <div class="mb-nav-main" id = "mb-nav-main" ref={mbNavRef} style = {{display : navOpen === true ? 'flex' : 'none'}}>
                    <div class="mb-nav-head" id = "mb-nav-close" >
                        <ion-icon name="close" onClick={handleNavClose}></ion-icon>
                    </div>
                    <ul>
                        <Link to = "/public/assessment">
                            <li class = "mb-nav-opt" id = "mb-nav-asses"><ion-icon name="document-text" class = "mb-nav-icon"></ion-icon> Assessments</li>
                        </Link>
                        <Link to = "/public/exercise">
                            <li class = "mb-nav-opt" id = "mb-nav-exercise"><ion-icon name="barbell" class = "mb-nav-icon"></ion-icon> Exercises</li>
                        </Link>
                        <Link to = "/public/resource-hub">
                            <li class = "mb-nav-opt" id = "mb-nav-resource"><ion-icon name="cube" class = "mb-nav-icon"></ion-icon> Resource Hub</li>
                        </Link>
                        <Link to = "/login">
                            <li class = "mb-nav-opt" id = "mb-nav-logout"><ion-icon name="log-in" class = "mb-nav-icon"></ion-icon> Log in</li>
                        </Link>
                    </ul>
                </div>
        </div>
    </nav>

    );

};