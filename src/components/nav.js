import '../css/nav.css';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


export default function Nav(props) {

    const [branches, setBranches] = useState([])

    useEffect(() => {
        fetch('http://89.116.21.45:8000/api/clinic/branches',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json())
        .then(data => {
          setBranches(data);
        });
      }, []);
  
      const [doctors, setDoctors] = useState([]);
  
      useEffect(() => {
    
        fetch('http://89.116.21.45:8000/api/clinic/doctors', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-type': 'application/json'
            }
        })
          .then(response => response.json())
          .then(data => {
            setDoctors(data);
        })
          .catch(error => console.error('Error fetching branches:', error));
      }, []);

      const [doctorAppointments, setDoctorAppointments] = useState([]);
  
      useEffect(() => {
            fetch('http://89.116.21.45:8000/api/clinic/appointments', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => {
              setDoctorAppointments(data);
            })
            .catch(error => console.error('Error fetching appointments:', error));
      }, [branches]);

      const [doctorAdvanceAppointments, setDoctorAdvanceAppointments] = useState([]);
  
      useEffect(() => {
            fetch('http://89.116.21.45:8000/api/clinic/advance-appointments', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => {
              setDoctorAdvanceAppointments(data);
            })
            .catch(error => console.error('Error fetching appointments:', error));
      }, [branches]);

        const [isSchedHovered, setIsSchedHovered] = useState(false);
        const [isProfHovered, setIsProfHovered] = useState(false);

        const handleMouseOver_Sched = () => {
          setIsSchedHovered(!isSchedHovered);
        };

        const handleMouseLeave_Sched = () => {
            setIsSchedHovered(false);
           
        };

        const stillSchedPop = () => {
            setIsSchedHovered(true);
        };
        
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

        let {handleLogout, user, authTokens} = useContext(AuthContext);

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
            return assessments.some(assessment => assessment.userID === user.user_id);
        };

        const [showConfirmation, setShowConfirmation] = useState(false);
        const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null);
        const [appointmentTimeToDelete, setAppointmentTimeToDelete] = useState(null);
        const [appointmentDateToDelete, setAppointmentDateToDelete] = useState(null);
        const [appointmentIdToUpdate, setAppointmentIdToUpdate] = useState(null);
    
        const showCancelConfirmation = (appointmentId, clientAppointmentTime, clientAppointmentDate, updateAppointmentId) => {
            setAppointmentIdToDelete(appointmentId);
            setAppointmentTimeToDelete(clientAppointmentTime);
            setAppointmentDateToDelete(clientAppointmentDate);
            setAppointmentIdToUpdate(updateAppointmentId)
            setShowConfirmation(true);
        };
    
        const confirmCancel = () => {
            cancelAppointment(appointmentIdToDelete, appointmentTimeToDelete, appointmentDateToDelete, appointmentIdToUpdate);
            setShowConfirmation(false);
        };
    
        const cancelCancel = () => {
            setShowConfirmation(false);
            setAppointmentTimeToDelete(null);
            setAppointmentIdToDelete(null);
        };

        const cancelAppointment = (clientId, clientAppointmentTime, clientAppointmentDate, appointmentId) => {
            const timeFieldMappings = {
                '8:00 AM': 'time_8am_9am',
                '9:00 AM': 'time_9am_10am',
                '10:00 AM': 'time_10am_11am',
                '11:00 AM': 'time_11am_12pm',
                '1:00 PM': 'time_1pm_2pm',
                '2:00 PM': 'time_2pm_3pm',
                '3:00 PM': 'time_3pm_4pm',
                '4:00 PM': 'time_4pm_5pm',
                '8:00am': 'time_8am_9am',
                '9:00am': 'time_9am_10am',
                '10:00am': 'time_10am_11am',
                '11:00am': 'time_11am_12pm',
                '1:00pm': 'time_1pm_2pm',
                '2:00pm': 'time_2pm_3pm',
                '3:00pm': 'time_3pm_4pm',
                '4:00pm': 'time_4pm_5pm',
              };

              const appointmentDate = new Date(clientAppointmentDate);
              const today = new Date();
              const tomorrow = new Date(today);
              tomorrow.setDate(today.getDate() + 1);
          
              const timeField = timeFieldMappings[clientAppointmentTime];
          
              fetch(`http://89.116.21.45:8000/api/clinic/clients/update-status/${clientId}/`, {
                  method: 'PUT',
                  headers: {
                      'Authorization': `Bearer ${authTokens.access}`,
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      status: 'cancelled',
                  }),
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Failed to update client status');
                  }
                  if (appointmentDate.toDateString() === today.toDateString()) {
                      return updateAppointmentTime(appointmentId, timeField, true);
                  } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
                      return updateAdvanceAppointmentTime(appointmentId, timeField, true);
                  } else {
                      throw new Error('Invalid appointment date');
                  }
              })
              .then(() => {
                  // Fetch the updated lists after the cancellation
                  return Promise.all([
                      fetch('http://89.116.21.45:8000/api/clinic/clients', {
                          method: 'GET',
                          headers: {
                              'Authorization': `Bearer ${authTokens.access}`,
                              'Content-Type': 'application/json',
                          },
                      })
                  ]);
              })
              .then(([clientsResponse]) => {
                  return Promise.all([
                      clientsResponse.json()
                  ]);
              })
              .then(([clients]) => {
                  const filteredClients = clients.filter(client => client.userID === user.user_id && client.status === 'active' && client.is_deleted === false);
                  setAppointments(filteredClients);
              })
              .catch(error => {
                  console.error('Error handling appointment cancellation:', error);
              });
          };

          const isCancelable = (appointmentTime) => {
            // Split the appointment time into hours, minutes, and meridian
            const timeRegex = /(\d+):(\d+)\s?([ap]m)/i;
            const match = appointmentTime.match(timeRegex);
        
            if (!match) {
                console.error('Invalid time format');
                return false;
            }
        
            const [, hours, minutes, meridian] = match;
            const hoursNum = parseInt(hours, 10);
            const minutesNum = parseInt(minutes, 10);
        
            // Adjust hours if it's PM
            const adjustedHours = meridian.toLowerCase() === 'pm' ? hoursNum + 12 : hoursNum;
        
            // Create a Date object for today with the appointment time
            const appointmentDate = new Date();
            appointmentDate.setHours(adjustedHours, minutesNum, 0, 0);
        
            // Calculate the current time
            const currentTime = new Date();
        

        
            // Check if the appointment time is at least 30 minutes after the current time
            const is30MinutesAfter = appointmentDate.getTime() - currentTime.getTime() > 30 * 60 * 1000;
        

        
            return is30MinutesAfter;
        };
        

        const updateAppointmentTime = async (appointmentId, timeField, currentValue) => {
            try {
              const response = await fetch(`http://89.116.21.45:8000/update-appointment/${appointmentId}/`, {
                method: 'PATCH', // Assuming you use a PATCH request to update the time field
                headers: {
                  'Authorization': `Bearer ${authTokens.access}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [timeField]: !currentValue }), // Send the updated time field as false
              });
        
              if (response.ok) {
                // Successfully updated the appointment time field
                // You may want to refresh the data or handle it in a way that suits your application
              } else {
                // Handle the error if the update request fails
                console.error('Failed to update appointment time field');
              }
            } catch (error) {
              console.error('Error updating appointment time field:', error);
            }
          };
          const updateAdvanceAppointmentTime = async (appointmentId, timeField, currentValue) => {
            try {
              const response = await fetch(`http://89.116.21.45:8000/update-advance-appointment/${appointmentId}/`, {
                method: 'PATCH', // Assuming you use a PATCH request to update the time field
                headers: {
                  'Authorization': `Bearer ${authTokens.access}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [timeField]: !currentValue }), // Send the updated time field as false
              });
        
              if (response.ok) {
                // Successfully updated the appointment time field
                // You may want to refresh the data or handle it in a way that suits your application
              } else {
                // Handle the error if the update request fails
                console.error('Failed to update appointment time field');
              }
            } catch (error) {
              console.error('Error updating appointment time field:', error);
            }
          };
          
          const [openSchedule, setOpenSchedule] = useState(false)

          useEffect(() => {
            const preventDefault = (e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
            };
      
            if (showConfirmation || openSchedule) {
                window.addEventListener('scroll', preventDefault);
                document.body.style.overflow = 'hidden';
            } else {
                window.removeEventListener('scroll', preventDefault);
                document.body.style.overflow = 'auto';
            }
      
            // Cleanup function to remove event listener when component unmounts
            return () => {
                window.removeEventListener('scroll', preventDefault);
                document.body.style.overflow = 'auto';
            };
          }, [showConfirmation, openSchedule]);

    return(

        <nav ref={mainNavRef} style={{position: props.absolute === 'true' ? 'absolute' : '', zIndex: props.absolute === 'true' ? '100' : ''}}>
        <div class="left-nav">
            <img src='/img/logo.png'></img>
            <Link to = "/" style={{color: props.color === 'white' ? 'black' : 'white'}}><h1 className='nav-h1'>CalmSpace</h1></Link>
            <ul>
                <Link to = "/assessment" id = "asses">
                    <li style={{color: props.color === 'white' ? 'black' : 'white'}}>Assessments</li>
                    <span className='nice' id = 'asses-hover' style={{backgroundColor: props.color === 'white' ? 'black' : 'white', 
                width: props.page === 'assessment' ? '80%' : ''}}></span>
                </Link>
                <Link to = "/exercise" id = "exercise">
                    <li style={{color: props.color === 'white' ? 'black' : 'white'}}>Exercises</li>
                    <span className='nice' id = 'exercise-hover' style={{backgroundColor: props.color === 'white' ? 'black' : 'white', 
                width: props.page === 'exercise' ? '80%' : ''}}></span>
                </Link>
                <Link to = "/resource" id = "resource">
                    <li style={{color: props.color === 'white' ? 'black' : 'white'}}>Resource Hub</li>
                    <span className='nice' id = 'resource-hover' style={{backgroundColor: props.color === 'white' ? 'black' : 'white', 
                width: props.page === 'resource' ? '80%' : ''}}></span>
                </Link>
            </ul>
        </div>
        <div class="right-nav">

            <Link to="/" class = "button">Clinic</Link>
            
            <div class="r-n-icon" id = "schedule">
                <a href = "#" onMouseEnter ={handleMouseOver_Sched} onMouseLeave ={handleMouseLeave_Sched} 
                style={{color: props.rIcon === 'white' ? 'black' : 'white'}} onClick={() => {setOpenSchedule(true)}}><ion-icon name="calendar"></ion-icon></a>

                <div className='nav-pop-up-wrapper' style = {{display : isSchedHovered === true ? 'flex' : 'none'}} 
                    onMouseLeave ={handleMouseLeave_Sched} onMouseEnter={stillSchedPop}>
                    <div class="nav-pop-up" id = "schedule-pop" >
                        <div class="pop-up-head">
                            <p>Scheduled Appointment</p>
                        </div>
                        {appointment && appointment.length === 0 && (
                            <div class="pop-up-null">
                                <ion-icon name="calendar-clear" class = "pop-up-icon"></ion-icon>
                                <p>No scheduled appoint yet</p>
                            </div>
                        )}
                        <div class="pop-up-main">
                            {appointment && appointment.map(appoint => (
                                <div key={appoint.id} className='schedule-main'>
                                    <div className='sched-details'>
                                      <div className='sched-doctor-branch'>
                                          <p>
                                              Wayside Psyche Resources Center <br/> - {branches.find(branch => branch.id === appoint.branch)?.branch_name || 'Unknown Branch'}
                                          </p>
                                          <p>
                                              Dr. {doctors.find(doctor => doctor.id === appoint.doctor_id)?.doctor_name || 'Unknown Doctor'}
                                          </p>
                                      </div>
                                      <div className='sched-date-time'>
                                          <p>{appoint.appointment_date}</p>
                                          <p>{appoint.appointment_time}</p>
                                      </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (isCancelable(appoint.appointment_time)) {

                                              let appointmentId = null;

                                              const todayDate = new Date();
                                              const tomorrowDate = new Date(todayDate);
                                              tomorrowDate.setDate(todayDate.getDate() + 1);
                                          
                                              if (new Date(appoint.appointment_date).toDateString() === todayDate.toDateString()) {
                                                  const filteredAppointment = doctorAppointments.find(appointment => appointment.doctor === appoint.doctor_id);
                                                  if (filteredAppointment) {
                                                      appointmentId = filteredAppointment.id;
                                                  }
                                              }
                                            
                                              if (new Date(appoint.appointment_date).toDateString() === tomorrowDate.toDateString()) {
                                                  const filteredAppointment = doctorAdvanceAppointments.find(appointment => appointment.doctor === appoint.doctor_id);
                                                  if (filteredAppointment) {
                                                      appointmentId = filteredAppointment.id;
                                                  }
                                              }

                                              showCancelConfirmation(appoint.id, appoint.appointment_time, appoint.appointment_date, appointmentId);
                                            } else {
                                                alert('Cannot cancel appointments less than 30 minutes in advance.');
                                            }
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='confirmation-bg' style={{display: showConfirmation || openSchedule ? 'flex' : 'none', top: props.page === 'assessment' || props.page === 'clinic' ? '0' :
            props.page === 'exercise' || props.page === 'resource' || props.page === 'profile'? '-15%' : '0'}} ></div>
            
            {showConfirmation && (
                <div className="confirmation-popup" style={{top: props.page === 'assessment'  || props.page === 'clinic' ? '50%' :
                props.page === 'exercise' || props.page === 'resource' || props.page === 'profile'? '575%' : '50%'}}>
                    <p>Are you sure you want to cancel this appointment?</p>
                    <div>
                      <button onClick={confirmCancel} id='cancel-btn-yes'>Yes</button>
                      <button onClick={cancelCancel} id='cancel-btn-no'>No</button>
                    </div>
                </div>
            )}
            <div class="r-n-icon" id = "profile">
                <Link to = "/profile" onMouseEnter ={handleMouseOver_Prof} onMouseLeave ={handleMouseLeave_Prof}
                style={{color: props.rIcon === 'white' ? 'black' : 'white'}}><ion-icon name="person-circle"></ion-icon></Link>
                
                <div className='nav-pop-up-wrapper'style = {{display : isProfHovered === true ? 'flex' : 'none'}} 
                    onMouseLeave ={handleMouseLeave_Prof} onMouseEnter={stillProfPop}>

                    <div class="nav-pop-up" id = "profile-pop">
                        <div class="profile-pop-up">
                            <Link to = "/profile" class= "profile-pop-up-opt">
                                <ion-icon name="person-circle" class = "pop-up-profile"></ion-icon>
                                <p>Profile</p>
                            </Link>
                            <a class= "profile-pop-up-opt" onClick={handleLogout}>
                                <ion-icon name="log-out"  class = "pop-up-profile"></ion-icon>
                                <p>Log out</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>   
        </div>

        <div class="mobile-nav">
            
            <div class="button">
                <Link to="/">Clinic</Link>
            </div>

            <div class="r-n-icon" id = "mb-nav-open" ref={navOpenRef}>
                <a href="#" style={{color: props.rIcon === 'white' ? 'black' : 'white'}}><ion-icon name="person-circle" onClick={handleNavOpen}></ion-icon></a>
            </div>


                <div class="mb-nav-main" id = "mb-nav-main" ref={mbNavRef} style = {{display : navOpen === true ? 'flex' : 'none'}}>
                    <div class="mb-nav-head" id = "mb-nav-close" >
                        <ion-icon name="close" onClick={handleNavClose}></ion-icon>
                    </div>
                    <ul>
                        <Link to = "/assessment" style={{backgroundColor: props.page === 'assessment' ? 'lightgray' : ''}}>
                            <li class = "mb-nav-opt" id = "mb-nav-asses"><ion-icon name="document-text" class = "mb-nav-icon"></ion-icon> Assessments</li>
                        </Link>
                        <Link to = "/exercise" style={{backgroundColor: props.page === 'exercise' ? 'lightgray' : ''}}>
                            <li class = "mb-nav-opt" id = "mb-nav-exercise"><ion-icon name="barbell" class = "mb-nav-icon"></ion-icon> Exercises</li>
                        </Link>
                        <Link to = "/resource" style={{backgroundColor: props.page === 'resource' ? 'lightgray' : ''}}>
                            <li class = "mb-nav-opt" id = "mb-nav-resource"><ion-icon name="cube" class = "mb-nav-icon"></ion-icon> Resource Hub</li>
                        </Link>
                        <Link to = "#" style={{backgroundColor: props.page === 'schedule' ? 'lightgray' : ''}} onClick={(e) => {e.preventDefault(); setOpenSchedule(true)}}>
                            <li class = "mb-nav-opt" id = "mb-nav-sched"><ion-icon name="calendar" class = "mb-nav-icon"></ion-icon> Schedule</li>
                        </Link>
                        <Link to = "/profile" style={{backgroundColor: props.page === 'profile' ? 'lightgray' : ''}}>
                            <li class = "mb-nav-opt" id = "mb-nav-profile"><ion-icon name="person" class = "mb-nav-icon"></ion-icon> Profile</li>
                        </Link>
                        <Link onClick={handleLogout}>
                            <li class = "mb-nav-opt" id = "mb-nav-logout" ><ion-icon name="log-out" class = "mb-nav-icon"></ion-icon> Log out</li>
                        </Link>
                    </ul>
                </div>
        </div>

        <div class="main-sched" style={{display: openSchedule ? 'flex' : 'none', top: props.page === 'assessment' || props.page === 'clinic'  ? '50%' :
        props.page === 'exercise' || props.page === 'resource' || props.page === 'profile'? '575%' : '50%'
        }}>
          <div className="form-close" id = "login-close" onClick={() => {setOpenSchedule(false); handleNavClose()}}>
              <ion-icon name="close"></ion-icon>
          </div>
          <div class="main-sched-head">
              <p>Scheduled Appointments</p>
          </div>
          {appointment && appointment.length === 0 && (
            <div class="main-sched-null">
                <ion-icon name="calendar-clear" class="pop-up-icon"></ion-icon>
                <p>No scheduled appoint yet</p>
            </div>
            )}
            <div class="main-sched-main">
                {appointment && appointment.map(appoint => (
                <div key={appoint.id} className='main-sched-wrapper'>
                    <div className='main-sched-details'>
                        <div className='main-sched-doctor-branch'>
                            <p>
                                <strong>Wayside Psyche Resources Center</strong>
                            </p>
                            <p>
                              <strong>Branch:</strong> {branches.find(branch => branch.id === appoint.branch)?.branch_name || 'Unknown Branch'}
                            </p>
                            <p>
                              <strong>Doctor:</strong> Dr. {doctors.find(doctor => doctor.id === appoint.doctor_id)?.doctor_name || 'Unknown Doctor'}
                            </p>
                        </div>
                        <div className='main-sched-date-time'>
                            <p><strong>Date:</strong> {appoint.appointment_date}</p>
                            <p><strong>Time:</strong> {appoint.appointment_time}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (isCancelable(appoint.appointment_time)) {
                                let appointmentId = null;
                                const todayDate = new Date();
                                const tomorrowDate = new Date(todayDate);
                                tomorrowDate.setDate(todayDate.getDate() + 1);
                                if (new Date(appoint.appointment_date).toDateString() === todayDate.toDateString()) {
                                    const filteredAppointment = doctorAppointments.find(appointment => appointment.doctor === appoint.doctor_id);
                                    if (filteredAppointment) {
                                        appointmentId = filteredAppointment.id;
                                    }
                                }
                                if (new Date(appoint.appointment_date).toDateString() === tomorrowDate.toDateString()) {
                                    const filteredAppointment = doctorAdvanceAppointments.find(appointment => appointment.doctor === appoint.doctor_id);
                                    if (filteredAppointment) {
                                        appointmentId = filteredAppointment.id;
                                    }
                                }
                                showCancelConfirmation(appoint.id, appoint.appointment_time, appoint.appointment_date, appointmentId);
                            } else {
                                alert('Cannot cancel appointments less than 30 minutes in advance.');
                            }
                        }}
                    >
                        Cancel
                    </button>
                </div>
              ))}
          </div>
      </div>


    </nav>

    );

};

