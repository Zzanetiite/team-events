import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CounterButton from "./components/CounterButton";
import { CSRFProvider } from "./context/CsrfContext";

function App() {
  return (
    <CSRFProvider>
      <div className="App">
        <div className="App">
          <h1>Counter Example</h1>
          <CounterButton counterId={1} />
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </CSRFProvider>
  );
}

export default App;
