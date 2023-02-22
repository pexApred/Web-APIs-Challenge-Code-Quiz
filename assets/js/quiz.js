// Variable links to id/class
var startButton = document.querySelector("#start-button");
var quizContainer = document.getElementById("quiz");
var scoreContainer = document.querySelector(".highscore-pg");
var startPage = document.querySelector(".start-pg");
var timer = document.querySelector(".time");

var timeLeft = document.querySelector("#timer");

var intervalId;
var score = 0;
var currentQuestionIndex = 0;

let currentTime = timeLeft.textContent;

// Array of objects: Quiz Questions
const questions = [ 
    {
        question: "JavaScript is an ________ language?",
        choices:  ['Object-Oriented', 'Object-Based', 'Procedural', 'None of the above'],
        correctAnswer: "Object-Oriented"
    },
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
        question: "In JavaScript, which are three keywords used to declare variables?",
        choices:  ['var, let, This', 'let, array, const', 'var, const, let', 'let, const, This'],
        correctAnswer: "var, const, let"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:  ['console.log', 'JavaScript', 'terminal/bash', 'for loops'],
        correctAnswer: "console.log"
    },
    {
        question: "JavaScript provides several ways to iterate over data structures. Which of the following is NOT a way?",
        choices:  ['For Loop', 'Do Not Loop', 'While Loop', 'For...Of or In Loop'],
        correctAnswer: "Do Not Loop"
    },
];

// Event listener for view-hs
const viewHs = document.getElementById("view-hs");
viewHs.addEventListener('click', viewHighScores);

// Push button start: Removes start-pg, starts timer function, for loop questions, results of answers (correct or time penalty)
startButton.addEventListener("click", function() {
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
    const resultEl = document.createElement("div");
    questionsContainer.appendChild(resultEl);
    // create for loops for questions and answers
    for (let i = 0; i < currentChoices.length; i++) {
        const choiceElement = document.createElement("button");
        choiceElement.classList.add("answer-btn");
        choiceElement.textContent = ( i + 1 ) + ". " + currentChoices[i];
        questionElement.appendChild(choiceElement);

        choiceElement.addEventListener("click", function() {
            const resultText = document.createElement("p");
            if (currentChoices[i] === currentQuestion.correctAnswer) {
                score++;
                resultText.textContent = "Correct!";
            } else if (currentTime >= 10) {
                currentTime -= 10; // penalty for incorrect answer
                resultText.textContent = "Wrong!";
            } else {
                currentTime = 0; // set to 0 if penalty would make it negative
                }
            console.log(resultText);
            console.log(resultEl);
            resultEl.appendChild(resultText);
                
            timeLeft.textContent = currentTime;

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                // display next question if there are more questions
                questionsContainer.innerHTML = "";
                showCurrentQuestion();
            } 
        });
    }
    questionsContainer.appendChild(questionElement);
};

// create endQuiz() function
function endQuiz() {
    clearInterval(intervalId);
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    
    // Final score displaying correctly
    const finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = score + currentTime;

    // get user's initials and push to local storage
    const submitBtn = document.querySelector("#submit-score");
    submitBtn.addEventListener("click", function() {
        const initialsInput = document.getElementById("initials");
        const initials = initialsInput.value;

        // store score and initials in local storage
        highScores.push({initials, score: score + currentTime});
        localStorage.setItem('High Scores', JSON.stringify(highScores));
    
        score = 0;
        currentQuestionIndex = 0;

        initialsInput.value = "";
        viewHighScores();
    });
}

let highScores = [];
if (localStorage.getItem ('High Scores')) {
    highScores = JSON.parse(localStorage.getItem('High Scores'));
};

function viewHighScores() {
    startPage.style.display ="none";
    timer.style.display = "none";
    scoreContainer.style.display = "none";
    quizContainer.style.display = "none";

    const hsList = document.getElementById('hs-list');
    hsList.innerHTML = "";
    
    const backButton = document.createElement('button');
    backButton.classList.add("back-btn");
    backButton.textContent = "Back to Start";
    hsList.appendChild(backButton);

    backButton.addEventListener("click", function() {
        resetQuiz();
    });

    const highScores = JSON.parse(localStorage.getItem('High Scores')) || [];

    highScores.sort((a,b) => b.score - a.score);
    highScores.forEach(function(score) {
        const li = document.createElement("li");
        li.textContent = score.initials + "  -  " + score.score;
        hsList.appendChild(li);
    });
}

function resetQuiz() {
    location.reload();
}