//after questions work on timer,
//after timer work make a start game
//call the timer
//

$.fn.trivia = function () {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    _t.questions = [{
        question: "What was Lord Helmet doing privately in his room that he didn't want anyone to see?",
        choices: ["Playing with dolls", "Playing cars", "Playing Football", "Patriots are the best"],
        correct: 0
    }, {
        question: "John Candy plays a creature that is half-man half, what?",
        choices: ["Bear", "Cat", "Dog", "Man-Bear-Pig"],
        correct: 2

    }, {
        question: "What statement can be read on the bumper sticker located on the back of 'Spaceball 1'?",
        choices: ["Shit Happens", "We Brake for Nobody", "Pull My Hair", "Honk-Honk"],
        correct: 1

    }, {
        question: "What did the alien do after it jumped out of the guy's stomach at the bar?",
        choices: ["Rode a bike", "Played Baseball", "Killed Everyone", "Sang and Danced"],
        correct: 3

    }, {
        question: "What kind of yogurt is Yogurt?",
        choices: ["Blueberry", "Strawberry", "Plain", "Cherry"],
        correct: 2

    }

    ];
    _t.ask = function () {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#question_div").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    _t.timer = function () {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function () {
                _t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function () {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        setTimeout(function () {
            _t.cleanUp();
            _t.ask();
        }, 1000)
    };
    _t.cleanUp = function () {
        $('div[id]').each(function (item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function (correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};
var Trivia;

$("#start_button").click(function () {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function (e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        _t.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        _t.answer(true);
    }
    _t.nextQ();
});

