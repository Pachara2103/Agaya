import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/HomePage/Home.jsx";
import Signin from "./page/LoginPage/Signin.jsx"
import Signup from "./page/LoginPage/Signup.jsx"

function App() {
  // https://reactrouter.com/start/declarative/routing
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />}/>
        <Route path="signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
