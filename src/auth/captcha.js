import $ from 'jquery'
import initGeetest from './gt'
/**options*/
// {
//     success:fn ,
//     triggerBtn:el,
//     target : el
// }
export default  function  Captcha(opt){
        function handlerPopup(captchaObj){
            captchaObj.onSuccess(function () {
            var validate = captchaObj.getValidate()
            $.ajax({
                url: "/pc-geetest/validate", // 进行二次验证
                type: "post",
                dataType: "json",
                data: {
                    geetest_challenge: validate.geetest_challenge,
                    geetest_validate: validate.geetest_validate,
                    geetest_seccode: validate.geetest_seccode
                },
                success: function (data) {
                        opt.success(data.status)
                }
            })

        })
        captchaObj.appendTo($(opt.target))
        $(document).on('submit', function(){
            console.info('onsubmit')
            captchaObj.show()
        })

    }
        $.ajax({
        url: "/pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handlerPopup)
        }
        })

}