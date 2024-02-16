import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'
import '../css/client.css';

const RegisterForm = ({ openRegForm, setOpenRegForm, setSchedSuccess, setSchedError }) => {

  let {authTokens, user} = useContext(AuthContext);


  const [branches, setBranches] = useState([]);


  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);

  const handleAppointmentTypeChange = (appointmentType) => {
    setSelectedAppointmentType(appointmentType);
  };

  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    fetch('http://89.116.21.45:8000/api/clinic/branches', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setBranches(data);
        // Select the first branch by default
        if (data.length > 0) {
          setSelectedBranch(data[0].id);
        }
      });
  }, []);

  const handleBranchClick = (branchId) => {
    setSelectedBranch(branchId);
    setSelectedDoctor(null)
  };

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      if (selectedBranch) {
        fetch('http://89.116.21.45:8000/api/clinic/doctors', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            // Filter the data based on the selected branch
            const filteredData = data.filter(doctor => doctor.branch_name === selectedBranch);
            setDoctors(filteredData);
          })
          .catch(error => console.error('Error fetching doctors:', error));
      }
    }, [selectedBranch]);


    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
  
      if(openRegForm){
        const fetchAppointments = async () => {
          try {
            const response = await fetch('http://89.116.21.45:8000/api/clinic/appointments', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-type': 'application/json',
              }
            });
    
            if (response.ok) {
              const data = await response.json();
              setAppointments(data);
            } else {
              console.error('Error fetching appointments:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching appointments:', error);
          }
        };

        fetchAppointments();

          // Set up polling with a 5-second interval
          const pollingInterval = setInterval(() => {
            fetchAppointments();
          }, 5000);

          // Clear the interval when the component unmounts
          return () => clearInterval(pollingInterval);
      }
    
      }, [openRegForm]);

      const [advanceAppointments, setAdvanceAppointments] = useState([]);

      useEffect(() => {
        
          if(openRegForm){
            const fetchData = () => {
              fetch('http://89.116.21.45:8000/api/clinic/advance-appointments', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${authTokens.access}`,
                  'Content-type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(data => {
                  setAdvanceAppointments(data);
                })
                .catch(error => console.error('Error fetching appointments:', error));
            };
        
            // Fetch data initially
            fetchData();
        
            // Set up polling with a 5-second interval
            const intervalId = setInterval(() => {
              fetchData();
            }, 5000);
  
            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
          }

    
      }, [openRegForm]);
    

    const hasExistingScheduleForToday = async () => {
        try {
          const today = new Date().toISOString().split('T')[0];
          const response = await fetch('http://89.116.21.45:8000/api/clinic/clients', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authTokens.access}`,
              'Content-type': 'application/json',
            }
          });
    
          if (response.ok) {
            const data = await response.json();
            return data.some(
              (client) =>
                client.userID === user.user_id &&
                client.appointment_date === today
            );
          } else {
            console.error('Error fetching clients:', response.statusText);
            return false;
          }
        } catch (error) {
          console.error('Error checking existing schedule:', error);
          return false;
        }
      };

  // FUNCTIONS FOR ADDING CLIENTS

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: 'Male',
    birthday: '',
    contact_number: '',
    emergency_contact_number: '',
    email: '',
    doctor: '',
    appointment_date: '',
    appointment_time: '',
    medical_history: '',
    status: 'active',
    branch_id: '', 
    userID: null, 
    street_address: '',
    barangay: '',
    city_town: '',
    province: '',
    postal_code: '',
    country: '',
  });

  useEffect(() => {
    setFormData({
      ...formData,
      branch_id: selectedBranch,
      userID: user.user_id
    })
  }, [selectedBranch])

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClientFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        fetch('http://89.116.21.45:8000/api/clinic/appointments', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-type': 'application/json'
        }

        })
          .then(response => response.json())
          .then(data => {
            setAppointments(data)
          })
          .catch(error => console.error('Error fetching appointments:', error));

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
        fetch('http://89.116.21.45:8000/api/clinic/advance-appointments', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-type': 'application/json'
        }
        })
          .then(response => response.json())
          .then(data => {
            // Filter the data based on the 'branch' field
            const filteredData = data.filter(appointment => appointment.branch === user.branch.id);
            setAdvanceAppointments(filteredData)
          })
          .catch(error => console.error('Error fetching appointments:', error));

      } else {
        // Handle the error if the update request fails
        console.error('Failed to update appointment time field');
      }
    } catch (error) {
      console.error('Error updating appointment time field:', error);
    }
  };

  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('appointment'); // Default to 'appointment'

  const [showCreationConfirmation, setShowCreationConfirmation] = useState(false);

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

  const checkTimeSlotAvailability = async (appointmentType, appointmentId, appointmentTime) => {
    try {

      const jsonTimeFormat = timeFieldMappings[appointmentTime];

      if (!jsonTimeFormat) {
        console.error('Invalid appointment time:', appointmentTime);
        return false;
      }

      const response = await fetch(`http://89.116.21.45:8000/check-time-slot-availability/${appointmentId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment_type: appointmentType,
          appointment_time: jsonTimeFormat
        }), 
      });

      if (response.ok) {
        const data = await response.json();
        return data.available;
      } else {
        console.error('Failed to check time slot availability:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking time slot availability:', error);
      return false;
    }
  };

  const handleClientFormSubmit = (e) => {
    e.preventDefault();
    // Display confirmation dialog
    setShowCreationConfirmation(true);
  };

  const handleConfirm = async () => {

      const existingScheduleForToday = await hasExistingScheduleForToday();

      if (existingScheduleForToday){
        window.alert('Sorry! You already have a scheduled appointment for today.')
      } else{

          const isTimeSlotAvailable = await checkTimeSlotAvailability(selectedAppointmentDate, selectedAppointmentId, formData.appointment_time.trim());

          if (isTimeSlotAvailable) {
              window.alert('The selected appointment time slot is not available. Please choose another time slot.');
              return; // Abort the posting process
          }



          if (selectedAppointmentDate === 'appointment'){
            try{
              const response = await fetch('http://89.116.21.45:8000/api/clinic/clients/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify({
                  first_name: formData.first_name.trim(),
                  last_name: formData.last_name.trim(),
                  age: formData.age.trim(),
                  gender: formData.gender.trim(),
                  birthday: formData.birthday.trim(),
                  contact_number: formData.contact_number.trim(),
                  emergency_contact_number: formData.emergency_contact_number.trim(),
                  email: formData.email.trim(),
                  doctor: formData.doctor,
                  appointment_date: new Date().toISOString().split('T')[0],
                  appointment_time: formData.appointment_time.trim(),
                  medical_history: formData.medical_history.trim(),
                  status: formData.status.trim(),
                  branch: formData.branch_id,
                  userID: formData.userID,
                  street_address: formData.street_address.trim(),
                  barangay: formData.barangay.trim(),
                  city_town: formData.city_town.trim(),
                  province: formData.province.trim(),
                  postal_code: formData.postal_code.trim(),
                  country: formData.country.trim(),
                }),
              })
      
                if (response.ok) {
                  const data = await response.json();
      
                  setSchedSuccess(true);
                  // Reset the form data
                  setFormData({
                    first_name: '',
                    last_name: '',
                    age: '',
                    gender: 'Male',
                    birthday: '',
                    contact_number: '',
                    emergency_contact_number: '',
                    email: '',
                    doctor: '',
                    appointment_date: '',
                    appointment_time: '',
                    medical_history: '',
                    street_address: '',
                    barangay: '',
                    city_town: '',
                    province: '',
                    postal_code: '',
                    country: '',
                  });
                  
                  updateAppointmentTime(selectedAppointmentId, selectedTimeField, selectedCurrentValue);
                  setOpenRegForm(false)

                  // Fetch the updated appointments if needed
                  // (You can replace this with direct state manipulation if necessary)
                  fetch('http://89.116.21.45:8000/api/clinic/appointments', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${authTokens.access}`,
                      'Content-type': 'application/json',
                    },
                  })
                  .then(response => response.json())
                  .then(data => {
                    setAppointments(data);
                  })
                  .catch(error => console.error('Error fetching appointments:', error));
                } else {
                  // Handle the error if the create request fails
                  setSchedError(true)
                  console.error('Failed to create client:', response.statusText);
                }
            } catch (error) {
              
            }
          } else if (selectedAppointmentDate === 'advance-appointment'){
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
  
            try{
              const response = await fetch('http://89.116.21.45:8000/api/clinic/clients/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify({
                  first_name: formData.first_name.trim(),
                  last_name: formData.last_name.trim(),
                  age: formData.age.trim(),
                  gender: formData.gender.trim(),
                  birthday: formData.birthday.trim(),
                  contact_number: formData.contact_number.trim(),
                  emergency_contact_number: formData.emergency_contact_number.trim(),
                  email: formData.email.trim(),
                  doctor: formData.doctor,
                  appointment_date: tomorrow.toISOString().split('T')[0],
                  appointment_time: formData.appointment_time.trim(),
                  medical_history: formData.medical_history.trim(),
                  status: formData.status.trim(),
                  branch: formData.branch_id,
                  userID: formData.userID,
                  street_address: formData.street_address.trim(),
                  barangay: formData.barangay.trim(),
                  city_town: formData.city_town.trim(),
                  province: formData.province.trim(),
                  postal_code: formData.postal_code.trim(),
                  country: formData.country.trim(),
                }),
              })
      
                if (response.ok) {
                  const data = await response.json();
      
                  setSchedSuccess(true)
                  // Reset the form data
                  setFormData({
                    first_name: '',
                    last_name: '',
                    age: '',
                    gender: 'Male',
                    birthday: '',
                    contact_number: '',
                    emergency_contact_number: '',
                    email: '',
                    doctor: '',
                    appointment_date: '',
                    appointment_time: '',
                    medical_history: '',
                    street_address: '',
                    barangay: '',
                    city_town: '',
                    province: '',
                    postal_code: '',
                    country: '',
                  });
      
                  updateAdvanceAppointmentTime(selectedAppointmentId, selectedTimeField, selectedCurrentValue);
                  setOpenRegForm(false)

                  // Fetch the updated appointments if needed
                  // (You can replace this with direct state manipulation if necessary)
                  fetch('http://89.116.21.45:8000/api/clinic/advance-appointments', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${authTokens.access}`,
                      'Content-type': 'application/json',
                    },
                  })
                  .then(response => response.json())
                  .then(data => {
                    // Filter the data based on the 'branch' field
                    const filteredData = data.filter(appointment => appointment.branch === user.branch.id);
                    setAdvanceAppointments(filteredData);
                  })
                  .catch(error => console.error('Error fetching appointments:', error));
                } else {
                  // Handle the error if the create request fails
                  setSchedError(true)
                  console.error('Failed to create client:', response.statusText);
                }
            } catch (error) {
              
            }
          }
      }
      setShowCreationConfirmation(false)
  };

  const handleCancel = () => {
    setShowCreationConfirmation(false); // Hide confirmation dialog if user cancels
  };

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)
  const [selectedTimeField, setSelectedTimeField] = useState(null)
  const [selectedCurrentValue, setSelectedCurrentValue] = useState(null)

  const [selectedAdvanceAppointments, setSelectedAdvanceAppointments] = useState([]);

  //appointmentId, timeField, currentValue

  useEffect(() => {
    setFormData({
      ...formData,
      doctor: selectedDoctor ? selectedDoctor.id : '',
      appointment_time: selectedTimeSlot ? selectedTimeSlot : '',
    })
  }, [selectedDoctor, selectedTimeSlot])

  useEffect(() => {
    // Update selectedAppointments when selectedDoctor changes
    if (selectedDoctor) {
      const doctorAppointments = appointments.filter(
        (appointment) => appointment.doctor === selectedDoctor.id
      );
      setSelectedAppointments(doctorAppointments);
    }
  }, [selectedDoctor, doctors, appointments]); // Watch for changes in selectedDoctor

  useEffect(() => {
    // Update selectedAppointments when selectedDoctor changes
    if (selectedDoctor) {
      const doctorAppointments = advanceAppointments.filter(
        (appointment) => appointment.doctor === selectedDoctor.id
      );
      setSelectedAdvanceAppointments(doctorAppointments);
    }
  }, [selectedDoctor, doctors, advanceAppointments]); // Watch for changes in selectedDoctor

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot('');
  };

  const handleAppointmentTime = (timeSlot, appointmentId, timeField, currentValue) => {
    setSelectedTimeSlot(timeSlot);
    setSelectedAppointmentId(appointmentId);
    setSelectedTimeField(timeField);
    setSelectedCurrentValue(currentValue);
  }

  const handleAppointmentToday = () => {
    setSelectedAppointmentDate('appointment')
    setSelectedTimeSlot('');
  }

  const handleAppointmentTomorrow = () => {
    setSelectedAppointmentDate('advance-appointment')
    setSelectedTimeSlot('');
  }

  const isPastTimeSlot = (timeSlot) => {
    const currentTime = new Date();
    const timeSlotHour = parseInt(timeSlot.split(':')[0]);
    const timeSlotMinute = parseInt(timeSlot.split(':')[1]);
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    // Check if current hour is greater than time slot hour
    if (currentHour > timeSlotHour) {
        return true;
    } else if (currentHour === timeSlotHour && currentMinute >= timeSlotMinute + 30) {
        // If current hour is equal to time slot hour, 
        // check if current minute is 30 minutes or more past time slot minute
        return true;
    } else {
        return false;
    }
  }

  return (
    <div>
      <div className='create-client'>

        <div className='close-btn' onClick={() => {setOpenRegForm(false)}}>
          <ion-icon name="close"></ion-icon>
        </div>

        <div className='select-doctor'>
          <p>Step 1. Select clinic branch</p>
          <div className='select-doctor-btns'>
            {branches.map((branch) => (
              <button 
                key={branch.id}
                onClick={() => handleBranchClick(branch.id)}
                style={{ backgroundColor: selectedBranch === branch.id ? '#0b3d72' : '#5d9add' }}
              >
                {branch.branch_name}
              </button>
            ))}
          </div>
        </div>

        <div className='select-doctor'>
          <p>Step 2. Select a doctor</p>
          <div className='select-doctor-btns'>
            {doctors.map((doctor) => (
            <button key={doctor.id} onClick={() => handleDoctorClick(doctor)}
            style={{backgroundColor: selectedDoctor === doctor ? '#0b3d72' : '#5d9add'}}>
                {doctor.doctor_name}
            </button>
            ))}
          </div>
        </div>

        {selectedDoctor && (
          <div className='select-doctor'>
            <p>Step 3. Select date of appointment</p>
            <div className='select-doctor-btns'>
              <button
                onClick={handleAppointmentToday}
                style={{ backgroundColor: selectedAppointmentDate === 'appointment' ? '#0b3d72' : '#5d9add' }}
              >
                Regular Appointment
              </button>
              <button
                onClick={handleAppointmentTomorrow}
                style={{ backgroundColor: selectedAppointmentDate === 'advance-appointment' ? '#0b3d72' : '#5d9add' }}
              >
                Advance Appointment
              </button>
            </div>
          </div>
        )}

        {selectedAppointmentDate === 'appointment' && selectedAppointments.length > 0 && (
                <div className='appointment'>
                <p>Step 4. Select time of appointment</p>
                <h3>Today's schedule of Dr./Dra. {selectedDoctor.doctor_name}</h3>
                <div className='scheds'>
                {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('8:00 AM') || appointment.time_8am_9am} style={{backgroundColor: selectedTimeSlot === '8:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('8:00 AM', appointment.id, 'time_8am_9am', appointment.time_8am_9am)}>8:00 AM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('9:00 AM') || appointment.time_9am_10am} style={{backgroundColor: selectedTimeSlot === '9:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('9:00 AM', appointment.id, 'time_9am_10am', appointment.time_9am_10am)}>9:00 AM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('10:00 AM') || appointment.time_10am_11am} style={{backgroundColor: selectedTimeSlot === '10:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('10:00 AM', appointment.id, 'time_10am_11am', appointment.time_10am_11am)}>10:00 AM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('11:00 AM') || appointment.time_11am_12pm} style={{backgroundColor: selectedTimeSlot === '11:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('11:00 AM', appointment.id, 'time_11am_12pm', appointment.time_11am_12pm)}>11:00 AM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('13:00 PM') || appointment.time_1pm_2pm} style={{backgroundColor: selectedTimeSlot === '1:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('1:00 PM', appointment.id, 'time_1pm_2pm', appointment.time_1pm_2pm)}>1:00 PM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('14:00 PM') || appointment.time_2pm_3pm} style={{backgroundColor: selectedTimeSlot === '2:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('2:00 PM', appointment.id, 'time_2pm_3pm', appointment.time_2pm_3pm)}>2:00 PM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('15:00 PM') || appointment.time_3pm_4pm} style={{backgroundColor: selectedTimeSlot === '3:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('3:00 PM', appointment.id, 'time_3pm_4pm', appointment.time_3pm_4pm)}>3:00 PM</button>
                        ))}
                        {selectedAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={isPastTimeSlot('16:00 PM') || appointment.time_4pm_5pm} style={{backgroundColor: selectedTimeSlot === '4:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('4:00 PM', appointment.id, 'time_4pm_5pm', appointment.time_4pm_5pm)}>4:00 PM</button>
                        ))}
                    </div>
                </div>
            )}

              {selectedDoctor && selectedAppointmentDate === 'advance-appointment' && selectedAdvanceAppointments.length > 0 && (
                <div className='appointment'>
                <p>Step 4. Select time of appointment</p>
                <h3>Tomorrow's schedule of Dr./Dra. {selectedDoctor.doctor_name}</h3>
                <div className='scheds'>
                    {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_8am_9am} style={{backgroundColor: selectedTimeSlot === '8:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('8:00 AM', appointment.id, 'time_8am_9am', appointment.time_8am_9am)}>8:00 AM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_9am_10am} style={{backgroundColor: selectedTimeSlot === '9:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('9:00 AM', appointment.id, 'time_9am_10am', appointment.time_9am_10am)}>9:00 AM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_10am_11am} style={{backgroundColor: selectedTimeSlot === '10:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('10:00 AM', appointment.id, 'time_10am_11am', appointment.time_10am_11am)}>10:00 AM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_11am_12pm} style={{backgroundColor: selectedTimeSlot === '11:00 AM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('11:00 AM', appointment.id, 'time_11am_12pm', appointment.time_11am_12pm)}>11:00 AM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_1pm_2pm} style={{backgroundColor: selectedTimeSlot === '1:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('1:00 PM', appointment.id, 'time_1pm_2pm', appointment.time_1pm_2pm)}>1:00 PM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_2pm_3pm} style={{backgroundColor: selectedTimeSlot === '2:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('2:00 PM', appointment.id, 'time_2pm_3pm', appointment.time_2pm_3pm)}>2:00 PM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_3pm_4pm} style={{backgroundColor: selectedTimeSlot === '3:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('3:00 PM', appointment.id, 'time_3pm_4pm', appointment.time_3pm_4pm)}>3:00 PM</button>
                        ))}
                        {selectedAdvanceAppointments.map((appointment) => (
                        <button className='sched-btns' disabled={appointment.time_4pm_5pm} style={{backgroundColor: selectedTimeSlot === '4:00 PM' ? '#0b3d72' : ''}} onClick={() => handleAppointmentTime('4:00 PM', appointment.id, 'time_4pm_5pm', appointment.time_4pm_5pm)}>4:00 PM</button>
                        ))}
                    </div>
                </div>
            )}

          <form onSubmit={handleClientFormSubmit}>
            <p>Step 5. Fill out these informations</p>
            <div className='multi-inputs'>

                <input
                  className='name'
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleClientFormChange}
                  placeholder='First name'
                  required
                />

                <input
                  className='name'
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleClientFormChange}
                  placeholder='Last name'
                  required
                />

            </div>

            <div className='multi-inputs'>

                <input
                  className='contacts'
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleClientFormChange}
                  placeholder='Contact number'
                  required
                />

                <input
                  className='contacts'
                  type="text"
                  name="emergency_contact_number"
                  value={formData.emergency_contact_number}
                  onChange={handleClientFormChange}
                  placeholder='Emergency contact number'
                  required
                />

            </div>

            <div className='multi-inputs'>
              <label className='demographs'>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleClientFormChange}
                  required
                />
              </label>

              <label className='demographs'>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleClientFormChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className='demographs'>
                Birthday:
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleClientFormChange}
                  required
                />
              </label>
            </div>
            
            <label className='one-input'>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleClientFormChange}
                required
              />
            </label>

            <label className='one-input'>
              Medical History (Optional):
              <textarea
                name="medical_history"
                value={formData.medical_history}
                onChange={handleClientFormChange}
              />
            </label>

            <div className='multi-inputs'>
                  <input
                    className='address'
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleClientFormChange}
                    placeholder='Street address'
                    required
                  />


                  <input
                    className='address'
                    type="text"
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleClientFormChange}
                    placeholder='Barangay'
                    required
                  />
            </div>

            <div className='multi-inputs'>

                  <input
                    className='address'
                    type="text"
                    name="city_town"
                    value={formData.city_town}
                    onChange={handleClientFormChange}
                    placeholder='City/Town'
                    required
                  />

                  <input
                    className='address'
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleClientFormChange}
                    placeholder='Province'
                    required
                  />
            </div>

            <div className='multi-inputs'>
                  <input
                    className='address'
                    type="number"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleClientFormChange}
                    placeholder='Postal Code'
                    required
                  />


                  <input
                    className='address'
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleClientFormChange}
                    placeholder='Country'
                    required
                  />
            </div>

        {/* Add your branch_id and userID input fields here */}

        <div className='form-actions'>
            <button type="submit" className='confirmation-btn-yes'>Submit</button>
          </div>
        </form>
      </div>
      {showCreationConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-content">
            <h2>Confirm Submission</h2>
            <p>Are you sure you want to submit the form?</p>
            <div className="confirmation-buttons">
              <button onClick={handleCancel} className='confirmation-btn-no'>Cancel</button>
              <button onClick={handleConfirm} className='confirmation-btn-yes'>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default RegisterForm;