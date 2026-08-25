import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
 
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div id="log">
      <div id="login">
        <div className="login-form">
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <div className="btpa">
              <button>Login</button>
            </div>
          </form>
          <p>
            Are you new to this page <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
