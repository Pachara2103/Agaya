import { useState } from "react";
import "./app.css";

function App() {
  const [count, setCount] = useState(0);
  let buttonArray = ["Home", " New Arrivals", "Sign in", ""];

  return (
    <>
      <header>
        <nav>
          <div className="top-bar">
            <div className="logo">
              <h className="title-text">Agaya</h>
              <p>Welcome to our website</p>
            </div>

            <ul className="menu">
              <li>Home</li>
              <li>New Arrivals</li>
              <li>Sign in</li>
              <button>Sign up</button>
            </ul>

          </div>
        </nav>
      </header>

      <section>
        <div className="content">

          

        </div>

      </section>
    
    </>
  );
}

export default App;
