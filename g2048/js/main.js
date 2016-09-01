var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

(function () {
    newGame();
})();

function newGame() {
    prepareForMobile();
    // 初始化
    init();
    // 在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function prepareForMobile() {

    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSideWidth = 100;
        cellSpace = 20;
    }

    $('#grid-container').css({
        'width': gridContainerWidth - 2*cellSpace,
        'height': gridContainerWidth - 2*cellSpace,
        'padding': cellSpace,
        'border-radius': gridContainerWidth*0.02
    });

    $('.grid-cell').css({
        'width': cellSideWidth,
        'height': cellSideWidth,
        'border-radius': cellSideWidth*0.02
    });

}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-'+i+j);
            gridCell.css({ top: getPosTop(i, j)+'px' });
            gridCell.css({ left: getPosLeft(i, j)+'px' });
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
}

function updateBoardView() {
    console.log('updateBoardView');
    $('.number-cell').remove();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+j+'"></div>');
            var $theNumberCell = $('#number-cell-'+i+j);

            if (board[i][j] == 0){
                $theNumberCell.css({
                    'width': 0,
                    'height': 0,
                    'top': getPosTop(i, j) + (cellSideWidth/2) + 'px',
                    'left': getPosLeft(i, j) + (cellSideWidth/2) + 'px'
                });
            }else {
                console.log('updateBoardView',cellSideWidth);
                $theNumberCell.css({
                    'width': cellSideWidth+'px',
                    'height': cellSideWidth+'px',
                    'top': getPosTop(i, j) + 'px',
                    'left': getPosLeft(i, j) + 'px',
                    'background-color': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j])
                });
                $theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }

    $('.number-cell').css({
        'line-height': cellSideWidth+'px',
        'font-size': 0.8*cellSideWidth+'px'
    });

}

function generateOneNumber() {
    if ( noSpace(board) ){
        return false;
    }

    var randx = parseInt( Math.floor(Math.random()*4) ),
        randy = parseInt( Math.floor(Math.random()*4) );
    var times = 0;

    while ( times < 50 ) {
        if ( board[randx][randy] == 0) {
            break;
        }
        randx = parseInt( Math.floor(Math.random()*4) ),
        randy = parseInt( Math.floor(Math.random()*4) );
        times ++;
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var randNum = Math.random() < 0.5 ? 2 : 4;

    board[randx][randy] = randNum;

    showNumber(randx, randy, randNum);

    return true;
}

function moveLeft() {
    if (!canMoveLeft (board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if ( board[i][j] != 0 ){
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j] ;
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        // score
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 200);
    return true;
}

function moveRight() {
    if (!canMoveRight()){
        return false;
    }

    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 200);
    return true;

}

function moveUp() {
    if (!canMoveUp()){
        return false;
    }

    for( var j = 0 ; j < 4 ; j ++ ){
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 200);
    return true;
}

function moveDown() {
    if (!canMoveDown()){
        return false;
    }

    for( var j = 0 ; j < 4 ; j ++ ){
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 200);
    return true;
}


function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert('Game Over');
}

function noMove() {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board)) {
        return false;
    }
    return true;
}


$(document.body).keydown(function (event) {
    console.log(event.keyCode);

    switch(event.keyCode) {
        case 37: // left
            event.preventDefault();
            if (moveLeft()) {
                console.log('move left');
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
            break;
        case 38: // up
            event.preventDefault();
            if (moveUp()) {
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
            break;
        case 39: // right
            event.preventDefault();
            if (moveRight()) {
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
            break;
        case 40: // down
            event.preventDefault();
            if (moveDown()) {
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
            break;
        default:
            break;
    }
});

document.addEventListener('touchstart', function (e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
});
// 
// document.addEventListener('touchmove', function (e) {
//     e.preventDefault();
// });

document.addEventListener('touchend', function (e) {
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;


    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth) {
        return;
    }

    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            // move right
            if (moveRight()) {
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
        }else {
            // move left
            if (moveLeft()) {
                console.log('move left');
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
        }
    }else {
        if (deltay > 0) {
            // move down
            if (moveDown()) {
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
        }else {
            // move up
            if (moveUp()) {
                setTimeout(function () {
                    generateOneNumber();
                    isGameOver();
                });
            }
        }
    }
});
