require.config({paths:{jquery:"lib/jquery-1.11.1.min"}}),require(["jquery"],function(a){function b(){var b=a("#time").html();b>0?(b--,a("#time").html(b)):window.top.location.href="http://www.homaer.com/",setTimeout(arguments.callee,1e3)}var c={mobile:/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,email:/^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,number:/^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/},d=function(b){a("#tipmsg").html(b)},e=function(){return a.trim(a("input[name=userName]").val()).length<2?(d("请填写用户名"),!1):c.email.test(a("input[name=email]").val())?c.mobile.test(a("input[name=mobile]").val())?!0:(d("请输入正确的手机号码"),!1):(d("请输入正确的邮箱"),!1)},f=function(){return{reserveName:a("input[name=userName]").val(),reserveSex:a("input[name=sex]").val(),reservePhone:a("input[name=mobile]").val(),reserveEmial:a("input[name=email]").val(),reserveMsg:a("textarea[name=message]").val()}};a("#reserveBtn").click(function(c){c.preventDefault();var d=e();if(d){var g=f();a.ajax({type:"POST",url:"ms/manage/reserve.do",data:g,dataType:"html",success:function(){a(".order-wp").empty(),a(".order-wp").html('<h1 style="color:green" align="center">恭喜您，提交成功!</h1><h2 align="center"><i id="time">5</i>秒后自动返回首页</h2>'),b()},error:function(){alert("网络错误，请重新提交！")}})}})});