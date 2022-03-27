$(function() {
    // 初始化页面
    //(1)登录按钮选择      
    //立即执行函数保证 该按钮选择永远不变，如果后面覆盖这个按钮，会导致无法识别当前所点击的按钮
    (function Login() {
        let box1 = document.createElement('div');
        $(box1).addClass('box1');
        let box1_left = document.createElement('div');
        $(box1_left).addClass('box1_left');
        let btn1 = document.createElement('button'),
            btn2 = document.createElement('button');
        btn1.innerText = '免密码登录';
        btn2.innerText = '密码登录';
        $(btn2).addClass('box1_button1');
        $(box1_left).append(btn1, btn2);
        let img1 = document.createElement('img');
        img1.src = '../img/er_wei_ma.png';
        $(box1).append(box1_left, img1);
        $('.bigbox1').prepend(box1);
    })();
    //(2)
    LoginByPassword();


    //登录按钮点击
    //(1)免密登录
    $('.box1 button:eq(0)').click(function() {
        $(this).addClass('box1_button1');
        $(this).siblings().removeClass('box1_button1');
        LoginWithoutPassword();
    })

    //(2)密码登录
    $('.box1 button:eq(1)').click(function() {
        $(this).addClass('box1_button1');
        $(this).siblings().removeClass('box1_button1');
        LoginByPassword();
    })

    //(3)二维码登录
    let tag = true;
    $('.box1 img').click(function() {
        //tag为true时，点击右上角二维码会进入QR页面；false时，点击会返回到主页
        if (tag) {
            LoginByQRCode();
            $(this).prop('src', '../img/QRCode.png');
        }
        if (!tag) {
            LoginByPassword();
            $(this).prop('src', '../img/er_wei_ma.png');
            $('.box1_left').show();
        };
        tag = !tag;
    })


    //免密登录的页面
    function LoginWithoutPassword() {
        //清空bigbox1里面的内容（除box1）
        $('.box1').siblings().remove();
        //渲染免密登录的界面

        (function CreatHTML1() {
            //box2
            let box2 = document.createElement('div');
            $(box2).addClass('box2');
            let ipt1 = document.createElement('input');
            $(ipt1).prop({
                'type': 'number',
                'class': 'input',
                'id': 'input_number',
                'placeholder': '手机号'
            });
            let ipt2 = document.createElement('input');
            $(ipt2).prop({
                'type': 'number',
                'class': 'input',
                'id': 'input_password',
                'placeholder': '请输入6位短信验证码'
            });
            $(box2).append(ipt1, ipt2, '<a herf="" style="font-size: 14px;">获取短信验证码</a>');
            $('.box1').after(box2);

            //box3
            let box3 = document.createElement('div');
            $(box3).addClass('box3');
            let box3_right = document.createElement('div');
            $(box3_right).addClass('box3_right');
            $(box3_right).append('<a style="font-size: 14px;">接受语音验证码</a>');
            box3.appendChild(box3_right);
            $('.box2').after(box3);

            //box4
            let box4 = document.createElement('div');
            $(box4).addClass('box4').html('<button>注册</button>');
            $('.box3').after(box4);

            //box5
            let box5 = document.createElement('div');
            $(box5).addClass('box5').html('未注册手机验证后自动登录，注册即代表同意<a href="">《知乎协议》</a><a href="">《隐私保护指引》</a>');
            $('.box4').after(box5);
        })()
        //判断input是否为空，提醒用户输入信息
        var input_number = $('#input_number');
        input_number.blur(function() {
            if (input_number.val() == '')
            //向input标签追加一个让placeholder变红的类
                input_number.prop('placeholder', '请输入手机号').addClass('have_ph');
        })
        var input_password = $('#input_password');
        input_password.blur(function() {
            if (input_password.val() == '')
            //向input标签追加一个让placeholder变红的类
                input_password.prop('placeholder', '请输入短信验证码').addClass('have_ph');
        })
    }

    //密码登录的页面
    function LoginByPassword() {
        //清空bigbox1里面的内容（除box1）
        $('.box1').siblings().remove();


        //渲染密码登录的界面
        (function CreatHTML2() {
            //box2
            let box2 = document.createElement('div');
            $(box2).addClass('box2');
            let ipt1 = document.createElement('input');
            $(ipt1).prop({
                'type': 'text',
                'class': 'input',
                'id': 'input_number',
                'placeholder': '手机号或邮箱'
            });
            let ipt2 = document.createElement('input');
            $(ipt2).prop({
                'type': 'password',
                'class': 'input',
                'id': 'input_password',
                'placeholder': '密码'
            });
            let a = document.createElement('a');
            $(a).html('😝');
            $(box2).append(ipt1, ipt2, a);
            $('.box1').after(box2);

            //box3
            let box3 = document.createElement('div');
            $(box3).addClass('box3');
            let box3_left = document.createElement('div');
            $(box3_left).addClass('box3_left');
            $(box3_left).append('<a href="">海外手机号登陆</a>');
            let box3_right = document.createElement('div');
            $(box3_right).addClass('box3_right');
            $(box3_right).append('<a href="">忘记密码?</a>');
            box3.appendChild(box3_left);
            box3.appendChild(box3_right);
            $('.box2').after(box3);

            //box4
            let box4 = document.createElement('div');
            $(box4).addClass('box4').html('<button>注册/登录</button>');
            $('.box3').after(box4);

            //box5
            let box5 = document.createElement('div');
            $(box5).addClass('box5').html('未注册手机验证后自动登录，注册即代表同意<a href="">《知乎协议》</a><a href="">《隐私保护指引》</a>');
            $('.box4').after(box5);
        })()

        //隐藏密码按钮
        let a_hidden = document.querySelector('.bigbox .box2 a');
        let tag = true;
        a_hidden.addEventListener('selectstart', function(e) { e.preventDefault(); })
            // a_hidden.innerHTML = '&#xe6d1;';
        a_hidden.onclick = function() {
            if (tag) {
                a_hidden.innerHTML = '😲';
                $('#input_password').prop('type', 'text');
            }
            if (!tag) {
                a_hidden.innerHTML = '😝';
                $('#input_password').prop('type', 'password');
            }
            tag = !tag;
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
    }
    //二维码登录页面
    function LoginByQRCode() {
        // $('.bigbox1').html('');
        //清空bigbox1里面的内容（除box1）
        $('.box1').siblings().remove();
        $('.box1_left').hide();
        (function CreatHTML3() {
            let box2 = document.createElement('div');
            $(box2).addClass('QRCode_title').text('扫码登陆');
            $('.box1').after(box2);
            let box3 = document.createElement('div');
            $(box3).addClass('.QRCode_img');
            // $(box3).html('<img src="../img/image.png" alt="" class=".QRCode_img_QR">')
            let img2 = document.createElement('img');
            img2.src = '../img/image.png';
            $(img2).addClass('QRCode_img_QR');
            $(box3).append(img2);
            $('.QRCode_title').after(box3);
            $(box3).after('<p>打开<a href="https://www.zhihu.com/app/" target="_blank" rel="noopener noreferrer"> 知乎 App</a></p><p>在「我的」页面顶部打开扫一扫</p><p>如扫码异常请下载最新版客户端</p>');
        })()
    }
})