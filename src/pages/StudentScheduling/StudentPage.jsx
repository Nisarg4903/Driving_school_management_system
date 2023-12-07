import React, { useState, useEffect, useMemo } from "react";
import { db, Auth } from "../../Firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./studentpage.scss";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({
    fullName: "",
    date: "",
    time: "",
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const navigate = useNavigate();

  // Ensure user is authenticated before trying to access uid
  const userId = Auth.currentUser ? Auth.currentUser.uid : null;

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userId) {
      navigate("/login");
      return;
    }

    const unsubscribe = onSnapshot(
      query(collection(db, "appointments"), where("userId", "==", userId)),
      (snapshot) => {
        const newAppointments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(newAppointments);
      }
    );

    return () => unsubscribe();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("You must be logged in to schedule an appointment.");
      return;
    }
    try {
      await addDoc(collection(db, "appointments"), {
        ...appointment,
        userId: userId,
      });
      setAppointment({ fullName: "", date: "", time: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (!userId) {
      alert("You must be logged in to delete an appointment.");
      return;
    }
    try {
      const appointmentRef = doc(db, "appointments", id);
      const appointmentSnap = await getDoc(appointmentRef);

      if (
        appointmentSnap.exists() &&
        appointmentSnap.data().userId === userId
      ) {
        await deleteDoc(appointmentRef);
      } else {
        alert("You can only delete your own appointments.");
      }
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(Auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const allTimeSlots = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => {
      const hour = index + 9;
      return `${hour}:00`;
    });
  }, []);

  useEffect(() => {
    if (!userId || !appointment.date) {
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const currentHour = new Date().getHours();
    const availableTodaySlots = allTimeSlots.filter(
      (slot) => parseInt(slot) > currentHour
    );

    const q = query(
      collection(db, "appointments"),
      where("date", "==", appointment.date),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookedSlots = snapshot.docs.map((doc) => doc.data().time);
      const newAvailableTimeSlots =
        appointment.date === today
          ? availableTodaySlots.filter((slot) => !bookedSlots.includes(slot))
          : allTimeSlots.filter((slot) => !bookedSlots.includes(slot));

      setAvailableTimeSlots(newAvailableTimeSlots);
    });

    return () => unsubscribe();
  }, [appointment.date, userId]);


  return (
    <div className="schedule">
      <div className="scheduleContainer">
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
            {/* Update the table header and body to include fullName */}
            <thead>
              <tr>
                <th>Full Name</th> {/* Updated from Email to Full Name */}
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
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default List;
