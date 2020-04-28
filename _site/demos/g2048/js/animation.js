console.log('animation.js');

function showNumber(x, y, num) {
    var $numberCell = $('#number-cell-'+x+y);
    $numberCell.css({
        'background-color': getNumberBackgroundColor(num),
        'color': getNumberColor(num)
    });

    $numberCell.text(num);

    $numberCell.animate({
        width: cellSideWidth,
        height: cellSideWidth,
        top: getPosTop(x, y) + 'px',
        left: getPosLeft(x, y) + 'px'
    }, 50);

}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var $numberCell = $('number-cell-'+fromx+fromy);
    $numberCell.animate({
        top: getPosTop(tox, toy) + 'px',
        left: getPosLeft(tox, toy) + 'px'
    }, 200);
}

function updateScore(score) {
    $('#score').text(score);
}
