// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExamSetup from './pages/ExamSetup';
import UploadScript from './pages/UploadScript';
import MarksDisplay from './pages/MarksDisplay';
import AccountPage from './pages/AccountPage';
import './App.css';

import { ExamProvider } from './context/ExamContext'; // <-- import context

function App() {
  return (
    <ExamProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/examsetup" element={<ExamSetup />} />
          <Route path="/uploadscript" element={<UploadScript />} />
          <Route path="/marks/:rollNo" element={<MarksDisplay />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </ExamProvider>
  );
}

export default App;
