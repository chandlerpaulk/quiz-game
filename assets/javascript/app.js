var myQuestions = [
    {
        question: "How many infinity stones are there?",
        answers: {
            a: '3',
            b: '5',
            c: '6',
            d: '10',
        },
        correctAnswer: 'c'
    },
    {
        question: "What is the only food that cannot go bad?",
        answers: {
            a: 'Dark Chocolate',
            b: 'Peanut Butter',
            c: 'Canned Tuna',
            d: 'Honey',
        },
        correctAnswer: 'd'
    },
    {
        question: "What is the most visited tourist attraction in the world?",
        answers: {
            a: 'Eiffel Tower',
            b: 'Statue of Liberty',
            c: 'Great Wall of China',
            d: 'Roman Colosseum',
        },
        correctAnswer: 'a'
    },
    {
        question: "What's the name of Hagrid's pet spider?",
        answers: {
            a: 'Nigini',
            b: 'Crookshanks',
            c: 'Aragog',
            d: 'Mosag',
        },
        correctAnswer: 'c'
    },
    {
        question: "What's the heaviest organ in the human body?",
        answers: {
            a: 'Brain',
            b: 'Liver',
            c: 'Skin',
            d: 'Heart',
        },
        correctAnswer: 'b'
    },
    {
        question: "Which of these EU countries does not use the euro as its currency?",
        answers: {
            a: 'Poland',
            b: 'Denmark',
            c: 'Sweden',
            d: 'All of the above',
        },
        correctAnswer: 'd'
    },
    {
        question: "Which US city is the sunniest major city and sees more than 320 sunny days each year?",
        answers: {
            a: 'Phoenix',
            b: 'Miami',
            c: 'San Francisco',
            d: 'Austin',
        },
        correctAnswer: 'a'
    },
    {
        question: "What type of food holds the world record for being the most stolen around the globe?",
        answers: {
            a: 'Wagyu beef',
            b: 'Coffee',
            c: 'Bananas',
            d: 'Cheese',
        },
        correctAnswer: 'd'
    },
    {
        question: "On average, how many seed are located on the outside of a strawberry?",
        answers: {
            a: '100',
            b: '200',
            c: '400',
            d: '500',
        },
        correctAnswer: 'b'
    }
];

var quizContainer = document.getElementById('trivia');
var resultsContainer = document.getElementById('answers');
var submitButton = document.getElementById('submit');
var hidden = document.getElementById('side');
var hiddenMain = document.getElementById('main');

hidden.style.display = 'none';

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {

        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {

            answers = [];

            for (letter in questions[i].answers) {
                answers.push('<label class="container-check">' + '<input type="radio" name="question' + i + '" value="' + letter + '">' + questions[i].answers[letter] + '<span class="checkmark"></span></label>');
            }

            output.push('<div class="question"><h2>' + questions[i].question + '</h2></div>'
                + '<div class="answers">' + answers.join('') + '</div>');
        }

        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer) {

        var answerContainers = quizContainer.querySelectorAll('.answers');

        var userAnswer = '';
        var numCorrect = 0;

        var percentCorrect;

        for (var i = 0; i < questions.length; i++) {

            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            if (userAnswer === questions[i].correctAnswer) {

                numCorrect++;

                answerContainers[i].style.color = 'green';

            }

            else {

                answerContainers[i].style.color = 'red';

            }

        }

        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        percentCorrect = Math.round((numCorrect / questions.length) * 100);

        var letterGrade = document.getElementById('letter-grade');
        var percentage = document.getElementById('percentage')

     percentage.append(percentCorrect + "%");

        if (percentCorrect <= 100 && percentCorrect >= 97) {

            letterGrade.append('A+');

        } 
        
        else if (percentCorrect < 97 && percentCorrect >= 94) {

            letterGrade.append('A');

        } 
        
        else if (percentCorrect < 94 && percentCorrect >= 90) {

            letterGrade.append('A-');

        } 
        
        else if (percentCorrect < 90 && percentCorrect >= 87) {

            letterGrade.append('B+');

        } 
        
        else if (percentCorrect < 87 && percentCorrect >= 84) {

            letterGrade.append('B');

        } 
        
        else if (percentCorrect < 84 && percentCorrect >= 80) {

            letterGrade.append('B-');

        } 
        
        else if (percentCorrect < 80 && percentCorrect >= 77) {

            letterGrade.append('C+');

        } 
        
        else if (percentCorrect < 77 && percentCorrect >= 74) {

            letterGrade.append('C');

        } 
        
        else if (percentCorrect < 74 && percentCorrect >= 70) {

            letterGrade.append('C-');

        } 
        
        else if (percentCorrect < 70 && percentCorrect >= 67) {

            letterGrade.append('D+');

        } 
        
        else if (percentCorrect < 67 && percentCorrect >= 64) {

            letterGrade.append('D');

        } 
        
        else if (percentCorrect < 64 && percentCorrect >= 60) {

            letterGrade.append('D-');

        } 
        
        else {

            letterGrade.append('F');

        }

    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function () {

        stop();
        document.getElementById('submit').disabled = true;
        hidden.style.display = 'block';
        showResults(questions, quizContainer, resultsContainer);

    }

    var intervalId;
    var clockRunning = false;
    var time = (myQuestions.length) * 15;
    var timeLeft = timeConverter(time);

    var display = document.getElementById('display');
    display.append(timeLeft);

    function start() {

        clockRunning = true;
        intervalId = setInterval(count, 1000);

    }
    start();

    function stop() {

        clearInterval(intervalId);
        clockRunning = false;

    }

    function count() {

        time--;

        var currentTime = timeConverter(time);

        var update = document.getElementById('display');
        update.innerHTML = "";
        update.append(currentTime);
        if (currentTime == '00:00') {

            stop();
            document.getElementById('submit').disabled = true;
            hidden.style.display = 'block';
            showResults(questions, quizContainer, resultsContainer);

        }

    }

    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {

            seconds = '0' + seconds;

        }

        if (minutes === 0) {

            minutes = '00';

        }

        else if (minutes < 10) {

            minutes = '0' + minutes;

        }

        return minutes + ":" + seconds;
    }

}