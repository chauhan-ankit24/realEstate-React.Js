import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(username, email, password);
    registerUser(username, email, password);
  };

  async function registerUser(username, email, password) {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      });
      console.log("User registered successfully:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response.data.message);
    }
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button >Register</button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
