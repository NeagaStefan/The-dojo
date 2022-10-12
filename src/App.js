import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import './App.css';
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/Signup/Signup";
import Project from "./pages/Project/Project";
import Create from "./pages/Create/Create";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {useAuthContext} from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";
import Update from "./pages/Update/Update";

function App() {
    const {authIsReady, user} = useAuthContext()

    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    {user && <Sidebar/>}
                    <div className="container">
                        <Navbar/>
                        <Routes>
                            <Route exact path="/"
                                element ={!user ? <Navigate to="/login"/> : <Dashboard/>}
                            />
                            <Route path="/create"
                                element={!user ? <Navigate to="/login"/> : <Create/>}
                            />
                            <Route path="/projects/:id"
                                element={!user ? <Navigate to="/login"/> : <Project/>}
                            />
                            <Route path="/login"
                                element={user ? <Navigate to="/"/> : <Login/>}
                            />
                            <Route path="/signup"
                                element ={user ?  <Navigate to="/"/> : <Signup/>}
                            />
                            <Route path="/update"
                                   element ={!user ?  <Navigate to="/login"/> : <Update/>}
                            />
                        </Routes>
                    </div>
                    {user && <OnlineUsers/>}
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;
