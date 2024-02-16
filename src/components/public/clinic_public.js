import React, { useEffect, useState, useRef, useContext } from 'react';
import '../../css/clinic.css';
import { Link } from 'react-router-dom';
import Nav_public from './nav_public';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Clinic_public() {
    return (
        <body>
            <Nav_public color = 'white' page = 'clinic' rIcon = 'white'/>
            <Clinic_Child_public />
        </body>
    );
}

const Clinic_Child_public = () => {

    useEffect(() => {
        document.body.style.overflow = 'auto';
      }, [])

    const [branches, setBranches] = useState(null);

    useEffect(() => {
      fetch('http://89.116.21.45:8000/api/clinic/branches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          setBranches(data);
        });
    }, []);

    const items = [
            <div className='item'>
                <div className='item-wrapper'>
                    <img src = "/img/mental-health.png" />
                    <h2>Adolescent/Adult Psychiatry</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "/img/counselor.png" />
                    <h2>Counseling/Psychotherapy</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "/img/job.png" />
                    <h2>Occupational Therapy</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "/img/test.png" />
                    <h2>Psychological Testing</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "/img/consultation.png" />
                    <h2>Consultation and Follow up</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "/img/intern.png" />
                    <h2>Internship Program</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "/img/training.png" />
                    <h2>Training and Development</h2>
                </div>
            </div>
      ];

      const [appointmentOpen, setAppointmentOpen] = useState(false);

      const handleAppointment = () => {
        setAppointmentOpen(true)
        document.body.style.overflow = 'hidden';
      }
      const handleAppointmentClose = () => {
        setAppointmentOpen(false)
        document.body.style.overflow = 'auto';
      }

    return (
        <>
            <div className="clinic-container hero">
                <div className="clinic-wrapper hero">
                    <div className="clinic-hero-text">
                        <h1>Wayside Psyche Resources Center</h1>
                        <p>"Our focus is Quality Care to our Client's Psychological Core and Cure"</p>
                        <button className="btn-mn" onClick={handleAppointment}>
                            Make an Appointment
                        </button>
                    </div>
                    <div className="clinic-hero-img">
                        <img src="/img/doctors.png" alt="Doctors" />
                    </div>
                </div>
            </div>
            <div className="clinic-container tutorial">
                <div className="clinic-wrapper tutorial">
                    <div className="clinic-tutorial-text">
                        <p className="clinic-big">How to get our service?</p>
                        <p className="clinic-small">Just choose from these simple steps</p>
                    </div>
                    <div className="clinic-tutorial-img">
                        <div className="clinic-tut-box">
                            <img src='/img/walk-in.png'></img>
                            <p>Walk-in Appointments</p>
                        </div>
                        <div className="clinic-tut-box">
                            <img src='/img/website.png'></img>
                            <p>Appointment on Our Website</p>
                        </div>
                        <div className="clinic-tut-box">
                            <img src='/img/phone-call.png'></img>
                            <p>Appointment Through Phone Calls</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clinic-container services">
                <div className="clinic-wrapper services">
                    <div className="clinic-services-text">
                        <p>WHAT WE <span>PROVIDE</span></p>
                    </div>
                    <div className="clinic-services-img">
                    <AliceCarousel
                        items={items}
                        autoPlay
                        autoPlayInterval={2000}
                        infinite
                        responsive={{
                            0: { items: 1 },
                            600: { items: 2 },
                            1024: { items: 3 },
                            1500: { items: 4 },
                        }}
                    />
                    <p>We provide high quality mental health care tailored to your unique needs. We ensure your journey towards healing and well-being is supported with compassion, expertise, and confidentiality every step of the way.</p>
                    </div>
                </div>
            </div>
            <div className="clinic-container appoint">
                <div className="clinic-wrapper appoint">
                    <div className="clinic-appoint-text">
                        <p>Helping people feel mentally well is a meaningful task.
                            We take pride in providing top-notch mental health care in Santa Maria, Bulacan.
                            Our main goal is to ensure you and your family feel comfortable and supported.</p>
                        <button onClick={handleAppointment}>Make an Appointment</button>
                    </div>
                </div>
            </div>
            <div className="clinic-container aboutUs">
                <div className="clinic-wrapper aboutUs">
                    <div className="clinic-aboutUs-text">
                        <p>WHO <span>WE ARE</span></p>
                    </div>
                    <div className="clinic-aboutUs-img">
                        <div className='about-main'>
                            <img src='/img/logo.png'></img>
                            <div>
                                <p>Wayside Psyche Resources Center</p>
                                <p>Hi! We are a group of Psychological Testing Psychotherapists, 
                                    Psychiatrists, and Psychologists. Our main mission is to help 
                                    everyone who experiences mental health struggles find the support 
                                    and guidance they need to live fulfilling lives.</p>
                            </div>
                        </div>
                        <div className='about-location'>
                            <p>Our clinics</p>
                            <div className='location-container'>
                                {branches && branches.map((branch) => (
                                    <div>
                                        <p>{branch.branch_name}</p>
                                        <p>Address: {`${branch.street_address}, ${branch.barangay}, ${branch.city_town}, ${branch.province}, ${branch.country}, ${branch.postal_code}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clinic-container footer">
                <div className='footer-logo'>
                    <img src='/img/logo.png'></img>
                    <h1>Wayside Psyche <br />Resources Center</h1>
                </div>
                <div className='footer-contacts'>
                    <h2>Contacts</h2>
                    <a href='https://www.facebook.com/carecorecure.thewayside.mentalhealth' target='_blank'><ion-icon name="logo-facebook"></ion-icon> Facebook</a>
                    <a href='https://www.calm-space.online' target='_blank'><ion-icon name="globe"></ion-icon> CalmSpace</a>
                    <a><ion-icon name="call"></ion-icon> 0933 596 5859</a>
                    <a><ion-icon name="call"></ion-icon> (044) 793 5254</a>
                    <a><ion-icon name="call"></ion-icon> 0915 411 3022</a>
                </div>
                <div className='footer-links'>
                    <h2>Quick Links</h2>
                    <Link to='/assessment'>Assessments</Link>
                    <Link to='/exercise'>Exercises</Link>
                    <Link to='/resource'>Resource Hub</Link>
                </div>
            </div>
            <div className="copyright">
                <div></div>
                <p>&copy; Wayside Psyche Resources Center. CalmSpace</p>
            </div>
            
            <div className='nav-login-bg' style={{display: appointmentOpen ? 'flex': 'none', top: `calc(50% + ${window.scrollY}px)`}}></div>
            <div className='navigate-login' style={{display: appointmentOpen ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>
                <div className='close-btn' onClick={handleAppointmentClose}>
                    <ion-icon name="close"></ion-icon>
                </div>
              <img src='/img/register.png' />
              <div className='n-l-content'>
                <h1>Register now!</h1>
                <p>Have a full access on our contents and features. It's all free!</p>
                <Link to = '/login'>Register</Link>
              </div>
            </div>
        </>
    );
};

export default Clinic_public;
