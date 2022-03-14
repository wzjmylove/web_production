$(function() {
    //arr_scr是图片地址
    var arr_src = new Array("./image/1.jpg", "./image/2.jpg", "./image/3.jpg", "./image/4.jpg", "./image/5.jpg");
    var j = 0;
    creatHTML();



    //初始化页面：给页面追加图片
    function creatHTML() {
        for (var i = 0; i < arr_src.length; i++) {
            $('.shell_right ul li img').eq(i).attr('src', arr_src[i]);
            $(".shell_left ul li").eq(i).children('img').attr('src', arr_src[i]);
        }
        //避免第一张图片出现光标
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
        }, false);
    }

    //图片移动：利用overflow和定位，使图片的位置发生改变
    function imgMove(value) {
        $('.shell_left ul').css('left', value * (-427.2))
            //利用JQuery的排他性
        $('.shell_right li').eq(value).css('left', '-82px').siblings().css('left', '0');
    }

    //鼠标移动轮播
    $('.shell_right li').mousemove(function() {
        var index = $(this).index();
        // console.log(index);
        imgMove(index);
        j = index;
    })

    //自动轮播
    var animation = setInterval(function() {
        if (j == 5)
            j = 0;
        imgMove(j);
        j++;
    }, 2000)
})