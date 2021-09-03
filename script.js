let moves = localStorage.getItem('tic_tac_toe_moves');
let counter = 0;

$(function() {
    const game_board = $('.game_board');
    const board_buttons = game_board.find('a');
    if (moves === null) {
        moves = {};
    }
    else {
        moves = JSON.parse(moves);
        for (const [key, value] of Object.entries(moves)) {
            board_buttons.eq(Number(key) - 1).text(value);
        }
        counter = Object.values(moves).length;
    }


    board_buttons.on('click', function(event) {
        event.preventDefault();
        if ($(this).text() === '') {
            const symbol = (counter++ % 2 == 0) ? 'x' : 'o';

            $(this).text(symbol);
            const id = $(this).data('id');

            moves[id] = symbol;
            localStorage.setItem('tic_tac_toe_moves', JSON.stringify(moves));
            if(checkWinner(symbol)) {
                $(".message").text("winer is " + symbol);
                setTimeout(function () {
                    reset();
                }, 3000);
               
            }
        }
    });

    $('.btn').on('click', function (event) {
        event.preventDefault();
        reset();
    });

    function reset() {
        localStorage.clear();
        board_buttons.text('');
        moves = {};
        counter = 0;
        $(".message").text('');
    }
});




function checkWinner(symbol) {
    let win_combinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [1, 5, 9],
        [3, 5, 7],
    ];

    for (let combination of win_combinations) {
        if (
            (combination[0] in moves) &&
            (combination[1] in moves) &&
            (combination[2] in moves) &&
            moves[combination[0]] == symbol &&
            moves[combination[1]] == symbol &&
            moves[combination[2]] == symbol
        ) {
            return true;
        }
    };

    return false;
}