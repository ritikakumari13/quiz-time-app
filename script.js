// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital city of Australia?",
        answer:[
            {text: "Sydney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Canberra", correct: true},
            {text: "Perth", correct: false},
        ],
    },
    {
        question: "Which planet is known as the “Morning Star” or “Evening Star”?",
        answer:[
            {text:"Venus", correct: true},
            {text:"Mars", correct: false},
            {text:"Saturn", correct: false},
            {text:"Neptune", correct: false},
        ],
    },
    {
        question:"Who developed the theory of relativity?",
        answer:[
            {text:"Isaac Newton", correct: false},
            {text:"Galileo Galilei", correct: false},
            {text:"Nikola Tesla", correct: false},
            {text:"Albert Einstein", correct: true},
        ],
    },
    {
        question:"Which of these is used to style web pages?",
        answer:[
            {text:"HTML", correct: false},
            {text:"Python", correct: false},
            {text:"CSS", correct: true},
            {text:"Java", correct: false},
        ],
    },
    {
        question:"Which of the following is the correct order from smallest to largest data unit?",
        answer: [
            {text:"Byte, Bit, Kilobyte, Megabyte", correct: false},
            {text:"Bit, Byte, Kilobyte, Megabyte", correct: true},
            {text:"Megabyte, Kilobyte, Byte, Bit", correct: false},
            {text:"Kilobyte, Bit, Byte, Megabyte", correct: false},
        ],
    },

];

// Quiz State Vars
let currentQuestionIndex =0;
let score =0
let answerDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length )*100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent =  currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answer.forEach((answer)=>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if(answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button)=>{
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent= score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }else{
            showResults();
        }
    },1000);
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100){
        resultMessage.textContent = "Perfect Score!"
    }else if(percentage >=80){
        resultMessage.textContent= "Great job! Almost Perfect"
    }else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}