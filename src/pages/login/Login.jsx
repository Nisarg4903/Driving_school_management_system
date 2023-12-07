import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Auth, db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);

    signInWithEmailAndPassword(Auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Check for the admin user directly by email
        if (email === "nisarg4903@gmail.com") {
          // Dispatch admin login
          dispatch({ type: "LOGIN", payload: { ...user, role: "admin" } });
          // Navigate to the admin home page
          navigate("/home");
          return; // Prevent further execution
        }

        // Fetch the role from Firestore for other users
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Dispatch login with user role
          dispatch({
            type: "LOGIN",
            payload: { ...user, role: userData.role },
          });
          // Check for the student role and redirect
          if (userData.role === "student") {
            navigate("/StudentPage");
          } else {
            setError(true);
          }
        } else {
          // This case handles users without a role, default to student role
          dispatch({ type: "LOGIN", payload: { ...user, role: "student" } });
          navigate("/StudentPage");
        }
      })
      .catch((error) => {
        console.error("Login error", error);
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong Credentials!</span>}
      </form>
    </div>
  );
};

export default Login;
