/*import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import SignUp from "./components/pages/SignUp/SignUp";
import { AuthProvider } from './Auth';
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Routes>
              <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
          </Routes>
        </div>
      </BrowserRouter>      
    </AuthProvider>    
  );
}

export default App;*/

import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/pages/Home/Home';
import AuthDetails from './components/auth/AuthDetails/AuthDetails';
import LogIn from './components/pages/Login/Login';
import SignUp from './components/pages/SignUp/SignUp';
import Profile from "./components/pages/Profile/Profile";
import RecipeSearch from "./components/pages/RecipeSearch/RecipeSearch"
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" elements={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recipe-search" element={<RecipeSearch />} />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <AuthDetails />
    </div>
  );
}

export default App;
