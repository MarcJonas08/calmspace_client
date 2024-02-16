import React, { useEffect, useState, useRef, useContext } from 'react';
import '../css/clinic.css';
import Nav from './nav';
import RegisterForm from './regForm';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Clinic() {
    return (
        <body>
            <Nav color = 'white' page = 'clinic' rIcon = 'white'/>
            <Clinic_Child />
        </body>
    );
}

const Clinic_Child = () => {

    let { user, authTokens } = useContext(AuthContext);

    const [openRegForm, setOpenRegForm] = useState(false);

    const [appointment, setAppointments] = useState();

    useEffect(() => {
        fetch('http://89.116.21.45:8000/api/clinic/clients', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const filteredData = data.filter(client => client.userID === user.user_id && client.status === 'active' && client.is_deleted === false);
            setAppointments(filteredData);
          })
          .catch((error) => console.error('Error fetching clients:', error));
    }, [])

    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        fetch('http://89.116.21.45:8000/api/clinic/assessments', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            setAssessments(data);
        })
        .catch((error) => console.error('Error fetching assessments:', error));
      }, [authTokens]);
    
    // Function to check if a user has existing data in assessments
    const userHasAssessmentData = () => {
        return assessments.some(assessment => assessment.user === user.user_id);
    };
    
    const [takeAssessment, setTakeAssessment] = useState(false);
    const [haveAssessment, setHaveAssessment] = useState(false);
    const [schedSuccess, setSchedSuccess] = useState(false);
    const [schedError, setSchedError] = useState(false);
  
    useEffect(() => {
        const preventDefault = (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        };

        if (openRegForm || takeAssessment || haveAssessment || schedError || schedSuccess) {
            window.addEventListener('scroll', preventDefault);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('scroll', preventDefault);
            document.body.style.overflow = 'auto';
        };
    }, [openRegForm, takeAssessment, haveAssessment, schedError, schedSuccess]);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

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
                    <img src = "img/mental-health.png" />
                    <h2>Adolescent/Adult Psychiatry</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "img/counselor.png" />
                    <h2>Counseling/Psychotherapy</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "img/job.png" />
                    <h2>Occupational Therapy</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "img/test.png" />
                    <h2>Psychological Testing</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "img/consultation.png" />
                    <h2>Consultation and Follow up</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "img/intern.png" />
                    <h2>Internship Program</h2>
                </div>
            </div>,
            <div className="item">
                <div className='item-wrapper'>
                    <img src = "img/training.png" />
                    <h2>Training and Development</h2>
                </div>
            </div>
      ];

    return (
        <>
            <div className="clinic-container hero">
                <div className="clinic-wrapper hero">
                    <div className="clinic-hero-text">
                        <h1>Wayside Psyche Resources Center</h1>
                        <p>"Our focus is Quality Care to our Client's Psychological Core and Cure"</p>
                        <button className="btn-mn" onClick={() => {
                            if (userHasAssessmentData()) {
                                setHaveAssessment(true)
                            } else {
                                setTakeAssessment(true)
                            }
                        }}>
                            Make an Appointment
                        </button>
                    </div>
                    <div className="clinic-hero-img">
                        <img src="img/doctors.png" alt="Doctors" />
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
                        <button onClick={() => {
                            scrollToTop();
                            if (userHasAssessmentData()) {
                                setHaveAssessment(true)
                            } else {
                                setTakeAssessment(true)
                            }
                        }}>Make an Appointment</button>
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

            <section className = "bg-login" id = "bg-login" style = {{display : openRegForm || haveAssessment || takeAssessment || schedError || schedSuccess ? 'flex' : 'none'}}></section>
            <div style={{display: openRegForm ? 'flex' : 'none'}}>
                <RegisterForm setOpenRegForm={setOpenRegForm} openRegForm={openRegForm}
                takeAssessment={takeAssessment} setTakeAssessment={setTakeAssessment}
                haveAssessment={haveAssessment} setHaveAssessment={setHaveAssessment}
                schedSuccess={schedSuccess} setSchedSuccess={setSchedSuccess}
                schedError={schedError} setSchedError={setSchedError}
                />
            </div>

            <div className='notif-popup' style={{display: takeAssessment ? 'flex' : 'none'}}>
                <div className='close-btn' onClick={() => {setTakeAssessment(false)}}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <div className='notif-img'>
                    <img src='/img/take-assessment.png'></img>
                </div>
                <div className='notif-mid'></div>
                <div className='notif-text'>
                    <p>Hey there, friend!</p>
                    <p>We noticed you haven't taken our initial assessment (Anxiety Test) yet.</p>
                    <p>Just a friendly reminder: it's an important step before booking an appointment.</p>
                    <button><Link to='/assessment'>Take the Test Now</Link></button>
                </div>
            </div>

            <div className='notif-popup' style={{display: haveAssessment ? 'flex' : 'none'}}>
                <div className='close-btn' onClick={() => {setHaveAssessment(false)}}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <div className='notif-img'>
                    <img src='/img/have-assessment.png'></img>
                </div>
                <div className='notif-mid'></div>
                <div className='notif-text'>
                    <p>Good! You've already taken our initial assessment</p>
                    <div className='notif-choices'>
                        <div className='notif-choice-1'>
                            <p>Do you want to take the anxiety test again?</p>
                            <button><Link to='/assessment'>Take the Test</Link></button>
                        </div>
                        <p>or</p>
                        <div className='notif-choice-2'>
                            <p>Do you want to directly book an appointment?</p>
                            <button onClick={() => {setHaveAssessment(false); setOpenRegForm(true);}}>Book an Appointment</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='notif-popup' style={{display: schedSuccess ? 'flex' : 'none'}}>
                <div className='close-btn' onClick={() => {setSchedSuccess(false)}}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <div className='notif-img'>
                    <img src='/img/sched-success.png'></img>
                </div>
                <div className='notif-mid'></div>
                <div className='notif-text'>
                    <p>Great! Your appointment has been scheduled</p>
                    <p>We look forward to seeing you soon for a great chat!</p>
                    <button onClick={() => {setSchedSuccess(false)}}>Confirm</button>
                </div>
            </div>

            <div className='notif-popup' style={{display: schedError ? 'flex' : 'none'}}>
                <div className='close-btn' onClick={() => {setSchedError(false)}}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <div className='notif-img'>
                    <img src='/img/sched-error.png'></img>
                </div>
                <div className='notif-mid'></div>
                <div className='notif-text'>
                    <p>Oops. There is a problem in booking your appointment</p>
                    <p>We're sorry to say that your appointment is not processed right. Please try again later</p>
                    <button onClick={() => {setSchedError(false)}}>Confirm</button>
                </div>
            </div>
        </>
    );
};

export default Clinic;
