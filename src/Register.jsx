import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div id="regi">
      <div id="register">
        <div className="register-form">
          <h2>Register</h2>
          <br />
          <form onSubmit={register}>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />{" "}
            <br />
            <br />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
            <br />
            <br />
            <div className="btpa">
              <button>Register</button>
            </div>
          </form>
          <p>
            Already have an account?<Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
