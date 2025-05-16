import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setFacultyName } = useContext(ExamContext);

  const handleLogin = () => {
    if (email === 'abc@gmail.com' && password === '123') {
      const name = email.split('@')[0];
      setFacultyName(name);
      navigate('/examsetup');
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    <div className="login-container">
      {/* 🔵 Main heading */}
      <h1 className="main-heading">AI Based Exam Paper Evaluation System</h1>

      {/* 🔵 Login form */}
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Faculty Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="login-password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword(!showPassword)}>👁</button>
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <p>New user? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
