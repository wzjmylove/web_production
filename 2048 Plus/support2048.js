var documentWidth = window.screen.availWidth,
    gridContainerWidth = 0.92 * documentWidth, //大棋盘格的宽，为92%
    cellSideLength = 0.18 * documentWidth, //小棋盘格的宽，为18%
    cellSpace = 0.04 * documentWidth; //小棋盘格的边距，为4%


//棋盘格grid定位的top和left
function getcellTop(i, j) {
    return cellSpace + (cellSpace + cellSideLength) * i;
}

function getcellLeft(i, j) {
    return cellSpace + (cellSpace + cellSideLength) * j;
}

//数字的背景颜色
function getNumberbgc(value) {
    switch (value) {
        case 2:
            return "#F0E3D9";
        case 4:
            return "#F0E0C9";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
    // return "black";
}

//数字颜色
function getNumberColor(value) {
    if (value <= 4) {
        return "#776e65";
    } else {
        return "white";
    }

}

//判断有无空间，以生成随机数
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                //当board有值为0时，即棋盘格有空间，则nospace为假
                return false;
            }
        }
    }
    return true;
}

//判断能否向左移动，即(i,j)处的左边一个位置(i,j-1)是否为0或相等
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                //board[i][j]的左边（即：board[i][j - 1]）为0或与其值相同
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

//判断能否向右移动，即(i,j)处的右边一个位置(i,j+1)是否为0或相等
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                //board[i][j]的右边（即：board[i][j + 1]）为0或与其值相同
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

//判断水平方向有无障碍物
function noBlockHorizontal(row, colum1, colum2, board) {
    for (var j = colum1 + 1; j < colum2; j++) {
        if (board[row][j] != 0)
            return false;
    }
    return true;
}

//判断垂直方向有无障碍物
function noBlockVertical(row1, row2, colum, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][colum] != 0)
            return false
    }
    return true;
}

function nomove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}