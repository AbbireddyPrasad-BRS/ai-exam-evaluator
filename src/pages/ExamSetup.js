// ExamSetup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import '../styles/ExamSetup.css';

const ExamSetup = () => {
  const navigate = useNavigate();
  const { setExamData } = useContext(ExamContext);

  const [maxMarks, setMaxMarks] = useState('');
  const [passMarks, setPassMarks] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const handleNumQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 100) {
      setNumQuestions('');
      setQuestions([]);
      return;
    }
    setNumQuestions(value);
    setQuestions(Array.from({ length: value }, () => ({ question: '', marks: '' })));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleSubmit = () => {
    if (!maxMarks || questions.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }

    const totalMarks = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);

    if (totalMarks !== Number(maxMarks)) {
      setError(`Total marks assigned to questions (${totalMarks}) do not match the maximum allowed (${maxMarks}).`);
      return;
    } else if (Number(passMarks) > Number(maxMarks)) {
      setError(`Minimum pass marks (${passMarks}) cannot exceed maximum marks (${maxMarks}).`);
      return;
    }

    setExamData(prev => ({
      ...prev,
      maxMarks,
      passMarks,
      questions,
    }));

    setError('');
    navigate('/uploadscript');
  };

  return (
    <div className="examsetup-container">
      <div className="upload-header">
        <button className="account-button" onClick={() => navigate('/account')}>👤 Account</button>
      </div>
      <h1 className="main-heading">AI Based Exam Paper Evaluation System</h1>
      <h2>Exam Setup</h2>
      <p>Fill in the details below to set up the exam. 
        <p>Note: Ensure that the total marks assigned to questions match the maximum marks.</p>
      </p>

      <div className="form-group">
        <label>Maximum Marks:</label>
        <input
          type="number"
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
          placeholder="Total Exam Marks"
          min="1"
        />
      </div>

      <div className="form-group">
        <label>Minimum Pass Marks:</label>
        <input
          type="number"
          value={passMarks}
          onChange={(e) => setPassMarks(e.target.value)}
          placeholder="Enter Minimum Pass Marks"
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Number of Questions:</label>
        <input
          type="number"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          placeholder="Enter Number of Questions"
          min="1"
          max="100"
        />
      </div>

      {questions.map((q, index) => (
        <div key={index} className="question-group">
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          />
          <input
            type="number"
            placeholder="Marks"
            value={q.marks}
            min="1"
            onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
          />
        </div>
      ))}

      {error && <p className="error">{error}</p>}

      <button className="submit-button" onClick={handleSubmit}>
        Submit & Proceed
      </button>
    </div>
  );
};

export default ExamSetup;
