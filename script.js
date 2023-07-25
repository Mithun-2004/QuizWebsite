const questions = [
    {
        question : "Which is the biggest continent in the world?",
        answers : [
            {text : "North America", correct : false},
            {text : "Asia", correct : true},
            {text : "Africa", correct : false},
            {text : "Australia", correct : false}
        ]
    },
    {
        question : "Which is the longest river in the world?",
        answers : [
            {text : "Great Ganga", correct : false},
            {text : "Amazon", correct : false},
            {text : "Nile", correct : true},
            {text : "Niger", correct : false}
        ]
    },
    {
        question : "Which is the largest ocean in the world?",
        answers : [
            {text : "Pacific Ocean", correct : true},
            {text : "Indian Ocean", correct : false},
            {text : "Arctic Ocean", correct : false},
            {text : "Atlantic Ocean", correct : false}
        ]
    },
    {
        question : "Which is India's first super computer?",
        answers : [
            {text : "Param8000", correct : true},
            {text : "Param80000", correct : false},
            {text : "Param800", correct : false},
            {text : "Param8", correct : false}
        ]
    },
    {
        question : "Which bank is called bankers bank of India?",
        answers : [
            {text : "Punjab National Bank", correct : "false"},
            {text : "State Bank of India", correct : "false"},
            {text : "ICICI Bank", correct : "false"},
            {text : "Reserve Bank of India", correct : "true"}
        ]
    }
]

const questionElement = document.querySelector('#questionBox');
const answerButtons = document.querySelectorAll('.option');
const nextButton = document.querySelector('#nextBtn');
const playAgainButton = document.querySelector('#playAgainBtn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    for (var i=0; i<4; i++){
        answerButtons[i].innerText = currentQuestion.answers[i].text;
        answerButtons[i].dataset.correct = currentQuestion.answers[i].correct;
        answerButtons[i].addEventListener('click', selectAnswer);
    }
}

function resetState(){
    nextButton.classList.add('hide');
    for (var i=0; i<4; i++){
        answerButtons[i].classList.remove('correct');
        answerButtons[i].classList.remove('wrong');
        answerButtons[i].disabled = false;
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score += 1;
    }else{
        selectedBtn.classList.add("wrong");
    }
    for (var i=0; i<4; i++){
        if (answerButtons[i].dataset.correct === "true"){
            answerButtons[i].classList.add('correct');
        }
        answerButtons[i].disabled = true;
    }
    nextButton.classList.remove('hide');
}

function showScore(){
    resetState();
    document.querySelector('.main').classList.add('hide');
    document.querySelector('.result p').innerText = `You have scored ${score} out of ${questions.length}`;
    document.querySelector('.result').classList.remove('hide');
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', function(){
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

playAgainButton.addEventListener('click', function(){
    resetState();
    document.querySelector('.main').classList.remove('hide');
    document.querySelector('.result').classList.add('hide');
    startQuiz();
})

startQuiz();