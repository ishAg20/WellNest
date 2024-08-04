import React, { useState } from "react";
import "./ChatSupport.css";

const ChatSupport = () => {
  const doctors = [
    {
      name: "Dr. Alice Smith",
      qualification: "MD",
      specialty: "Psychotherapy",
      availableDays: ["Monday", "Wednesday", "Friday"],
      availableTimes: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    },

    {
      name: "Dr. Carol Williams",
      qualification: "MD",
      specialty: "Mental Health",
      availableDays: ["Monday", "Thursday"],
      availableTimes: ["11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"],
    },
    {
      name: "Dr. David Brown",
      qualification: "MBBS",
      specialty: "Therapy",
      availableDays: ["Wednesday", "Friday"],
      availableTimes: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    },
    {
      name: "Dr. Emma Jones",
      qualification: "DO",
      specialty: "Wellness",
      availableDays: ["Monday", "Tuesday", "Thursday"],
      availableTimes: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"],
    },
    {
      name: "Dr. Frank Garcia",
      qualification: "MD",
      specialty: "Psychiatry",
      availableDays: ["Wednesday", "Friday"],
      availableTimes: ["11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"],
    },
    {
      name: "Dr. Hannah Lee",
      qualification: "PhD",
      specialty: "Behavioral Therapy",
      availableDays: ["Monday", "Thursday"],
      availableTimes: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    },
    {
      name: "Dr. Ian Martinez",
      qualification: "MD",
      specialty: "Clinical Psychology",
      availableDays: ["Tuesday", "Thursday"],
      availableTimes: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"],
    },
    {
      name: "Dr. Jenna Kim",
      qualification: "MBBS",
      specialty: "Family Therapy",
      availableDays: ["Wednesday", "Friday"],
      availableTimes: ["11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"],
    },
    {
      name: "Dr. Kevin Patel",
      qualification: "MD",
      specialty: "Child Psychology",
      availableDays: ["Monday", "Tuesday", "Friday"],
      availableTimes: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    email: "",
  });

  const handleAppointmentClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment scheduled with:", selectedDoctor);
    console.log("Appointment details:", appointmentDetails);
    // Add logic to save or send appointment details
    setSelectedDoctor(null);
    setAppointmentDetails({ date: "", time: "", email: "" });
  };

  return (
    <div className="chat-support">
      <h2>Chat Support</h2>
      <div className="doctor-list">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-item">
            <h3>{doctor.name}</h3>
            <p>{doctor.qualification}</p>
            <p>{doctor.specialty}</p>
            <p>Available Days: {doctor.availableDays.join(", ")}</p>
            <p>Available Times: {doctor.availableTimes.join(", ")}</p>
            <button onClick={() => handleAppointmentClick(doctor)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <div className="appointment-form">
          <h3>Schedule an Appointment with {selectedDoctor.name}</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={appointmentDetails.date}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Time:
              <select
                name="time"
                value={appointmentDetails.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a time</option>
                {selectedDoctor.availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={appointmentDetails.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Schedule Appointment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
