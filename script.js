// List variables
var timer;
var time = 60;
var score = 0;
var questionIndex = 0;

// Set up questions in array
var questions = [
    {
        quizQuestion: "Question 1?",
        choices: ["answer1", "answer2", "answer3", "answer4"],
        answer: "answer1"
    },
    {
        quizQuestion: "Question 2?",
        choices: ["answer1", "answer2", "answer3", "answer4"],
        answer: "answer1"
    },
    {
        quizQuestion: "Question 3?",
        choices: ["answer1", "answer2", "answer3", "answer4"],
        answer: "answer1"
    },
    {
        quizQuestion: "Question 4?",
        choices: ["answer1", "answer2", "answer3", "answer4"],
        answer: "answer1"
    },
    {
        quizQuestion: "Question 5?",
        choices: ["answer1", "answer2", "answer3", "answer4"],
        answer: "answer1"
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
            <button class="answer-choice btn btn-primary mb-3">${questions[questionIndex].choices[0]}</button>
            <button class="answer-choice btn btn-primary mb-3">${questions[questionIndex].choices[1]}</button>
            <button class="answer-choice btn btn-primary mb-3">${questions[questionIndex].choices[2]}</button>
            <button class="answer-choice btn btn-primary mb-3">${questions[questionIndex].choices[3]}</button>
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
    // If answer is wrong, subtract 5 sec from timer
    else {
        time = time - 5;
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
    document.querySelector("#final-score").textContent = score;

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