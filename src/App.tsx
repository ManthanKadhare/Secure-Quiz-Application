import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Clock, FileText, Download, Users, BarChart3 } from 'lucide-react';
import MainMenu from './components/MainMenu';
import StudentLogin from './components/StudentLogin';
import QuizPanel from './components/QuizPanel';
import TeacherPanel from './components/TeacherPanel';

export interface Question {
  question: string;
  options: string[];
  answer: number;
  marks?: number;
}

export interface Student {
  name: string;
  enroll: string;
  email: string;
}

export interface QuizResult {
  name: string;
  enroll: string;
  score: number;
  total: number;
  percentage: string;
  timestamp: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'menu' | 'studentLogin' | 'quiz' | 'teacher'>('menu');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // Security: Disable right-click, copy, paste, and developer tools
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+P, Ctrl+C, Ctrl+V, Ctrl+X
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67)) || // Ctrl+Shift+I/C
        (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 80 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)) // Ctrl+U/P/C/V/X
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleStudentLogin = (student: Student) => {
    setCurrentStudent(student);
    setCurrentView('quiz');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setCurrentStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 select-none">
      {currentView === 'menu' && (
        <MainMenu
          onStudentClick={() => setCurrentView('studentLogin')}
          onTeacherClick={() => setCurrentView('teacher')}
        />
      )}
      
      {currentView === 'studentLogin' && (
        <StudentLogin
          onLogin={handleStudentLogin}
          onBack={handleBackToMenu}
        />
      )}
      
      {currentView === 'quiz' && currentStudent && (
        <QuizPanel
          student={currentStudent}
          onBack={handleBackToMenu}
        />
      )}
      
      {currentView === 'teacher' && (
        <TeacherPanel onBack={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;