$(document).ready(function () {

    var worldCapitals = {

        questions: [
            {
                question: "What is the capital of USA?",
                possibles: ["California", "New York City", "Mara Lago", "Washington DC"],
                id: "question-one",
                answer: 3
            }, {
                question: "What is the capital of Australia?",
                possibles: ["Adellaide", "New South Wales", "Canberra", "Tasmanian Tiger"],
                id: "question-two",
                answer: 2
            }, {
                question: "What is the capital of Germany?",
                possibles: ["Berlin", "Bonn", "Frankfurt", "Munich"],
                id: "question-three",
                answer: 0
            }, {
                question: "What is the capital of South Africa?",
                possibles: ["Johannerburg", "Pretoria", "Cape Town", "Africanese"],
                id: "question-four",
                answer: 1
            }, {
                question: "What is the capital of Burundi?",
                possibles: ["Congo", "Bujumbura", "Gitega", "Kabezi"],
                id: "question-five",
                answer: 1
            }, {
                question: "What is the capital of Afghanistan?",
                possibles: ["Jalalabad", "Mazar", "Kabul", "Herat"],
                id: "question-six",
                answer: 2
            }, {
                question: "What is the capital of South Korea?",
                possibles: ["North Korea", "Pyongyang", "Beijing", "Seoul"],
                id: "question-seven",
                answer: 3
            }, {
                question: "What is the capital of Brazil?",
                possibles: ["Rio de Janeiro", "Brasilia", "Salvador", "Recife"],
                id: "question-eight",
                answer: 1
            },]
    };

    var seconds = 30;
    var capitalQs = worldCapitals.questions;
    var counter = 0;
    var gameOverMessage = "Game Over!";
    var timeUpMessage = "Time's Up!";

    $(".start-game").on("click", function () {
        $('.main-container').show();
        console.log('Starting Trivia!!!');
        $(this).hide();
        countdown();
    });

    function decrement() {
        seconds--;
        var timeRemaining = ('<h2>');
        $('#time-remaining').html(timeRemaining + "Seconds Remaining: " + seconds);
        if (seconds === 0) {
            stop();
            $('.message').html(timeUpMessage);
            result();
        }
    };

    function countdown() {
        counter = setInterval(decrement, 1000);
    };

    function stop() {
        clearInterval(counter);
    };


    function formTemplate(data) {
        var questionString = " <form class='question'> " + data.question + "<br>";
        var possibles = data.possibles;
        for (var i = 0; i < possibles.length; i++) {
            var possibleAnswers = possibles[i];
            // console.log(possibleAnswers);
            questionString = questionString + " <input type='radio' name= '" + data.id + "' value= " + i + " > " + possibleAnswers;
        }
        return questionString + "</form>";
    }

    function buildQuestions() {
        var questionHTML = ''
        for (var i = 0; i < capitalQs.length; i++) {
            questionHTML = questionHTML + formTemplate(capitalQs[i]);
        }
        $('#questions-container').append(questionHTML);
    };

    buildQuestions();

    function isCorrect(data) {
        var answers = $("input[name=" + data.id + "]");
        console.log(answers);

        var correct = answers.eq(data.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    };

    function checkAnswered(data) {
        var anyAnswered = false;
        var answers = $("input[name=" + data.id + "]");
        // $("#question-one")
        // console.log(answers);

        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
        return anyAnswered;

    };

    function result() {
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0

        for (var i = 0; i < capitalQs.length; i++) {
            if (isCorrect(capitalQs[i])) {
                correct++;
            } else if (checkAnswered(capitalQs[i])) {
                incorrect++;
            } else {
                unAnswered++;
            }
        }

        $('.results').html('Correct: ' + correct + "<br>" + 'Incorrect: ' + incorrect + "<br>" + 'Unanswered: ' + unAnswered);
    };

    $('.done-button').on('click', function () {
        result();
        stop();
        $("#messageDiv").html(gameOverMessage);
    });


});