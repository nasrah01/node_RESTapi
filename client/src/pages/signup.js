import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if(data.status === 200) {
      navigate('/login')
    } 

    if(data.status === 400) {
      console.log(data.message)
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
      </form>
      <div></div>
    </div>
  );
}

export default Signup;
