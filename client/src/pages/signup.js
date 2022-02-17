import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json"
      },
    };

   try {
     const { data } = await axios.post("http://localhost:5000/auth/register", {name, email, password}, config);
     
     localStorage.setItem("authToken", data.token);

     navigate("/login");

   } catch (error) {
     setError(error.response.data.error);
   }

  };

  return (
    <div>
      <h1>Sign Up!</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />
        </div>
        <input type="submit" value="Sign Up" />
        <div>{error && <span>{error}</span>}</div>
      </form>
      <span>Already have an account? <Link to="/login">Login</Link></span>
    </div>
  );
}

export default Signup;
