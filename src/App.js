import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Auth/Login";
import { useState } from "react";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };

  return (
    <div className="app">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <Header signOut={signOut} user={user} />
          <div className="app-body">
            <Sidebar user={user} />
            <Routes>
              <Route
                exact
                path="/"
                element={<h1> Select or Create Channel</h1>}
              />
              <Route
                exact
                path="/room/:roomId"
                element={<Chat user={user} />}
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
