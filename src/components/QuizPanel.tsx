import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';
import { Student, Question, QuizResult } from '../App';

interface QuizPanelProps {
  student: Student;
  onBack: () => void;
}

const QuizPanel: React.FC<QuizPanelProps> = ({ student, onBack }) => {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState<string>('');

  // Initialize quiz data
  useEffect(() => {
    const defaultQuestions: Question[] = [
      {
        question: "HTML નું full form શું છે?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Marking Language", "Hyper Tool Multi Language"],
        answer: 1
      },
      {
        question: "CSS નો ઉપયોગ શું માટે થાય છે?",
        options: ["Web page નું style design કરવા", "Database manage કરવા", "Server configure કરવા", "Programming logic બનાવા"],
        answer: 0
      },
      {
        question: "JavaScript શું છે?",
        options: ["Programming Language", "Database", "Operating System", "Compiler"],
        answer: 0
      }
    ];

    const savedQuestions = localStorage.getItem('quizData');
    const questions = savedQuestions ? JSON.parse(savedQuestions) : defaultQuestions;
    
    setQuizData(questions);
    setUserAnswers(new Array(questions.length).fill(null));
  }, []);

  // Timer
  useEffect(() => {
    if (quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizSubmitted]);

  // Tab switching detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !quizSubmitted) {
        alert('❌ You switched tabs. You are disqualified!');
        handleSubmitQuiz();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [quizSubmitted]);

  const handleSubmitQuiz = useCallback(() => {
    if (quizSubmitted) return;

    let score = 0;
    quizData.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score++;
      }
    });

    const percentage = (score / quizData.length) * 100;
    setResult(`Score: ${score}/${quizData.length} (${percentage.toFixed(2)}%)`);
    setQuizSubmitted(true);

    // Save result
    const results: QuizResult[] = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push({
      name: student.name,
      enroll: student.enroll,
      score,
      total: quizData.length,
      percentage: percentage.toFixed(2),
      timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('quizResults', JSON.stringify(results));
  }, [quizData, userAnswers, student, quizSubmitted]);

  const handleAnswerChange = (answerIndex: number) => {
    if (quizSubmitted) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQ = quizData[currentQuestion];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                disabled={!quizSubmitted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  quizSubmitted 
                    ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                {quizSubmitted ? 'Back to Menu' : 'Quiz in Progress'}
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Secure Quiz</h1>
                <p className="text-sm text-gray-600">Welcome, {student.name}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
              timeLeft <= 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} of {quizData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  userAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${quizSubmitted ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={userAnswers[currentQuestion] === index}
                  onChange={() => handleAnswerChange(index)}
                  disabled={quizSubmitted}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0 || quizSubmitted}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentQuestion === 0 || quizSubmitted
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {quizData.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion
                      ? 'bg-blue-500'
                      : userAnswers[index] !== null
                      ? 'bg-green-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentQuestion === quizData.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={quizSubmitted}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  quizSubmitted
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <Send className="w-4 h-4" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(quizData.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === quizData.length - 1 || quizSubmitted}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  currentQuestion === quizData.length - 1 || quizSubmitted
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-lg">{result}</p>
            <div className="mt-4 text-sm opacity-90">
              Thank you for participating in the secure quiz.
            </div>
          </div>
        )}

        {/* Security Warning */}
        {!quizSubmitted && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Do not switch tabs or leave this window. Any attempt will result in automatic disqualification.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPanel;