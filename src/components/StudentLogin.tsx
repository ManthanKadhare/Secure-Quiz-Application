import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Hash, AlertCircle, CheckCircle } from 'lucide-react';
import { Student } from '../App';

interface StudentLoginProps {
  onLogin: (student: Student) => void;
  onBack: () => void;
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onLogin, onBack }) => {
  const [name, setName] = useState('');
  const [enroll, setEnroll] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (!name.trim() || !enroll.trim() || !email.trim()) {
        setMessage('Please fill in all fields.');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      const emailPattern = /^[0-9]{12}\.[a-z]+@upluniversity\.ac\.in$/;
      if (!emailPattern.test(email)) {
        setMessage('Invalid email format. Use your college email (e.g., 230102103005.name@upluniversity.ac.in)');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      let students = JSON.parse(localStorage.getItem('students') || '[]');
      
      const alreadyExists = students.some((s: Student) => s.enroll === enroll || s.email === email);
      if (alreadyExists) {
        setMessage('You have already registered or email/enrollment number is duplicate.');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      if (students.length >= 70) {
        setMessage('Class strength full. You cannot participate.');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      const newStudent = { name: name.trim(), enroll: enroll.trim(), email: email.trim() };
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('currentStudent', JSON.stringify(newStudent));

      setMessage('Login successful! Starting quiz...');
      setIsError(false);
      
      setTimeout(() => {
        onLogin(newStudent);
        setIsLoading(false);
      }, 1500);
    }, 1000);
  };

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Login</h2>
            <p className="text-gray-600">Enter your details to start the quiz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                Enrollment Number
              </label>
              <input
                type="text"
                value={enroll}
                onChange={(e) => setEnroll(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter enrollment number"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                College Email ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="230102103005.name@upluniversity.ac.in"
                disabled={isLoading}
              />
            </div>

            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                isError 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                <span className="text-sm">{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                'Start Quiz'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Maximum 70 students allowed per session
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;