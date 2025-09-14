import { useState } from "react";
import TestUserFetch from "./components/TestUserFetch.jsx";
import Homepage from "./components/HomePage/Home";
import "./app.css";

function App() {
  const [count, setCount] = useState(0);
  let buttonArray = ["Home", " New Arrivals", "Sign in", ""];

  return (
    <>
      <TestUserFetch />
      <Homepage />
    </>
  );
}

export default App;
