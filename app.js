function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

// Quiz Prototype
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess = function (answer) {
    const question = this.getQuestion();

    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}


const q1 = new Question("what's the best programming language ?", ["C#", "javascript", "pyhton", "asp.net"], "javascript");

const q2 = new Question("what's the most popular programming language ?", ["c#", "visual basic", "nodejs", "javascript"], "javascript");

const q3 = new Question("what's the best modern programming language ?", ["C#", "javascript", "pyhton", "asp.net"], "javascript");

const q4 = new Question("what's language ?", ["C#", "javascript", "css", "asp.net"], "javascript");

const q5 = new Question("modern programming language ?", ["C#", "html", "pyhton", "pyhton"], "javascript");

const questions = [q1, q2, q3, q4, q5];


// Start Quiz

let quiz = new Quiz(questions);

loadQuestion();


function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
        return;
    }

    const question = quiz.getQuestion();
    const choices = question.choices;

    document.querySelector('#question').textContent = question.text;

    for (let i = 0; i < choices.length; i++) {
        const element = document.querySelector('#choice' + i);
        element.innerHTML = choices[i];
        guess('btn' + i, choices[i]);
    }

    showProgress();
}

function guess(id, guess) {
    const btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion()
    }
}

function showScore() {
    const html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    document.querySelector('.card-body').innerHTML = html;
}

function showProgress() {
    const totalQuestion = quiz.questions.length;
    const questionNumber = quiz.questionIndex + 1;
    const html = `Question ${questionNumber} of ${totalQuestion}`;

    if (totalQuestion === questionNumber) {
        document.querySelector('#progress').innerHTML = `Quiz is Ended  <a href="#" onClick="restartTest()">Restart Test</a>`;
        return;
    }

    document.querySelector('#progress').innerHTML = html;
}

function restartTest(){
  quiz = new Quiz(questions);
  loadQuestion();
}