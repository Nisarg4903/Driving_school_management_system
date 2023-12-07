import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Auth, db, storage } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name; // Create a unique file name
      const storageRef = ref(storage, name); // Use the unique file name for the storage reference

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          alert("Upload failed: " + error.message);
          setPerc(null); // Reset the percentage
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            setPerc(null); // Reset the percentage when upload is complete
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (data.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if the image is fully uploaded
    if (!data.img) {
      alert("Please wait until the image has finished uploading.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        Auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        role: "student", // Specify the user role
        timeStamp: serverTimestamp(),
      });

      navigate(-1);
    } catch (err) {
      console.log(err);
      alert("An error occurred while creating the user."); // Display a user-friendly error message
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
              }
              alt="Img Upload"
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {/* Update the input fields to match your table columns */}
              <div className="formInput">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input id="dateOfBirth" type="date" onChange={handleInput} />
              </div>

              <div className="formInput">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPassword}
                />
              </div>
              <div className="formInput">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label htmlFor="idNumber">ID-Number:</label>
                <input
                  id="ID-Number"
                  type="text"
                  placeholder="ID-Number"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="payment">Payment Amount:</label>
                <input
                  id="payment"
                  type="text"
                  placeholder="ID-Number"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="lessons">Lessons:</label>
                <input
                  id="lessons"
                  type="number"
                  placeholder="Amount of lessons"
                  onChange={handleInput}
                />
              </div>

              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
