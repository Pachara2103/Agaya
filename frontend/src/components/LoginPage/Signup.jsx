import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./signin.css";
import { FcGoogle } from "react-icons/fc";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToSignin= () => {
    navigate("/signin");
  };

   const fillEmail = (e) =>{
     setEmail(e.target.value);
  }
  const fillPassword = (e) =>{
     setPassword(e.target.value);
  }

  return (
    <div className="container">
      <div className="img-box">
        <div className="img"></div>
      </div>

      <div className="signin-container">
        <div className="column-box">
          <label className="title"> Sign up</label>
          <div className="google">
            <FcGoogle size={30} />
            <p className="normal-text">Sign up with Google</p>
          </div>

          <p
            style={{
              color: "#838383",
              fontSize: "25px",
              margin: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            - OR -
          </p>
          <input
            type="text"
            placeholder="First Name"
            onChange={fillEmail}
            className="input normal-text"
          />

          <input
            type="text"
            placeholder="Last Name"
            onChange={fillEmail}
            className="input normal-text"
          />

          <input
            type="text"
            placeholder="Email"
            onChange={fillEmail}
            className="input normal-text"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={fillPassword}
            className="input normal-text"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={fillPassword}
            className="input normal-text"
          />

          <button className="signin-button normal-text">Create Account</button>

          <p
            className="normal-text"
            style={{
              color: "#5B86E5",
              textAlign: "end",
              cursor:"pointer"
            }}
            onClick={goToSignin}
          >
            Already have a account?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
