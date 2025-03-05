import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState(""); // State for backend message

    useEffect(() => {
        fetch("http://localhost:8080/api/test")
            .then(response => response.text()) // If your API returns plain text
            .then(data => {
                console.log("Backend Response:", data);
                setMessage(data); // Save backend response to state
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            <div>
                <a href="https://google.com" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + T</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    Count is {count}
                </button>
                <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

            {/* Display Backend Message */}
            <div className="backend-message">
                <h2>Backend Response:</h2>
                <p>{message ? message : "Fetching data..."}</p>
            </div>
        </>
    );
}

export default App;
