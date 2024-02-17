import "./App.css";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import { useSetValue } from "../Redux/StateProvider";

function App() {
  const [{ user }] = useSetValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
