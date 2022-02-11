import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        email,
        password,
      }),
    })

    

    const data = await response.json();
console.log(response.json)
    if(data.user) {
      console.log('login successful')
      window.location.href = '/intranet'
    } else {
      console.log(data.user)
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
      </form>
    </div>
  );
};

export default Login;
