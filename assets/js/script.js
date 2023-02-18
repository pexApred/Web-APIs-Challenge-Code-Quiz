// Start Button Function correctly filler
var startButton = document.querySelector("#start-button");
var quizContainer = document.getElementById("quiz");
const Questions = [ 
{
    question: "Commonly used data types DO NOT include:",
    choices:  ["strings, booleans, alerts, numbers"],
    correctAnswer: "alerts"
},
{
    question: "Commonly used data types DO NOT include:",
    choices:  ["strings, booleans, alerts, numbers"],
    correctAnswer: "alerts"
},
{
    question: "Commonly used data types DO NOT include:",
    choices:  ["strings, booleans, alerts, numbers"],
    correctAnswer: "alerts"
},
{
    question: "Commonly used data types DO NOT include:",
    choices:  ["strings, booleans, alerts, numbers"],
    correctAnswer: "alerts"
},
{
    question: "Commonly used data types DO NOT include:",
    choices:  ["strings, booleans, alerts, numbers"],
    correctAnswer: "alerts"
},
];

startButton.addEventListener("click", function() {
    var newPage = document.querySelector(".start-pg");
    if (newPage.style.display === "none") {
        newPage.style.display = "block";
    
    } else {
        newPage.style.display = "none";
    };

    // var questions = document.querySelector(".questions");
    // if (questions.style.display === "block") {
    //     questions.style.display = "none";
    
    // } else {
    //     questions.style.display = "block";
    // }

});

