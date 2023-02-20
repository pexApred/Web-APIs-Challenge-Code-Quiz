// Variable links to id/class
var startButton = document.querySelector("#start-button");
var quizContainer = document.getElementById("quiz");
var scoreContainer = document.querySelector(".highscore-pg");

var timeLeft = document.querySelector("#timer");

var intervalId;
var score = 0;
var currentQuestionIndex = 0;

let currentTime = timeLeft.textContent;
// Array of objects: Quiz Questions
const questions = [ 
    {
        question: "Commonly used data types DO NOT include:",
        choices:  ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        choices:  ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choices:  ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables",
        choices:  ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:  ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: "console.log"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:  ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: "console.log"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:  ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: "console.log"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:  ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: "console.log"
    },
];

// Push button start: Removes start-pg, starts timer function, for loop questions, results of answers (correct or time penalty)
startButton.addEventListener("click", function() {
    var startPage = document.querySelector(".start-pg");
    startPage.style.display ="none";
    quizContainer.style.display ="block";
    showCurrentQuestion();

    intervalId = setInterval(startTimer, 1000);

    // Timer function
    function startTimer () {
        currentTime--;
        timeLeft.textContent = currentTime;

        if (currentTime === 0) {
            clearInterval(intervalId);
            endQuiz();
        } else if (currentQuestionIndex === questions.length) {
            clearInterval(intervalId);
            endQuiz();
        }
    }
});

// Write showCurrentQuestion() function
function showCurrentQuestion() {
    const questionsContainer = document.getElementsByClassName("questions")[0];
    const currentQuestion = questions[currentQuestionIndex];

    const questionElement = document.createElement("div");
    questionElement.innerHTML = currentQuestion.question;

    const currentChoices = currentQuestion.choices;
    // create for loops for questions and answers
    for (let i = 0; i < currentChoices.length; i++) {
        const choiceElement = document.createElement("button");
        choiceElement.classList.add("answer-btn");
        choiceElement.textContent = ( i + 1 ) + ". " + currentChoices[i];
        questionElement.appendChild(choiceElement);

        choiceElement.addEventListener("click", function() {
            if (currentChoices[i] === currentQuestion.correctAnswer) {
                score++;
            }   else if (currentTime >= 10) {
                    currentTime -= 10; // penalty for incorrect answer
                }   else {
                        currentTime === 0; // set to 0 if penalty would make it negative
                    }
                
            timeLeft.textContent = currentTime;

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                // display next question if there are more questions
                questionsContainer.innerHTML = "";
                showCurrentQuestion();
            } 
            // else {
            //     // display results if all questions have been answered
            //     showResults();
            // }
        });
    }
    questionsContainer.appendChild(questionElement);
};

// function resetQuiz () {
//     score = 0;
//     currentQuestionIndex = 0;
//     getResult.style.display = "none";
// }

// create endQuiz() function
function endQuiz() {
    clearInterval(intervalId);
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreContainer.innerHTML = "Game Over! You scored " + (score + currentTime) +  ".";

    // get user's initials
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;

    // store score and initials in local storage
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({initials, score});
    localStorage.setItem('highscores', JSON.stringify(highscores));

    score = 0;
    currentQuestionIndex = 0;

    initialsInput.value = "";
    // resetQuiz();

    // Add code for Input initials / Highscore page
}