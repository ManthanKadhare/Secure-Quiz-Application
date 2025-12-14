import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  BarChart3, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  BookOpen
} from 'lucide-react';
import { Question, Student, QuizResult } from '../App';

interface TeacherPanelProps {
  onBack: () => void;
}

const TeacherPanel: React.FC<TeacherPanelProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'addQuestion' | 'students' | 'results'>('dashboard');
  
  // Add Question Form
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questionMarks, setQuestionMarks] = useState(1);
  const [addMessage, setAddMessage] = useState('');
  
  // Data states
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [quizData, setQuizData] = useState<Question[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const savedQuizData = JSON.parse(localStorage.getItem('quizData') || '[]');
    
    setStudents(savedStudents);
    setResults(savedResults);
    setQuizData(savedQuizData);
  };

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'UPLHOD123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password! Access denied.');
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestion.trim() || options.some(opt => !opt.trim())) {
      setAddMessage('Please fill all fields correctly!');
      return;
    }

    const question: Question = {
      question: newQuestion.trim(),
      options: options.map(opt => opt.trim()),
      answer: correctAnswer,
      marks: questionMarks
    };

    const updatedQuizData = [...quizData, question];
    setQuizData(updatedQuizData);
    localStorage.setItem('quizData', JSON.stringify(updatedQuizData));

    setAddMessage('Question added successfully!');
    setNewQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
    setQuestionMarks(1);

    setTimeout(() => setAddMessage(''), 3000);
  };

  const downloadCSV = () => {
    if (results.length === 0) {
      alert('No results available to download.');
      return;
    }

    let csvContent = "Name,Enrollment,Score,Total,Percentage,Timestamp\n";
    results.forEach(result => {
      csvContent += `${result.name},${result.enroll},${result.score},${result.total},${result.percentage}%,${result.timestamp}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'quiz_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Teacher Authentication</h2>
              <p className="text-gray-600">Enter password to access teacher panel</p>
            </div>

            <form onSubmit={handleAuthentication} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter teacher password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Access Teacher Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Menu
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
                <p className="text-gray-600">Manage questions and monitor quiz performance</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'addQuestion', label: 'Add Question', icon: Plus },
                { id: 'students', label: 'Students', icon: Users },
                { id: 'results', label: 'Results', icon: BarChart3 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentView(id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentView === id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-800">{quizData.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Registered Students</p>
                  <p className="text-2xl font-bold text-gray-800">{students.length}/70</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Quiz Submissions</p>
                  <p className="text-2xl font-bold text-gray-800">{results.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {results.length ? (results.reduce((acc, r) => acc + parseFloat(r.percentage), 0) / results.length).toFixed(1) : '0'}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        )}

        {/* Add Question View */}
        {currentView === 'addQuestion' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Question</h2>
            
            <form onSubmit={handleAddQuestion} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter your question here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Option {index + 1}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder={`Enter option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correct Answer (0-3)
                  </label>
                  <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    {options.map((_, index) => (
                      <option key={index} value={index}>Option {index + 1}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks for this Question
                  </label>
                  <input
                    type="number"
                    value={questionMarks}
                    onChange={(e) => setQuestionMarks(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {addMessage && (
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{addMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Add Question
              </button>
            </form>
          </div>
        )}

        {/* Students View */}
        {currentView === 'students' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Registered Students ({students.length}/70)</h2>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No students registered yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {students.map((student, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{student.name}</h3>
                        <p className="text-sm text-gray-600">Enrollment: {student.enroll}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Registered
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results View */}
        {currentView === 'results' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Quiz Results ({results.length} submissions)</h2>
              {results.length > 0 && (
                <button
                  onClick={downloadCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No quiz submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results
                  .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
                  .map((result, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{result.name}</h3>
                          <p className="text-sm text-gray-600">Enrollment: {result.enroll}</p>
                          <p className="text-xs text-gray-500">Submitted: {result.timestamp}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">
                            {result.score}/{result.total}
                          </div>
                          <div className={`text-sm font-medium ${
                            parseFloat(result.percentage) >= 60 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {result.percentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPanel;