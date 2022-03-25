$(function() {
    //总价和总数量
    getSum();

    //按钮选择
    //(1)全选按钮
    $('.checkall').change(function() {
        //让商品的选中按钮的checked的值与全选按钮一样   首尾全选按钮呼应(注意，隔开)
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        //按钮选中之后添加背景类
        $(this).prop('checked') ? $('.cart-item').addClass('check-cart-item') : $('.cart-item').removeClass('check-cart-item')

        //总价和总数量
        getSum();
    });



    //(2)商品选中按钮
    $('.j-checkbox').change(function() {
        // 若商品按钮全部被选中后， 全选按钮应该checked
        if ($('.j-checkbox:checked').length == $('.j-checkbox').length)
            $('.checkall').prop('checked', true);
        else
            $('.checkall').prop('checked', false);
        //按钮选中之后添加背景类
        $(this).prop('checked') ? $(this).parents('.cart-item').addClass('check-cart-item') : $(this).parents('.cart-item').removeClass('check-cart-item')

        //总价和总数量
        getSum();
    });




    //商品的数量改变
    //(1)商品的增加，数量改变，小计改变
    $('.increment').click(function() {
        //获取该商品的数量框内的数字
        let itxt = $(this).siblings('.itxt');
        let n = Number(itxt.val());
        //点一次，数量就+1
        n++;
        itxt.val(n);

        //获取商品单价
        let price = $(this).parents('.cart-item').children('.p-price').text();
        price = Number(price.slice(1));
        //n*price，并修改小计的值
        $(this).parents('.cart-item').children('.p-sum').text('￥' + (n * price).toFixed(2));
        //总价和总数量
        getSum();
    });

    //(2)商品的减少，数量改变，小计改变
    $('.decrement').click(function() {
        //获取该商品的数量框内的数字
        let itxt = $(this).siblings('.itxt');
        let n = itxt.val();
        if (n <= 1)
            return false;
        //点一次，数量就+1
        n--;
        itxt.val(n);
        //获取商品单价
        let price = $(this).parents('.cart-item').children('.p-price').text();
        price = Number(price.slice(1));
        //n*price，并修改小计的值
        $(this).parents('.cart-item').children('.p-sum').text('￥' + (n * price).toFixed(2));
        //总价和总数量
        getSum();
    });

    //(3)用户直接修改数量
    $('.itxt').change(function() {
        let n = Number($(this).val());
        let price = $(this).parents('.cart-item').children('.p-price').text();
        price = Number(price.slice(1));
        $(this).parents('.cart-item').children('.p-sum').text('￥' + (n * price).toFixed(2));
        //总价和总数量
        getSum();
    });

    //商品删除
    //(1)商品右边的删除按钮
    $('.p-action').click(function() {
        $(this).parents('.cart-item').remove();
        //总价和总数量
        getSum();
    });

    //(2)页面底部的删除选中商品按钮
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').each(function(i, ele) {
            $(ele).parents('.cart-item').remove();
        })
        getSum();
    })

    //(2)页面底部的清空购物车按钮
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getSum();
    })

    //总价和总数量
    function getSum() {
        let count = 0;
        let money = 0;
        //计算选中商品的总数量
        $('.j-checkbox:checked').parents('.cart-item').find('.itxt').each(function(i, ele) {
            count += Number($(ele).val());
        })

        //改变总数量
        $('.amount-sum em').text(count);

        //计算选中商品的总价格
        $('.j-checkbox:checked').parents('.cart-item').find('.p-sum').each(function(i, ele) {
            let price = $(ele).text().slice(1);
            money += Number(price);
        })

        //改变总价格
        $('.price-sum em').text('￥' + money.toFixed(2));
    }
})