import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        console.log(json.authToken);
        localStorage.setItem("token", json.authToken);
        navigate("/");
        //props.showAlert("Account Created Successfully!!", "success");
        alert("Account Created Successfully!!");
      } else {
        // props.showAlert("Invalid Credentials", "danger");
        alert("Invalid Credentials");
      }
    } else {
      //props.showAlert("Enter the your Password Carefully", "danger");
      alert("Enter the your Password Carefully");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
