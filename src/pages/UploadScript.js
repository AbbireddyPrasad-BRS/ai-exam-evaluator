// UploadScript.js
import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import '../styles/UploadScript.css';

const UploadScript = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { examData, setExamData } = useContext(ExamContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setShowPopup(false);
    } else {
      alert('Only PDF files are allowed!');
    }
  };

  const handleCancelUpload = () => {
    setUploadedFile(null);
    fileInputRef.current.value = null;
    setShowPopup(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      alert('Only PDF files are allowed!');
    }
  };

  const handleSubmit = () => {
    if (!rollNumber || !studentName) {
      alert('Please enter Roll Number and Student Name.');
      return;
    }

    if (uploadedFile) {
      setExamData(prev => ({
        ...prev,
        rollNumber,
        studentName,
      }));

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate(`/marks/${rollNumber}`);
      }, 1500);
    } else {
      alert('Please upload a file before submitting.');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <button className="back-button" onClick={() => navigate('/examsetup')}>
          ⬅ Go Back
        </button>
        <button className="account-button" onClick={() => navigate('/account')}>
          👤 Account
        </button>
      </div>

      <h1 className="main-heading">AI Based Exam Paper Evaluation System</h1>

      <div className="student-roll-number">
        <label>Student Roll Number:</label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
        />
      </div>

      <div className="student-name">
        <label>Student Name:</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter Student Name"
        />
      </div>

      <h2 className="upload-title">Upload Answer Script</h2>

      <div
        className={`dropzone ${isDragging ? 'dragging' : ''} ${uploadedFile ? 'active' : ''}`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <p>{uploadedFile ? uploadedFile.name : 'Click or drag a PDF file here to upload'}</p>
      </div>

      {uploadedFile && (
        <div className="file-controls">
          <button className="cancel" onClick={handleCancelUpload}>Cancel Upload</button>
          <button
            className="view"
            onClick={() => window.open(URL.createObjectURL(uploadedFile), '_blank')}
          >
            View File
          </button>
        </div>
      )}

      <button className="submit" onClick={handleSubmit}>Submit</button>

      {showPopup && <div className="popup-alert">✅ Submitted Successfully!</div>}
    </div>
  );
};

export default UploadScript;
