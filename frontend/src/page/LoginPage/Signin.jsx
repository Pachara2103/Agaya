import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles//LoginCSS/Signin.css";
import { FcGoogle } from "react-icons/fc";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/signup");
  };

  const fillEmail = (e) => {
    setEmail(e.target.value);
  };
  const fillPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="img-box">
        <div className="img"></div>
      </div>

      <div className="signin-container">
        <div className="column-box">
          <label className="title"> Sign in</label>
          <div className="google">
            <FcGoogle size={30} />
            <p className="normal-text">Sign in with Google</p>
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
            placeholder="Email"
            onChange={fillEmail}
            className="input normal-text"
          />
          <input
            type="text"
            placeholder="Password"
            onChange={fillPassword}
            className="input normal-text"
          />

          <button className="signin-button normal-text">Sign in</button>
          <button className="register-button normal-text" onClick={goToSignup}>
            Register Now
          </button>

          <p
            className="normal-text"
            style={{
              color: "#5B86E5",
              textAlign: "end",
            }}
          >
            Forget Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
