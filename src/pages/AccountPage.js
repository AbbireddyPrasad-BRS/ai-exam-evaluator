import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext'; // ✅ Import context
import '../styles/AccountPage.css';

const AccountPage = () => {
  const navigate = useNavigate();
  const { facultyName } = useContext(ExamContext); // ✅ Use context instead of hardcoded email

  // Dummy student data with mock question/marks arrays
  const students = [
    {
      rollNo: '101',
      name: 'John',
      file: 'john_script.pdf',
      questions: [
        { question: 'Q1', marks: 5, aiMarks: 4 },
        { question: 'Q2', marks: 10, aiMarks: 9 },
      ],
    },
    {
      rollNo: '102',
      name: 'Alice',
      file: 'alice_script.pdf',
      questions: [
        { question: 'Q1', marks: 5, aiMarks: 5 },
        { question: 'Q2', marks: 10, aiMarks: 8 },
      ],
    },
  ];

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/login');
  };

  const getTotal = (questions) =>
    questions.reduce((sum, q) => sum + Number(q.aiMarks), 0);

  const getMax = (questions) =>
    questions.reduce((sum, q) => sum + Number(q.marks), 0);

  return (
    <div className="account-page-container">
      

      {/* 🔝 Navigation Buttons */}
      <div className="nav-bar">
        <button onClick={() => navigate('/examsetup')}>📝 Exam Setup</button>
        <button onClick={() => navigate('/uploadscript')}>📤 Upload Script</button>
      </div>
 <h1 className="main-heading">AI Based Exam Paper Evaluation System</h1>

      {/* 🔝 Faculty Header */}
      <div className="faculty-bar">
        <p>👩‍🏫 Faculty: <strong>{facultyName || 'Unknown'}</strong></p>
      </div>

      <h2>📚 Student Marks Records (Upload History)</h2>

      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Total/Max Marks</th>
            <th>Script</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.rollNo}</td>
              <td>{s.name}</td>
              <td>
                {getTotal(s.questions)} / {getMax(s.questions)}
              </td>
              <td>
                <a href={`/${s.file}`} target="_blank" rel="noreferrer">View</a>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔚 Logout Button */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">🚪 Logout</button>
      </div>
    </div>
  );
};

export default AccountPage;
