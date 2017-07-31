export var html_model1 = `<div style="background: url(http://www.eventdove.com/img/refactor2/image/mail_cps_2.png) repeat-y; width: 652px; margin: 0 auto; overflow: hidden; margin-top: 15px; margin-bottom: 15px;">
                                <div style="background:url(http://www.eventdove.com/img/refactor2/image/mail_cps_1.png); width:652px; height:44px;"></div>
                                <p style="font-size: 14px; color: #F60; padding-left: 30px; padding-top: 20px;">
                                    亲爱的， 相信您会对下面的活动感兴趣！</p>
                                <!--活动信息-->
                                <div style="overflow: hidden; clear: both; float: none; padding-left: 60px; padding-top: 25px; padding-bottom: 15px;">
                                    <a href="http://hyzing-alex-123.eventdove.com"><img src="http://www.eventdove.com/resource/20160930/373814_20160930160810460.jpg" style="padding: 3px; background: #FFF; border: solid 1px #ccc;width :75px; height:75px; float: left; margin-right: 12px;">
                                    </a>
                                    <div style="float: left;">
                                        <p style="width: 430px; font-size: 14px; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 16px;">
                                            <a href="http://hyzing-alex-123.eventdove.com">商业讨论大会</a>
                                        </p>
                                        <p style="width: 430px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 14px; margin-bottom: 7px;">
                                            <a href="http://hyzing-alex-123.eventdove.com">http://hyzing-alex-123.eventdove.com</a>
                                        </p>
                                        <p style="width: 430px; color: #818181; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 16px;">
                                            主办：南京海震<br>
                                            地点：江苏&nbsp;南京市&nbsp;新城科技园11<br>
                                            时间：
                                            2012-06-25 08:00</p>
                                    </div>
                                </div>
                                <!--活动信息 End-->
                                <span style="display: block; width: 600px; height: 1px; font-size: 0px; background: #eee; margin: 0 auto;"></span>
                                <!--分割线-->
                                <!--推广信息-->
                                <div style="background: url(http://www.eventdove.com/img/refactor2/image/mail_disc_1.png) no-repeat; background-position:35px 27px; width:652px; padding-bottom:30px; overflow:hidden;">
                                    <div style="padding-left: 185px; padding-top: 30px;">
                                        <p style="margin:0px; padding:0px; font-size:24px; font-family:'微软雅黑'; color:#656565; line-height:26px; margin:0px 30px 8px 0px;">
                                        每张门票，您都将获得<span style="color:#F60" id="affiliate_pay_value">免费</span>的优惠</p><p style="color:#656565; line-height:22px; margin-top:15px;">
                                        </p><div id="clipboard_content">
                                            <span style="font-size: 16px; color: #666;">优惠码：<span style="color: #F60; font-weight: bold;">ds022b</span>
                                            </span>
                                        </div>
                                        <p style="margin:0px; padding:0px; margin-top:10px; margin-bottom:10px;">此优惠码可以应用于下面的门票</p>
                                                    <p style="margin:0px; padding:0px; line-height:20px; font-size:14px;">
                                                    审核票<br>
                                                    学术沙龙<br>
                                                    aolex<br>
                                                    收费审核<br>
                                                    </p>
                                            </div>
                                </div>


                                <span style="display: block; width: 600px; height: 1px; font-size: 0px; background: #eee; margin: 0 auto;"></span>
                                <!--分割线-->
                                <div style="padding-top: 10px;">
                                    <div style="width: 580px; margin: 0 auto; margin-bottom: 10px; padding: 10px; border: dotted 1px #CCC;">
                                        <div id="out_email_affiliateinvite">
                                            <input type="hidden" id="msg_flag" value="0">
                                                <div style="line-height: 18px; color: #333;">
                                                    如果您还有其他需要写给好友的话，可以点击下面的按钮添加文字</div>
                                            </div>

                                        <a href="javascript:void(0);" onclick="modify_affiliateemail_content('create_affiliateinvite_mask','invite_affiliateemail_content','email_affiliateinvite_value','pop_win','pop_win2')" style="background: url(http://www.eventdove.com/img/refactor2/image/mail_text_btn.png) no-repeat; width: 90px; height: 26px; display: block;"><!-- http://www.eventdove.com/img/refactor2/image/mail_text_btn.png --></a>
                                    </div>
                                    <p style="text-align: right; padding: 0px 30px; color: #585858;">
                                        南京海震<br>
                                        2017-06-13<br>
                                        <a href="javascript:void(0);" style="line-height: 20px; text-decoration: underline;">联系我们</a>
                                    </p>
                                </div>
                                <div style="background: url(http://www.eventdove.com/img/refactor2/image/mail_cps_3.png); width: 652px; height: 10px; font-size: 1px;"></div>
                            </div>`
export var html_model2 = `
    <table style="margin:0 auto;min-width:500px;max-width:1000px;width:100%">
        <tr height="130">
            <td style="border:none" width="80">
                <img src="<%= obj[2] %>/images/emailmodel/img_1.jpg" alt="">
            </td>
            <td style="border:none;font-size: 18px;color:#3f464b">
                <p>恭喜您，获得一张门票优惠码，将获<span style="color:#fcb34c"><%=obj[0].discountType=='rate'?obj[0].discountTypeValue+'%':'&yen;'+obj[0].discountTypeValue %></span>的优惠！</p>
                <p style="font-size: 14px;">优惠码：<span style="color:#fcb34c;font-size: 16px"><%= obj[0].discountCode %></span></p>
            </td>
            <td style="border:none;text-align: right;">
                <a href="<%= obj[2]+'/site/'+obj[1].id  %>" style="background:#fa565a;color:#fff;display: inline-block;width:96px;height:34px;line-height: 34px;text-align: center;cursor: pointer; text-decoration: none">立即报名</a>
            </td>
        </tr>
        <tr height="100" style="border:1px solid #fcb34c;background: #fff1de">
            <td style="border:none" width="100%" colspan="3" >
                <p style="color:#3f464b;font-size: 14px;padding:0 10px;line-height: 20px">优惠码使用说明：
                    <br> 1、凭上方优惠码点击活动链接：<a style="color:#0099ff" href="<%= obj[2]+'/site/'+obj[1].id  %>"><%= obj[2]+'/site/'+obj[1].id  %></a> 报名，即可获得优惠！
                    <br> 2、此优惠码适用的门票种类：<% for(var i=0;i<obj[0].applyToTickets.length;i++){ %>
                            <%= i==0?obj[3][obj[0].applyToTickets[i]]:'、'+obj[3][obj[0].applyToTickets[i]] %>
                        <% } %>
                </p>
            </td>
        </tr>
        <tr height="130">
            <td style="border:none" width="100%" colspan="3" >
                <p style="color:#949699;font-size: 14px;line-height: 20px">
                    活动名称：<%= obj[1].title %>
                    <br> 主办方：<%for(var i=0;i<obj[1].organizers.length;i++){%>
                            <%= i==0?obj[1].organizers[i].name:'、'+obj[1].organizers[i].name %>
                        <%}%>
                    <br>地点：<%= obj[1].detailedAddress %>
                    <br> 时间：<%= obj[1].startTime %>
                </p>
            </td>
        </tr>
    </table>`