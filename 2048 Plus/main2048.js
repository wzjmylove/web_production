//页面主要dom元素加载完成时
$(function() {
    var board = new Array();
    var score = 0;
    var hasConflicted = new Array();

    //触摸变量
    var startx = 0,
        starty = 0,
        endx = 0,
        endy = 0;

    // 阻止选择页面文字
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    }, false)
    $('#button_newgame').click(function() {
        newgame();
    });

    preparForMobile();
    newgame();

    function newgame() {
        //初始化
        init();
        //随机生成两个函数
        generateRandNumber();
        generateRandNumber();
    }

    //初始化
    function init() {
        //初始化棋盘格位置
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var gridCell = $('#grid_cell_' + i + '_' + j);
                gridCell.css({
                    top: getcellTop(i, j),
                    left: getcellLeft(i, j)
                })
            }
        }

        //初始化棋盘格内数字
        for (var i = 0; i < 4; i++) {
            //创建一个二维数组来存放数字
            board[i] = new Array();
            hasConflicted[i] = new Array();
            for (var j = 0; j < 4; j++) {
                board[i][j] = 0;
                //初始化碰撞，值为false，表明没有碰撞
                hasConflicted[i][j] = false;
            }
        }
        updateNumber();
        score = 0;
    }

    //更新棋盘格内的数字内容
    function updateNumber() {
        //如果页面存在数字，将其删除，再重新追加新的，以达到更新的目的
        $('.number_cell').remove();

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $('.grid_container').append('<div class = "number_cell" id = "number_cell_' + i + '_' + j + '"></div>');
                var theNumberCell = theNumberCell = $('#number_cell_' + i + '_' + j);
                //数字为0时不显示
                if (board[i][j] == 0) {
                    theNumberCell.css({
                        //设置宽高，宽高为0则是不显示
                        width: 0,
                        height: 0,
                        //设置位置, +50(cellSideLength / 2)是为了放在grid_cell的中间
                        top: getcellTop(i, j) + cellSideLength / 2,
                        left: getcellLeft(i, j) + cellSideLength / 2
                    })
                } else {
                    theNumberCell.css({
                        width: cellSideLength,
                        height: cellSideLength,
                        //number_cell会将grid_cell覆盖
                        top: getcellTop(i, j),
                        left: getcellLeft(i, j),
                        //更改数字的颜色和背景颜色
                        backgroundColor: getNumberbgc(board[i][j]),
                        color: getNumberColor(board[i][j])
                    });
                    theNumberCell.text(board[i][j]);
                }
                //新的一轮开始，碰撞归位
                hasConflicted[i][j] = false;
            }
        }
        $('.number_cell').css({
            'line-height': cellSideLength + 'px',
            'font-size': 0.45 * cellSideLength + 'px' //改成0.45左右可以保证四位数字时不超框
        });
    }

    //随机生成数字
    function generateRandNumber() {
        //判断是否由空位生成随机数
        if (nospace(board))
        //如果nospace为真，即没有空间生成随机数，则返回false
            return false;

        //生成随机数：1.随机一个位置  2.随机一个数字  3.显示数字

        //1.随机位置
        var randx = Math.floor(Math.random() * 4);
        var randy = Math.floor(Math.random() * 4);
        //判断该位置是否为空
        var times = 0;
        while (times < 100) { //只让计算机随机100次生成随机位置，太多了会导致运行变慢；因此人工设置在100次的时候随机位置固定
            if (board[randx][randy] == 0) {
                break;
            } else {
                randx = Math.floor(Math.random() * 4);
                randy = Math.floor(Math.random() * 4);
                times++;
            }
        }
        //人工找空位
        if (times == 100) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] == 0) {
                        randx = i;
                        randy = j;
                    }
                }
            }
        }

        //2.随机一个数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //3.显示数字
        board[randx][randy] = randNumber;
        AnimationForRandNumber(randx, randy, randNumber);
        return true;
    }

    //监听键盘按键
    $(document).keydown(function(e) {

        switch (e.keyCode) {
            case 37: //left
                e.preventDefault(); //阻止按键使滚动条移动
                if (moveLeft()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
                break;
            case 38: //up
                e.preventDefault(); //阻止按键使滚动条移动
                if (moveUp()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
                break;
            case 39: //right
                e.preventDefault(); //阻止按键使滚动条移动
                if (moveRight()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
                break;
            case 40: //down
                e.preventDefault(); //阻止按键使滚动条移动
                if (moveDown()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
                break;
            default:
                break;
        }
    });

    //左移
    function moveLeft() {
        //判断是否可以移动
        if (canMoveLeft(board) == false)
            return false;

        //左移
        //数字落脚点判断：落脚点是否为空，落脚点数字是否和带判定元素值相等，移动路径中是否有障碍物
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    //(i,j)是待判定元素，(i,k)是落脚点元素
                    //判断(i,j)的左侧（即(i,k)，k<j）是否为一个落脚点
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                            AnimationForMove(i, j, i, k);
                            //移动
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && hasConflicted[i][k] == false) {
                            AnimationForMove(i, j, i, k);
                            //移动并叠加
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //分数增加
                            score += board[i][k];
                            updateScore(score);
                            //叠加后，让（i，k）位置的碰撞为true，表明这个位置不能再叠加了
                            hasConflicted[i][k] == true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(function() {
            updateNumber();
        }, 220)
        return true;
    }

    //右移
    function moveRight() {
        //判断是否可以移动
        if (canMoveRight(board) == false)
            return false;

        //右移
        //数字落脚点判断：落脚点是否为空，落脚点数字是否和带判定元素值相等，移动路径中是否有障碍物
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] != 0) {
                    //(i,j)是待判定元素，(i,k)是落脚点元素
                    //判断(i,j)的右侧（即(i,k)，k>j）是否为一个落脚点
                    for (var k = 3; k > j; k--) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                            AnimationForMove(i, j, i, k);
                            //移动
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && hasConflicted[i][k] == false) {
                            AnimationForMove(i, j, i, k);
                            //移动并叠加
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //分数增加
                            score += board[i][k];
                            updateScore(score);
                            hasConflicted[i][k] == true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(function() {
            updateNumber();
        }, 220)
        return true;
    }

    //上移
    function moveUp() {
        if (canMoveUp(board) == false)
            return false;

        //上移
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 4; i++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < i; k++) {
                        if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                            AnimationForMove(i, j, k, j);
                            //move
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && hasConflicted[k][j] == false) {
                            AnimationForMove(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //分数增加
                            score += board[k][j];
                            updateScore(score);
                            hasConflicted[k][j] == true;
                            continue;
                        }
                    }
                }
            }
        }

        setTimeout(function() {
            updateNumber();
        }, 220)
        return true;
    }

    //下移
    function moveDown() {
        if (canMoveDown(board) == false)
            return false

        //下移
        for (var j = 0; j < 4; j++) {
            for (var i = 2; i >= 0; i--) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > i; k--) {
                        if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                            AnimationForMove(i, j, k, j);
                            //move
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && hasConflicted[k][j] == false) {
                            AnimationForMove(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //分数增加
                            score += board[k][j];
                            updateScore(score);
                            hasConflicted[k][j] == true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(function() {
            updateNumber();
        }, 220)
        return true;
    }

    //更新得分
    function updateScore(score) {
        $('#span_score').text(score);
    }

    //游戏是否结束
    function isgameover() {
        if (nospace(board) && nomove(board))
            gameover();
    }

    //结束时的动作
    function gameover() {
        alert('Game  Over')
    }

    //移动端的准备工作
    function preparForMobile() {
        //如果屏幕宽度大于500，则不需要自适应，不然棋盘格太大
        if (documentWidth > 500) {
            gridContainerWidth = 500;
            cellSpace = 20;
            cellSideLength = 100;
        }
        //大棋盘格的适应
        $('.grid_container').css({
            width: gridContainerWidth - 2 * cellSpace,
            height: gridContainerWidth - 2 * cellSpace,
            padding: cellSpace,
            borderRadius: 0.02 * gridContainerWidth
        })

        //小棋盘格的适应
        $('.grid_cell').css({
            width: cellSideLength,
            height: cellSideLength,
            borderRadius: 0.02 * cellSideLength
        })
    }

    //触摸监听
    document.addEventListener('touchstart', function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(e) {
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;

        var deltax = endx - startx;
        var deltay = endy - starty;
        //如果触摸滑动距离过小，则不让其移动
        if (Math.abs(deltax) < 0.2 * documentWidth && Math.abs(deltay) < 0.2 * documentWidth) {
            return;
        }

        //x轴移动
        if (Math.abs(deltax) >= Math.abs(deltay)) {
            if (deltax > 0) {
                if (moveRight()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
            } else {
                if (moveLeft()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
            }
        } else { //y轴移动
            if (deltay > 0) {
                if (moveDown()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }

            } else {
                if (moveUp()) {
                    setTimeout(function() {
                        generateRandNumber();
                    }, 210)
                    setTimeout(function() {
                        isgameover();
                    }, 300)
                }
            }
        }
    }, false);
})