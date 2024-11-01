import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import WorkflowList from './components/WorkflowList';
import { getToken, logout } from './services/auth';
import './App.css';

const App: React.FC = () => {
  const isAuthenticated = !!getToken();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>FlowForge</h1>
          <nav>
            <ul>
              {isAuthenticated ? (
                <>
                  <li><Link to="/">Workflows</Link></li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="nav-button"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <WorkflowList /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;