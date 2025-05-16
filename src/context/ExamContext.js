import React, { createContext, useState } from 'react';

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [examData, setExamData] = useState({
    rollNumber: '',
    studentName: '',
    maxMarks: '',
    passMarks: '',
    questions: [],
  });

  const [facultyName, setFacultyName] = useState(''); // New: faculty name from Gmail

  return (
    <ExamContext.Provider value={{ examData, setExamData, facultyName, setFacultyName }}>
      {children}
    </ExamContext.Provider>
  );
};
