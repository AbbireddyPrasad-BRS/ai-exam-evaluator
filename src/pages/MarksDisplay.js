// src/pages/MarksDisplay.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import '../styles/MarksDisplay.css';

const MarksDisplay = () => {
  const navigate = useNavigate();
  const { examData } = useContext(ExamContext);

  // Calculate AI marks per question and total
  const aiMarks = examData.questions.map(q =>
    Math.floor(Math.random() * (Number(q.marks) + 1))
  );
  const totalObtained = aiMarks.reduce((sum, mark) => sum + mark, 0);
  const maxMarks = Number(examData.maxMarks) || 0;
  const passPercentage = 0.4;
  const status = totalObtained >= maxMarks * passPercentage ? '✅ Pass' : '❌ Fail';

  return (
    
    <div className="marks-container">
      <h1 className="main-heading">AI Based Exam Paper Evaluation System</h1>
      <div className="marks-header">
        <h2>🧠 Evaluation Results</h2>
        <button onClick={() => navigate('/account')} className="account-btn">👤 Account</button>
      </div>

      <div className="student-info">
        <p><strong>🆔 Roll Number:</strong> {examData.rollNumber || 'Not Provided'}</p>
        <p><strong>🎓 Student Name:</strong> {examData.studentName || 'Not Provided'}</p>
        
      </div>

      <h3>📄 Question Breakdown:</h3>
      <table className="marks-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Max Marks</th>
            <th>AI Awarded Marks</th>
          </tr>
        </thead>
        <tbody>
          {examData.questions.length > 0 ? (
            examData.questions.map((q, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{q.question}</td>
                <td>{q.marks}</td>
                <td className="ai-mark">{aiMarks[index]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No questions available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔽 New Section: Total Marks & Status */}
      <div className="result-summary">
        <p><strong>📊 Total Marks Obtained:</strong> {totalObtained} / {maxMarks}</p>
        <p><strong>📌 Status:</strong> {status}</p>
      </div>

      <button className="back-btn" onClick={() => navigate('/uploadscript')}>⬅ Upload Another</button>
    </div>
  );
};

export default MarksDisplay;
