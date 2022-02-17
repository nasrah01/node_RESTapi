import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      navigate("/dashboard")
    }
  }, [navigate])

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Sign In!</h1>
      <form onSubmit={onFormSubmit}>
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
        <input type="submit" value="login" />
        <div>{error && <span>{error}</span>}</div>
      </form>
      <span>
        Don't have an account? <Link to="/login">Sign up</Link>
      </span>
    </div>
  );
};

export default Login;
