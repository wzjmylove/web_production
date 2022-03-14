//随机数生成动画实现
function AnimationForRandNumber(i, j, num) {
    var NumberCell = NumberCell = $('#number_cell_' + i + '_' + j);
    NumberCell.css({
        backgroundColor: getNumberbgc(num),
        color: getNumberColor(num)
    });
    NumberCell.text(num);
    NumberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getcellTop(i, j),
        left: getcellLeft(i, j)
    }, 50, 'linear')

}

//移动动画实现
function AnimationForMove(from_x, from_y, to_x, to_y) {
    var NumberCell = NumberCell = $('#number_cell_' + from_x + '_' + from_y);
    NumberCell.animate({
        top: getcellTop(to_x, to_y),
        left: getcellLeft(to_x, to_y)
    }, 200, 'linear')
}