# Quiz Application

A modern, interactive quiz application built with vanilla JavaScript that offers multiple categories and a sleek user interface with dark/light mode support.

## 🎯 Features

- **Multiple Quiz Categories**: Choose from 10 different quiz categories
  - General Knowledge
  - Programming
  - Football
  - Science
  - Mathematics
  - Abbreviations
  - Languages
  - History
  - Capitals
  - Sports

- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference storage
- **Timed Questions**: Each question has a 15-second countdown timer
- **Real-time Feedback**: Instant feedback on correct and incorrect answers
- **Progress Tracking**: Visual bullets showing progress through the quiz
- **Score Summary**: Get a performance summary at the end with ratings (Perfect/Good/Bad)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Remembers your theme and category preferences

## 🚀 Demo

The quiz application provides an engaging user experience with:
- Interactive question-answer interface
- Visual progress indicators
- Dynamic score calculation
- Category-based question sets

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

## 🛠️ Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/Moham3d-3ssam/Quiz-Application.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Quiz-Application
   ```

3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```
   - Then navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
Quiz-Application/
├── index.html          # Main HTML file
├── css/
│   └── main.css        # Stylesheet with theme support
├── js/
│   └── master.js       # Main JavaScript logic
├── json/               # Quiz questions data
│   ├── general.json
│   ├── programming.json
│   ├── football.json
│   ├── science.json
│   ├── mathematics.json
│   ├── abbreviations.json
│   ├── languages.json
│   ├── history.json
│   ├── capitals.json
│   └── sports.json
└── images/
    └── icon.png        # Application icon
```

## 🎮 How to Play

1. **Select a Category**: Choose your preferred quiz category from the dropdown menu
2. **Answer Questions**: Read each question and select one of the four answer options
3. **Submit Answer**: Click the "Submit Answer" button before time runs out
4. **View Results**: After completing all questions, see your score and performance rating
5. **Try Again**: Refresh the page to start a new quiz

## 🎨 Features in Detail

### Theme Toggle
The application supports both dark and light modes. Click the sun/moon icon to toggle between themes. Your preference is saved automatically.

### Timer System
Each question comes with a 15-second countdown timer. If time runs out:
- The correct answer is displayed
- You automatically move to the next question
- The question is marked as incorrect

### Scoring System
- **Perfect**: Answer at least (total questions - 2) correctly
- **Good**: Answer more than half but less than perfect score
- **Bad**: Answer half or fewer questions correctly

### Question Navigation
- Visual progress bullets show your position in the quiz
- Green bullets indicate correct answers
- Red bullets indicate incorrect answers
- Current question is highlighted

## 💻 Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Styling with CSS variables for theming
- **Vanilla JavaScript**: All functionality without frameworks
- **Font Awesome**: Icons for UI elements
- **Local Storage API**: Persistent user preferences
- **JSON**: Question data storage

## 🔧 Customization

### Adding New Questions
To add questions to any category, edit the corresponding JSON file in the `json/` directory:

```json
{
  "title": "Your question here?",
  "answer_1": "First option",
  "answer_2": "Second option",
  "answer_3": "Third option",
  "answer_4": "Fourth option",
  "right_answer": "Third option"
}
```

### Adding New Categories
1. Create a new JSON file in the `json/` directory
2. Add the category option in `index.html` select element
3. Add questions in the same format as existing categories

### Adjusting Timer Duration
In `master.js`, locate the `countDownTime` function and modify the `duration` variable (currently set to 15 seconds).

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**Moham3d-3ssam**
- GitHub: [@Moham3d-3ssam](https://github.com/Moham3d-3ssam)

## 🙏 Acknowledgments

- Font Awesome for the icons
- All contributors who help improve this project

---

Made with ❤️ by Moham3d-3ssam
