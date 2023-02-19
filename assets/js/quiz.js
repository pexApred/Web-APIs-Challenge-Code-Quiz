// Variable links to id/class
var startButton = document.querySelector("#start-button");
var quizContainer = document.getElementById("quiz");
var getResult = document.querySelector(".check-answers")

var score = 0;
var currentQuestionIndex = 0;
// Array of objects: Quiz Questions
const questions = [ 
{
    question: "Commonly used data types DO NOT include:",
    choices:  ["strings, booleans, alerts, numbers"],
    correctAnswer: "alerts"
},
{
    question: "The condition in an if / else statement is enclosed with ________.",
    choices:  ["quotes, curly brackets, parenthesis, square brackets"],
    correctAnswer: "parenthesis"
},
{
    question: "Arrays in JavaScript can be used to store ________.",
    choices:  ["numbers and strings, other arrays, booleans, all of the above"],
    correctAnswer: "all of the above"
},
{
    question: "String values must be enclosed within ________ when being assigned to variables",
    choices:  ["commas, curly brackets, quotes,parenthesis"],
    correctAnswer: "quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices:  ["JavaScript, terminal/bash, for loops, console.log"],
    correctAnswer: "console.log"
},
];

// Push button start: Removes start-pg, starts timer function, for loop questions, results of answers (correct or time penalty)
startButton.addEventListener("click", function() {
    var startPage = document.querySelector(".start-pg");
    startPage.style.display ="none";
    quizContainer.style.display ="block";
});

// Timer function

// Input initials / Highscore page
