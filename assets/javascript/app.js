$(document).ready(function () {

    var worldCapitals = {

        questions: [
            {
                question: "what is the capital of USA?",
                possibles: ["California", "New York City", "Mara Lago", "Washington DC"],
                id: "question-one",
                answer: 3
            }, {
                question: "what is the capital of Australia?",
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

    var message = 'Game Over!';

    $(".start-game").on("click", function () {
        $('.main-container').show();
        console.log('Starting Trivia!!!');
        $(this).hide();
    });

    var seconds = 30;

    $('#time-remaining').on('click', countdown);

    function decrement() {
        seconds--;
        $('#time-remaining').html('<h2>' + "Seconds Remaining: " + seconds + '</h2>');
        if (seconds === 0) {
            stop();
            $('.message').html("Time's up!");
            checkAnswers();
        }
    };

    function countdown() {
        counter = setInterval(decrement, 1000);
    };

    function stop() {
        clearInterval(counter);
    };

    countdown();

    function formTemplate(data) {
        var questionString = " <form class='question'> " + data.question + "<br>";
        var possibles = data.possibles;
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            questionString = questionString + " <input type='radio' name= '" + data.id + "' value= " + i + " > " + possible;
        }
        return questionString + "</form>";
    }

    window.formTemplate = formTemplate;

    function buildQuestions() {
        var questionHTML = ''
        for (var i = 0; i < worldCapitals.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(worldCapitals.questions[i]);
        }
        $('#questions-container').append(questionHTML);
    };

    function isCorrect(question) {
        var answers = $('[capital= ' + question.id + ']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    };

    buildQuestions();

    function resultsTemplate(question) {
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    };

    function checkAnswers() {
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0

        for (var i = 0; i < worldCapitals.questions.length; i++) {
            if (isCorrect(worldCapitals.questions[i])) {
                correct++;
            } else {
                if (checkAnswered(worldCapitals.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }

        }

        $('.results').html('correct: ' + correct + "<br>" + 'incorrect: ' + incorrect + "<br>" + 'unanswered: ' + unAnswered);
    };

    function checkAnswered(question) {
        var anyAnswered = false;
        var answers = $('[name=' + question.id + ']');
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
        return anyAnswered;

    };

    $('.done-button').on('click', function () {
        checkAnswers();
        stop();
        $("#messageDiv").html(message);
    });


});