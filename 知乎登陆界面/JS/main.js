$(function() {
    //隐藏密码按钮
    var span_hidden = document.querySelector('.bigbox .box2 span');
    var span_hidden_click = 0;
    span_hidden.addEventListener('selectstart', function(e) { e.preventDefault(); })
    span_hidden.onclick = function() {
        span_hidden_click++;
        if (span_hidden_click % 2 == 1) {
            span_hidden.innerHTML = '&#xe6d1;'
            $('#input_password').prop('type', 'text');
        } else {
            span_hidden.innerHTML = '&#xe6e2;';
            $('#input_password').prop('type', 'password');
        }
    }


    //判断input是否为空，提醒用户输入信息
    var input_number = $('#input_number');
    input_number.blur(function() {
        if (input_number.val() == '')
        //向input标签追加一个让placeholder变红的类
            input_number.prop('placeholder', '请输入手机号或邮箱').addClass('have_ph');
    })
    var input_password = $('#input_password');
    input_password.blur(function() {
        if (input_password.val() == '')
        //向input标签追加一个让placeholder变红的类
            input_password.prop('placeholder', '请输入密码').addClass('have_ph');
    })
})