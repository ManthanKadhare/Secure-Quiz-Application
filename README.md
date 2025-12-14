# 🎓 SecureQuiz Pro

A modern, secure quiz application built with React and TypeScript, featuring advanced security measures and real-time monitoring capabilities.

![SecureQuiz Pro](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### 🔒 Security Features
- **Tab Switching Detection**: Automatic disqualification on tab switching
- **Keyboard Shortcuts Disabled**: F12, Ctrl+Shift+I, Ctrl+U, Ctrl+P, Ctrl+C, Ctrl+V, Ctrl+X
- **Right-click Protection**: Context menu disabled
- **Text Selection Disabled**: Prevents copying of questions
- **Secure Authentication**: Email validation with college domain verification
- **Session Management**: Secure student session handling

### 👨‍🎓 Student Features
- **Secure Login System**: College email validation (upluniversity.ac.in domain)
- **Interactive Quiz Interface**: Clean, modern UI with smooth transitions
- **Real-time Timer**: 60-minute countdown with visual warnings
- **Progress Tracking**: Visual progress bar and question indicators
- **Navigation Controls**: Previous/Next question navigation
- **Instant Results**: Immediate score calculation and display
- **Responsive Design**: Works on all devices and screen sizes

### 👨‍🏫 Teacher Features
- **Secure Authentication**: Password-protected teacher panel
- **Question Management**: Add, edit, and manage quiz questions
- **Student Monitoring**: View registered students (max 70 per session)
- **Results Analytics**: Comprehensive quiz results with statistics
- **CSV Export**: Download results in CSV format
- **Real-time Dashboard**: Live statistics and performance metrics

## 🚀 Live Demo

Visit the live application: [SecureQuiz Pro](https://famous-pixie-dbb352.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Build Tool**: Vite 5.4.2
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/securequiz-pro.git
   cd securequiz-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### For Students

1. **Access the Application**: Navigate to the application URL
2. **Student Login**: Click "Student Panel" and enter your details:
   - Full Name
   - Enrollment Number
   - College Email (format: `230102103005.name@upluniversity.ac.in`)
3. **Take the Quiz**: 
   - Answer questions within the 60-minute time limit
   - Use Previous/Next buttons to navigate
   - Submit when complete or time expires

### For Teachers

1. **Access Teacher Panel**: Click "Teacher Panel"
2. **Authentication**: Enter password: `UPLHOD123`
3. **Manage Questions**: Add new questions with multiple choice options
4. **Monitor Students**: View registered students and their status
5. **View Results**: Access comprehensive analytics and download CSV reports

## 🔧 Configuration

### Teacher Password
The default teacher password is `UPLHOD123`. To change it:

1. Open `src/components/TeacherPanel.tsx`
2. Find the authentication function
3. Update the password in the condition:
   ```typescript
   if (password === 'YOUR_NEW_PASSWORD') {
   ```

### Email Domain Validation
To change the accepted email domain:

1. Open `src/components/StudentLogin.tsx`
2. Update the email pattern:
   ```typescript
   const emailPattern = /^[0-9]{12}\.[a-z]+@yourdomain\.ac\.in$/;
   ```

### Quiz Timer
To modify the quiz duration:

1. Open `src/components/QuizPanel.tsx`
2. Change the initial timer value:
   ```typescript
   const [timeLeft, setTimeLeft] = useState(3600); // 3600 seconds = 60 minutes
   ```

### Student Limit
To change the maximum number of students:

1. Open `src/components/StudentLogin.tsx`
2. Update the limit check:
   ```typescript
   if (students.length >= 70) { // Change 70 to your desired limit
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── MainMenu.tsx          # Landing page with panel selection
│   ├── StudentLogin.tsx      # Student authentication form
│   ├── QuizPanel.tsx         # Main quiz interface
│   └── TeacherPanel.tsx      # Teacher dashboard and management
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles and Tailwind imports
```

## 🔐 Security Measures

### Client-Side Protection
- Disabled right-click context menu
- Blocked common keyboard shortcuts (F12, Ctrl+Shift+I, etc.)
- Text selection prevention
- Tab switching detection with automatic disqualification

### Data Validation
- Email format validation with domain checking
- Enrollment number uniqueness verification
- Input sanitization and trimming
- Session limit enforcement (70 students max)

### Session Management
- Local storage for data persistence
- Secure student session handling
- Teacher authentication with password protection
- Automatic quiz submission on security violations

## 📊 Data Storage

The application uses browser localStorage for data persistence:

- `students`: Array of registered student information
- `quizData`: Array of quiz questions and answers
- `quizResults`: Array of completed quiz submissions
- `currentStudent`: Current logged-in student session

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Local storage data persists across browser sessions (by design)
- Security measures can be bypassed by disabling JavaScript (inherent web limitation)
- Timer continues running in background tabs (by design for security)

## 🔮 Future Enhancements

- [ ] Backend integration with database storage
- [ ] Advanced analytics and reporting
- [ ] Question categories and difficulty levels
- [ ] Bulk question import from CSV/Excel
- [ ] Real-time proctoring features
- [ ] Mobile app version
- [ ] Multi-language support

## 📞 Support

For support, email manthankadhare@gmail.com or create an issue in this repository.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Netlify](https://netlify.com/)

---

**⚠️ Security Notice**: This application implements client-side security measures. For production use in high-stakes environments, consider implementing additional server-side security and proctoring solutions.
