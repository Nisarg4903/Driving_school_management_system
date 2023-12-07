import React, { useState, useEffect, useMemo } from "react";
import { db } from "../../Firebase"; // Ensure this path is correct
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import "./schedule.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const List = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({
    fullName: "", // Add a field for fullName
    date: "",
    time: "",
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure to use the correct Firebase collection and document structure
      await addDoc(collection(db, "appointments"), {
        fullName: appointment.fullName, // Use fullName here
        date: appointment.date,
        time: appointment.time,
      });
      setAppointment({ fullName: "", date: "", time: "" }); // Reset form
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const newAppointments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(newAppointments);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  // Generate a list of hourly time slots from 9 AM to 6 PM
  const allTimeSlots = useMemo(() => {
    return Array.from(new Array(10), (_, index) => {
      const hour = index + 9; // Start at 9 AM
      return `${hour < 10 ? "0" + hour : hour}:00`; // Format: "HH:00"
    });
  }, []); // Empty dependency array means this runs once

  useEffect(() => {
    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    // Get the current hour
    const currentHour = new Date().getHours();

    // Filter out the past time slots for today
    const availableTodaySlots = allTimeSlots.filter((slot) => {
      const slotHour = parseInt(slot.split(":")[0], 10);
      return currentHour < slotHour;
    });

    // Query appointments for the selected date
    const appointmentsRef = collection(db, "appointments");
    const q = query(appointmentsRef, where("date", "==", appointment.date));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookedSlots = snapshot.docs.map((doc) => doc.data().time);
      // Filter out the booked slots for the selected date
      const newAvailableTimeSlots =
        appointment.date === today ? availableTodaySlots : allTimeSlots;
      setAvailableTimeSlots(
        newAvailableTimeSlots.filter((slot) => !bookedSlots.includes(slot))
      );
    });

    return () => unsubscribe();
  }, [appointment.date]); // Dependency on appointment.date only
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={appointment.fullName}
                onChange={(e) =>
                  setAppointment({ ...appointment, fullName: e.target.value })
                }
                placeholder="Enter student's full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={appointment.date}
                onChange={(e) =>
                  setAppointment({ ...appointment, date: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time Slot</label>
              <select
                id="time"
                value={appointment.time}
                onChange={(e) =>
                  setAppointment({ ...appointment, time: e.target.value })
                }
                required
              >
                <option value="">Select Time Slot</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Add Appointment
            </button>
          </form>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.fullName}</td>{" "}
                  {/* Updated from Email to Full Name */}
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>
                    <button onClick={() => handleDelete(appt.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
