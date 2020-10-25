// List variables
var timer;
var time = 75;
var score = 0;
var questionIndex = 0;

// Set up questions in array
var questions = [
    {
        quizQuestion: "JavaScript is designed for following purpose:",
        choices: [
            "To style HTML pages", 
            "To execute queries related to databases on a server", 
            "To add interactivity to HTML pages", 
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        quizQuestion: "Which of the following is not Javascript data type?",
        choices: [
            "Undefined", 
            "Number", 
            "Boolean", 
            "Float"
        ],
        answer: "Float"
    },
    {
        quizQuestion: "What are the types of pop up boxes available in Javascript?",
        choices: [
            "Alert",
            "Prompt",
            "Confirm",
            "All of the above"],
        answer: "All of the above"
    },
    {
        quizQuestion: "What are variables used for in Javascript programs?",
        choices: [
            "Storing numbers, dates, or other values", 
            "Varying randomly", 
            "Causing high-school algebra flashbacks", 
            "All of the above"
        ],
        answer: "Storing numbers, dates, or other values"
    },
    {
        quizQuestion: "The statement a===b refers to",
        choices: [
            "Both a and b are equal in value, type and reference address", 
            "Both a and b are equal in value", 
            "Both a and b are equal in value and type", 
            "There is no such statement"
        ],
        answer: "Both a and b are equal in value and type"
    }
];

// Start the quiz using a function
function startQuiz() {
    // Hide start message
    document.querySelector("#start-screen").classList.add("hide");

    // Show the questions
    document.querySelector("#questions").classList.remove("hide");

    // Start the timer
    timer = setInterval(function() {
        // Decrease time by 1 second
        time--;

        // Time countdown
        document.querySelector("#time").textContent =  time;

        // If time = 0
        if (time <= 0) {
            endQuiz();
            alert ("Your time is up!");
        }
    }, 1000);

    // Display the quiz question
    displayQuestion();

};

// Question markup using a function
function displayQuestion() {
    // Create the question string
    var questionMarkUp =
    `
        <h2 id="question-title">${questions[questionIndex].quizQuestion}</h2>
        <div id="choices" class="choices">
            <button class="answer-choice btn btn-outline-primary mt-3">${questions[questionIndex].choices[0]}</button>
            <button class="answer-choice btn btn-outline-primary mt-3">${questions[questionIndex].choices[1]}</button>
            <button class="answer-choice btn btn-outline-primary mt-3">${questions[questionIndex].choices[2]}</button>
            <button class="answer-choice btn btn-outline-primary mt-3">${questions[questionIndex].choices[3]}</button>
        </div>
    `;

    // Inject question string markup as HTML
    document.querySelector("#questions").innerHTML = questionMarkUp;
};

// Process the answers
function processAnswer(event) {
    // If the answer is correct...
    if (event.target.textContent === questions[questionIndex].answer) {
        // ... then add score
        score++;
    } 
    // If answer is wrong, subtract 10 sec from timer
    else {
        time = time - 10;
    }

    // Move to the next question after previous question has been answered
    questionIndex ++;

    // After you answer the last question, end the quiz
    if (questionIndex === questions.length) {
        endQuiz();
    }

    // Show the next question
    displayQuestion();
};

// End the quiz
function endQuiz() {
    // Display the score
    document.querySelector("#final-score").textContent = score + "/5";

    // End the timer
    clearInterval(timer);

    // Show end screen
    document.querySelector("#end-screen").classList.remove("hide");

    // Hide the questions
    document.querySelector("#questions").classList.add("hide");
};

// Start on click addEventListener
document.querySelector("#start").addEventListener("click", startQuiz);

// Answer on click addeventListener
document.querySelector("#questions").addEventListener("click",function(event) {
    // Filter for answer choice click
    if (event.target.className.indexOf("answer-choice") > -1) {
        processAnswer(event);
    }
});