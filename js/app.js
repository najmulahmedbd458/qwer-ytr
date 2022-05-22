const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homebox = document.querySelector(".home-box");
homebox.querySelector(".total-question").innerHTML = quiz.length;
const quizbox = document.querySelector(".quiz-box");
const resultbox = document.querySelector(".result-box");
const writerbox = document.querySelector(".writer-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
}
function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1  = availableQuestions.indexOf(questionIndex)
    availableQuestions.splice(index1,1);
    const optionLen = currentQuestion.options.length
    for(let i = 0; i< optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = "";
    let  animationDelay = 0.15;
    for(let i = 0; i<optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        console.log(optionIndex)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");


    }

    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        const newClassCorrect = document.getElementById(id)
        newClassCorrect.classList.add("correct")
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:- "+correctAnswers)
        
    }
    else{
            const newClasswrong = document.getElementById(id)
            newClasswrong.classList.add("wrong")
            updateAnswerIndicator("wrong");
            const optionlen = optionContainer.children.length;
            for(let i=0;i<optionlen; i++){
                if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                    optionContainer.children[i].classList.add("correct")  
                }
            }
    }
    attempt++;
    unclickableoptions();
}
function unclickableoptions(){
    const optionlen = optionContainer.children.length;
    for (let i=0;i<optionlen;i++){
        optionContainer.children[i].classList.add("already-answered")
    }

}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = "";
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(marktype){
    answersIndicatorContainer.children[questionCounter-1].classList.add(marktype);
};

function next(){
    if(questionCounter === quiz.length){
        console.log("Quiz Over")
        quizOver();
    }
    else{
        
        getNewQuestion();
    }
}

function quizOver(){
    quizbox.classList.add("hide");
    resultbox.classList.remove("hide");
    quizResult();
}

function quizResult(){

    resultbox.querySelector(".total-question").innerHTML = quiz.length;
    resultbox.querySelector(".total-attempt").innerHTML = attempt;
    resultbox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultbox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    resultbox.querySelector(".Percentage").innerHTML = (correctAnswers/quiz.length) * 100 + "%";
    resultbox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
    resultbox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
};

function tryAgain(){
    resultbox.classList.add("hide");
    quizbox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function backToHome(){
    resultbox.classList.add("hide");
    homebox.classList.remove("hide");
    writerbox.classList.remove("writerboxhide");
    resetQuiz();
};

function startQuiz(){
    homebox.classList.add("hide");
    writerbox.classList.add("writerboxhide");
    quizbox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}