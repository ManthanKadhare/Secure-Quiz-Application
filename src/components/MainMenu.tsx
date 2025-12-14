import React from 'react';
import { User, GraduationCap, BookOpen, Shield } from 'lucide-react';

interface MainMenuProps {
  onStudentClick: () => void;
  onTeacherClick: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStudentClick, onTeacherClick }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SecureQuiz Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advanced secure quiz platform with real-time monitoring and comprehensive analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Panel */}
          <div 
            onClick={onStudentClick}
            className="group cursor-pointer"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Student Panel</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Take secure timed quizzes with advanced monitoring and instant results
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure Environment</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Interactive Questions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Panel */}
          <div 
            onClick={onTeacherClick}
            className="group cursor-pointer"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Teacher Panel</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Create questions, monitor students, and analyze comprehensive results
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Question Management</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Student Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2">
            <Shield className="w-4 h-4" />
            <span>Powered by Advanced Security Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;