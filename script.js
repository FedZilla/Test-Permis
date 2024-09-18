let history = [];
let totalQuestions = 101;
let currentQuestion = null;
let correctAnswers = 0;
let wrongAnswers = 0;

loadProgress();

function getQuestion() {
    if (history.length >= totalQuestions) {
        showRecap();
        return;
    }

    let randomQuestion;
    do {
        randomQuestion = Math.floor(Math.random() * totalQuestions);
    } while (history.includes(randomQuestion));

    currentQuestion = randomQuestion;
    document.getElementById('currentQuestion').innerText = `Question numéro : ${randomQuestion}`;
    document.getElementById('responseSection').style.display = "block";
    saveProgress();
}

function bonneReponse() {
    history.push(currentQuestion);
    document.getElementById('history').innerHTML += `<span class="green">${currentQuestion}</span>, `;
    correctAnswers++;
    saveProgress();

    if (history.length < totalQuestions) {
        getQuestion();
    } else {
        showRecap();
    }
}

function mauvaiseReponse() {
    history.push(currentQuestion);
    document.getElementById('history').innerHTML += `<span class="red">${currentQuestion}</span>, `;
    wrongAnswers++;
    saveProgress();

    if (history.length < totalQuestions) {
        getQuestion();
    } else {
        showRecap();
    }
}

function showRecap() {
    document.getElementById('responseSection').style.display = "none";
    document.getElementById('currentQuestion').style.display = "none";
    document.getElementById('recapSection').style.display = "block";
    document.getElementById('recap').innerText = `Récapitulatif : 
        ${correctAnswers} bonnes réponses, 
        ${wrongAnswers} mauvaises réponses.`;

    saveProgress();
}

function restartQuiz() {
    clearProgress();

    history = [];
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestion = null;

    document.getElementById('history').innerHTML = "";
    document.getElementById('currentQuestion').innerText = "";
    document.getElementById('responseSection').style.display = "none";
    document.getElementById('recapSection').style.display = "none";
    document.getElementById('askQuestion').style.display = "block";
}

function saveProgress() {
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('correctAnswers', correctAnswers);
    localStorage.setItem('wrongAnswers', wrongAnswers);
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('quizFinished', history.length >= totalQuestions);
}

function loadProgress() {
    const savedHistory = localStorage.getItem('history');
    const savedCorrectAnswers = localStorage.getItem('correctAnswers');
    const savedWrongAnswers = localStorage.getItem('wrongAnswers');
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    const quizFinished = JSON.parse(localStorage.getItem('quizFinished'));

    if (savedHistory) {
        history = JSON.parse(savedHistory);
        correctAnswers = parseInt(savedCorrectAnswers) || 0;
        wrongAnswers = parseInt(savedWrongAnswers) || 0;
        currentQuestion = parseInt(savedCurrentQuestion) || null;

        let historyHTML = '';
        history.forEach(question => {
            if (history.indexOf(question) < correctAnswers) {
                historyHTML += `<span class="green">${question}</span>, `;
            } else {
                historyHTML += `<span class="red">${question}</span>, `;
            }
        });
        document.getElementById('history').innerHTML = historyHTML;

        if (quizFinished) {
            showRecap();
        } else if (currentQuestion !== null) {
            document.getElementById('currentQuestion').innerText = `Question numéro : ${currentQuestion}`;
            document.getElementById('responseSection').style.display = "block";
        }
    }
}

function clearProgress() {
    localStorage.removeItem('history');
    localStorage.removeItem('correctAnswers');
    localStorage.removeItem('wrongAnswers');
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('quizFinished');
}