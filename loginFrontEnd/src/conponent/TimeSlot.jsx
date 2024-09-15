// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // function TimeSlot() {
// //   const timeSlots = [
// //     { label: "9:00 to 10:00", start: 9, end: 10 },
// //     { label: "10:00 to 11:00", start: 10, end: 11 },
// //     { label: "11:00 to 12:00", start: 11, end: 12 },
// //     { label: "12:00 to 1:00", start: 12, end: 13 },
// //     { label: "1:00 to 2:00", start: 13, end: 14 }
// //   ];

// //   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
// //   const [intervals, setIntervals] = useState([]);
// //   const [bookedSlots, setBookedSlots] = useState([]);
  
// //   useEffect(() => {
// //     // Fetch available time slots from backend
// //     axios.get('http://localhost:5000/timeslots')
// //       .then(response => setBookedSlots(response.data))
// //       .catch(error => console.error('Error fetching time slots:', error));
// //   }, []);

// //   const handleTimeSlotChange = (event) => {
// //     const selectedSlot = timeSlots.find(slot => slot.label === event.target.value);
// //     setSelectedTimeSlot(selectedSlot);

// //     if (selectedSlot) {
// //       const intervalArray = [];
// //       let currentTime = selectedSlot.start * 60; // Convert hours to minutes
// //       const endTime = selectedSlot.end * 60;

// //       while (currentTime < endTime) {
// //         const startHour = Math.floor(currentTime / 60);
// //         const startMinutes = currentTime % 60;
// //         currentTime += 5;
// //         const endHour = Math.floor(currentTime / 60);
// //         const endMinutes = currentTime % 60;

// //         intervalArray.push(
// //           `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} to ${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
// //         );
// //       }
// //       setIntervals(intervalArray);
// //     }
// //   };

// //   const handleBooking = (interval) => {
// //     axios.post('http://localhost:5000/book', { slot: interval })
// //       .then(response => {
// //         alert(response.data.message);
// //         // Fetch updated slots after booking
// //         return axios.get('http://localhost:5000/timeslots');
// //       })
// //       .then(response => setBookedSlots(response.data))
// //       .catch(error => {
// //         console.error('Error booking time slot:', error.response ? error.response.data : error.message);
// //         alert('Failed to book the slot. Please try again.');
// //       });
// //   };

// //   const isSlotBooked = (interval) => {
// //     return bookedSlots.some(slot => slot.slot === interval && slot.isBooked);
// //   };

// //   return (
// //     <div>
// //       <label htmlFor="timeSlot">Select Time Slot: </label>
// //       <select id="timeSlot" name="timeSlot" onChange={handleTimeSlotChange}>
// //         <option value="">Select a time slot</option>
// //         {timeSlots.map((slot, index) => (
// //           <option key={index} value={slot.label}>
// //             {slot.label}
// //           </option>
// //         ))}
// //       </select>

// //       {selectedTimeSlot && (
// //         <div>
// //           {intervals.map((interval, index) => (
// //             <div key={index}>
// //               <input 
// //                 type="checkbox" 
// //                 id={`interval-${index}`} 
// //                 disabled={isSlotBooked(interval)} 
// //                 onClick={() => handleBooking(interval)} 
// //               />
// //               <label htmlFor={`interval-${index}`}>
// //                 {interval} {isSlotBooked(interval) ? '(Booked)' : ''}
// //               </label>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default TimeSlot;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/Timeslot.css'
// function TimeSlot() {
//   const timeSlots = [
//     { label: "9:00 to 10:00", start: 9, end: 10 },
//     { label: "10:00 to 11:00", start: 10, end: 11 },
//     { label: "11:00 to 12:00", start: 11, end: 12 },
//     { label: "12:00 to 1:00", start: 12, end: 13 },
//     { label: "1:00 to 2:00", start: 13, end: 14 }
//   ];
//   const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [intervals, setIntervals] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/timeslots')
//       .then(response => setBookedSlots(response.data))
//       .catch(error => console.error('Error fetching time slots:', error));
//   }, []);

//   const handleTimeSlotChange = (event) => {
//     const selectedSlot = timeSlots.find(slot => slot.label === event.target.value);
//     setSelectedTimeSlot(selectedSlot);

//     if (selectedSlot) {
//       const intervalArray = [];
//       let currentTime = selectedSlot.start * 60; // Convert hours to minutes
//       const endTime = selectedSlot.end * 60;

//       while (currentTime < endTime) {
//         const startHour = Math.floor(currentTime / 60);
//         const startMinutes = currentTime % 60;
//         currentTime += 5;
//         const endHour = Math.floor(currentTime / 60);
//         const endMinutes = currentTime % 60;

//         intervalArray.push(
//           `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} to ${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
//         );
//       }
//       setIntervals(intervalArray);
//     } else {
//       setIntervals([]);
//     }
//   };

//   const handleBooking = (interval) => {
//     axios.post('http://localhost:5000/book', { slot: interval })
//       .then(response => {
//         if (response.data.success) {
//           alert(response.data.message);
//           // Fetch updated slots after booking
//           return axios.get('http://localhost:5000/timeslots');
//         } else {
//           throw new Error(response.data.message);
//         }
//       })
//       .then(response => setBookedSlots(response.data))
//       .catch(error => {
//         console.error('Error booking time slot:', error);
//         alert('Failed to book the slot. Please try again.');
//       });
//   };

//   const isSlotBooked = (interval) => {
//     return bookedSlots.some(slot => slot.slot === interval && slot.isBooked);
//   };
//   const handleDepartmentChange = (event) => {
//     setSelectedDepartment(event.target.value);
//   };
//   const handleCheckboxChange = (interval) => {
//     if (!isSlotBooked(interval)) {
//       handleBooking(interval);
//     }
//   };

//   return (
//     <div>
//        <label htmlFor="department">Select Department: </label>
//       <select id="department" name="department" value={selectedDepartment} onChange={handleDepartmentChange}>
//         <option value="">Select a department</option>
//         {departments.map((department, index) => (
//           <option key={index} value={department}>
//             {department}
//           </option>
//         ))}
//       </select>
//         <br/>

//       <label htmlFor="timeSlot">Select Time Slot: </label>
//       <select id="timeSlot" name="timeSlot" onChange={handleTimeSlotChange}>
//         <option value="">Select a time slot</option>
//         {timeSlots.map((slot, index) => (
//           <option key={index} value={slot.label}>
//             {slot.label}
//           </option>
//         ))}
//       </select>

//       {selectedTimeSlot && (
//         <div className='timeslot-part'>
//           {intervals.map((interval, index) => (
//             <div key={index}>
//               <input
//                 type="checkbox"
//                 id={`interval-${index}`}
//                 checked={isSlotBooked(interval)}
//                 disabled={isSlotBooked(interval)}
//                 onChange={() => handleCheckboxChange(interval)}
//               />
//               <label htmlFor={`interval-${index}`}>
//                 {interval} {isSlotBooked(interval) ? '(Booked)' : ''}
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TimeSlot;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/Timeslot.css';

// function TimeSlot() {
//   const timeSlots = [
//     { label: "9:00 to 10:00", start: 9, end: 10 },
//     { label: "10:00 to 11:00", start: 10, end: 11 },
//     { label: "11:00 to 12:00", start: 11, end: 12 },
//     { label: "12:00 to 1:00", start: 12, end: 13 },
//     { label: "1:00 to 2:00", start: 13, end: 14 }
//   ];
//   const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];

//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [intervals, setIntervals] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   useEffect(() => {
//     if (selectedDepartment) {
//       // Fetch the booked slots based on the selected department
//       axios.get(`http://localhost:5000/timeslots?department=${selectedDepartment}`)
//         .then(response => setBookedSlots(response.data))
//         .catch(error => console.error('Error fetching time slots:', error));
//     }
//   }, [selectedDepartment]);

//   const handleTimeSlotChange = (event) => {
//     const selectedSlot = timeSlots.find(slot => slot.label === event.target.value);
//     setSelectedTimeSlot(selectedSlot);

//     if (selectedSlot) {
//       const intervalArray = [];
//       let currentTime = selectedSlot.start * 60; // Convert hours to minutes
//       const endTime = selectedSlot.end * 60;

//       while (currentTime < endTime) {
//         const startHour = Math.floor(currentTime / 60);
//         const startMinutes = currentTime % 60;
//         currentTime += 5;
//         const endHour = Math.floor(currentTime / 60);
//         const endMinutes = currentTime % 60;

//         intervalArray.push(
//           `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} to ${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
//         );
//       }
//       setIntervals(intervalArray);
//     } else {
//       setIntervals([]);
//     }
//   };

//   const handleBooking = (interval) => {
//     if (!selectedDepartment) {
//       alert("Please select a department before booking.");
//       return;
//     }

//     axios.post('http://localhost:5000/book', { slot: interval, department: selectedDepartment })
//       .then(response => {
//         if (response.data.success){
//           alert(response.data.message);
//           // Fetch updated slots after booking
//           return axios.get(`http://localhost:5000/timeslots?department=${selectedDepartment}`);
//         } else {
//           throw new Error(response.data.message);
//         }
//       })
//       .then(response => setBookedSlots(response.data))
//       .catch(error => {
//         console.error('Error booking time slot:', error);
//         alert('Failed to book the slot. Please try again.');
//       });
//   };

//   const isSlotBooked = (interval) => {
//     return bookedSlots.some(slot => slot.slot === interval && slot.isBooked);
//   };

//   const handleDepartmentChange = (event) => {
//     setSelectedDepartment(event.target.value);
//     setSelectedTimeSlot(null); // Reset time slot when department changes
//     setIntervals([]);           // Clear intervals
//   };

//   const handleCheckboxChange = (interval) => {
//     if (!isSlotBooked(interval)) {
//       handleBooking(interval);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="department">Select Department: </label>
//       <select id="department" name="department" value={selectedDepartment} onChange={handleDepartmentChange}>
//         <option value="">Select a department</option>
//         {departments.map((department, index) => (
//           <option key={index} value={department}>
//             {department}
//           </option>
//         ))}
//       </select>
//       <br/>

//       {selectedDepartment && (
//         <>
//           <label htmlFor="timeSlot">Select Time Slot: </label>
//           <select id="timeSlot" name="timeSlot" onChange={handleTimeSlotChange}>
//             <option value="">Select a time slot</option>
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={slot.label}>
//                 {slot.label}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       {selectedTimeSlot && (
//         <div className='timeslot-part'>
//           {intervals.map((interval, index) => (
//             <div key={index}>
//               <input
//                 type="checkbox"
//                 id={`interval-${index}`}
//                 checked={isSlotBooked(interval)}
//                 disabled={isSlotBooked(interval)}
//                 onChange={() => handleCheckboxChange(interval)}
//               />
//               <label htmlFor={`interval-${index}`}>
//                 {interval} {isSlotBooked(interval) ? '(Booked)' : ''}
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TimeSlot;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2'
// import '../CSS/Timeslot.css';

// function TimeSlot() {
//   const timeSlots = [
//     { label: "9:00 to 10:00", start: 9, end: 10 },
//     { label: "10:00 to 11:00", start: 10, end: 11 },
//     { label: "11:00 to 12:00", start: 11, end: 12 },
//     { label: "12:00 to 1:00", start: 12, end: 13 },
//     { label: "1:00 to 2:00", start: 13, end: 14 }
//   ];
//   const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];

//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(''); // Set default to empty string
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [intervals, setIntervals] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   useEffect(() => {
//     if (selectedDepartment) {
//       // Fetch the booked slots based on the selected department
//       axios.get(`http://localhost:5000/timeslots?department=${selectedDepartment}`)
//         .then(response => setBookedSlots(response.data))
//         .catch(error => console.error('Error fetching time slots:', error));
//     }
//   }, [selectedDepartment]);

//   const handleTimeSlotChange = (event) => {
//     const selectedSlot = timeSlots.find(slot => slot.label === event.target.value);
//     setSelectedTimeSlot(event.target.value); // Update with the value from the dropdown

//     if (selectedSlot) {
//       const intervalArray = [];
//       let currentTime = selectedSlot.start * 60; // Convert hours to minutes
//       const endTime = selectedSlot.end * 60;

//       while (currentTime < endTime) {
//         const startHour = Math.floor(currentTime / 60);
//         const startMinutes = currentTime % 60;
//         currentTime += 5;
//         const endHour = Math.floor(currentTime / 60);
//         const endMinutes = currentTime % 60;

//         intervalArray.push(
//           `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} to ${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
//         );
//       }
//       setIntervals(intervalArray);
//     } else {
//       setIntervals([]);
//     }
//   };

//   const handleBooking = (interval) => {
//     if (!selectedDepartment) {
//       alert("Please select a department before booking.");
//       return;
//     }
  
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, book it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Proceed with booking if the user confirms
//         axios.post('http://localhost:5000/book', { slot: interval, department: selectedDepartment })
//           .then(response => {
//             if (response.data.success) {
//               Swal.fire({
//                 title: "Booked!",
//                 text: "The time slot has been successfully booked.",
//                 icon: "success"
//               });
//               // Fetch updated slots after booking
//               return axios.get(`http://localhost:5000/timeslots?department=${selectedDepartment}`);
//             } else {
//               throw new Error(response.data.message);
//             }
//           })
//           .then(response => setBookedSlots(response.data))
//           .catch(error => {
//             console.error('Error booking time slot:', error);
//             alert('Failed to book the slot. Please try again.');
//           });
//       }
//     });
//   };

//   const isSlotBooked = (interval) => {
//     return bookedSlots.some(slot => slot.slot === interval && slot.isBooked);
//   };

//   const handleDepartmentChange = (event) => {
//     setSelectedDepartment(event.target.value);
//     setSelectedTimeSlot(''); // Reset time slot
//     setIntervals([]);       // Clear intervals
//   };

//   const handleCheckboxChange = (interval) => {
//     if (!isSlotBooked(interval)) {
//       handleBooking(interval);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="department">Select Department: </label>
//       <select id="department" name="department" value={selectedDepartment} onChange={handleDepartmentChange}>
//         <option value="">Select a department</option>
//         {departments.map((department, index) => (
//           <option key={index} value={department}>
//             {department}
//           </option>
//         ))}
//       </select>
//       <br/>

//       {selectedDepartment && (
//         <>
//           <label htmlFor="timeSlot">Select Time Slot: </label>
//           <select
//             id="timeSlot"
//             name="timeSlot"
//             value={selectedTimeSlot} // Control the value with state
//             onChange={handleTimeSlotChange}
//           >
//             <option value="">Select a time slot</option>
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={slot.label}>
//                 {slot.label}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       {selectedTimeSlot && (
//         <div className='timeslot-part'>
//           {intervals.map((interval, index) => (
//             <div key={index}>
//               <input
//                 type="checkbox"
//                 id={`interval-${index}`}
//                 checked={isSlotBooked(interval)}
//                 disabled={isSlotBooked(interval)}
//                 onChange={() => handleCheckboxChange(interval)}
//               />
//               <label htmlFor={`interval-${index}`}>
//                 {interval} {isSlotBooked(interval) ? '(Booked)' : ''}
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TimeSlot;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/Timeslot.css';

function TimeSlot({patient_detail}) {
  const timeSlots = [
    { label: "9:00 to 10:00", start: 9, end: 10 },
    { label: "10:00 to 11:00", start: 10, end: 11 },
    { label: "11:00 to 12:00", start: 11, end: 12 },
    { label: "12:00 to 1:00", start: 12, end: 13 },
    { label: "1:00 to 2:00", start: 13, end: 14 }
  ];
  
  const hospitals = ["City Hospital", "General Hospital", "Health Care Center"];
  const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];

  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [intervals, setIntervals] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (selectedDepartment && selectedHospital) {
      axios.get(`http://localhost:5000/patient_timeslot/timeslots?department=${selectedDepartment}&hospital=${selectedHospital}`)
        .then(response => setBookedSlots(response.data))
        .catch(error => console.error('Error fetching time slots:', error));
    }
  }, [selectedDepartment, selectedHospital]);

  const handleTimeSlotChange = (event) => {
    const selectedSlot = timeSlots.find(slot => slot.label === event.target.value);
    setSelectedTimeSlot(event.target.value);

    if (selectedSlot) {
      const intervalArray = [];
      let currentTime = selectedSlot.start * 60;
      const endTime = selectedSlot.end * 60;

      while (currentTime < endTime) {
        const startHour = Math.floor(currentTime / 60);
        const startMinutes = currentTime % 60;
        currentTime += 5;
        const endHour = Math.floor(currentTime / 60);
        const endMinutes = currentTime % 60;

        intervalArray.push(
          `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} to ${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
        );
      }
      setIntervals(intervalArray);
    } else {
      setIntervals([]);
    }
  };

  const handleBooking = (interval) => {
    if (!selectedDepartment || !selectedHospital) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please select a hospital and department before booking.",
        showConfirmButton: false,
        timer: 2000
      });
      //alert("Please select a hospital and department before booking.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to book ${interval} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:5000/patient_timeslot/book', { slot: interval, department: selectedDepartment, hospital: selectedHospital , patient_detail:patient_detail })
          .then(response => {
            if (response.data.success) {
              Swal.fire({
                title: "Booked!",
                text: `The time slot ${interval} has been successfully booked.`,
                icon: "success"
              });
              return axios.get(`http://localhost:5000/patient_timeslot/timeslots?department=${selectedDepartment}&hospital=${selectedHospital}`);
            } else {
              throw new Error(response.data.message);
            }
          })
          .then(response => setBookedSlots(response.data))
          .catch(error => {
            console.error('Error booking time slot:', error);
            Swal.fire({
              position: "top",
              icon: "warning",
              title: "Department and Time slot must be different",
              showConfirmButton: false,
              timer: 2000
            });
          });
      }
    });
  };

  const isSlotBooked = (interval) => {
    return bookedSlots.some(slot => slot.slot === interval && slot.isBooked);
  };

  const handleHospitalChange = (event) => {
    setSelectedHospital(event.target.value);
    setSelectedDepartment('');
    setSelectedTimeSlot('');
    setIntervals([]);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedTimeSlot('');
    setIntervals([]);
  };

  return (
    <div className="container">
      <h1>Book Your Time Slot</h1>
      <div className="selector-group">
        <div>
          <label htmlFor="hospital">Select Hospital:</label>
          <select id="hospital" name="hospital" value={selectedHospital} onChange={handleHospitalChange}>
            <option value="">Select a hospital</option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
        </div>
        <div>
          
            <>
              <label htmlFor="department">Select Department:</label>
              <select id="department" name="department" value={selectedDepartment} onChange={handleDepartmentChange}>
                <option value="">Select a department</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </>
          
        </div>
      </div>
  
        <>
          <label htmlFor="timeSlot">Select Time Slot:</label>
          <select id="timeSlot" name="timeSlot" value={selectedTimeSlot} onChange={handleTimeSlotChange}>
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot.label}>
                {slot.label}
              </option>
            ))}
          </select>
        </>
      
  
      {selectedTimeSlot && (
        <div className="timeslot-part">
          {intervals.map((interval, index) => (
            <div key={index} className={`slot ${isSlotBooked(interval) ? 'booked' : 'unbooked'}`} onClick={() => !isSlotBooked(interval) && handleBooking(interval)}>
              <span className="slot-label">{interval}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeSlot;

