# eventdove V2.0  fontEnd
nodejs+ express + vue +webpack +  Semantic UI + jQuery

# how to start

clone code

``` npm install  ```      安装依赖

``` npm run dev ```   进入开发模式

``` npm run build ```   打包发布文件

default port 8889

view localhost:8889

#host
127.0.0.1 qa.www.eventdove.com 


# others
 remove vue-resource user jQuery (https://github.com/vuefe/vuefe.github.io/issues/186)
 jQuery has much  Plugins  for us  to agile development

# nginx 配置
安装nginx  或进入docker里的nginx
` ngc config `

```
    server{
        listen       80;
        server_name  dev.www.eventdove.com;
        allow all;
        location / {
                proxy_pass http://127.0.0.1:8889;
        }
        location /api {
            proxy_pass http://qa.www.eventdove.com;
        }
    }

```
# 报名表单收集项 v2.0 需要实现的功能:

单选
多选
下拉
输入框
－－－－
日期
附件
姓名 （默认）
邮件 （默认）
手机
城市 （省市）
地址

# 文件上传七牛

token获取地址 

 ``` /uptoken ```

 返回：
 ```
 {"uptoken":"o-JFl4T8wh525DaNX8zaPtZ6Cpc-EKpJBnUI0JpF:pvecQV66p7mZaB8uJX7ocjzSUTw=:eyJzY29wZSI6ImV2ZW50ZG92ZSIsImRlYWRsaW5lIjoxNDk2MjE0OTY1fQ=="}
 ```
上传地址：
``` http://upload.qiniu.com ```

[demo](http://jsfiddle.net/gh/get/jquery/1.9.1/icattlecoder/jsfiddle/tree/master/ajaxupload?ref=developer.qiniu.com)

# backEnd api22

http://qa.www.eventdove.com/apidoc/
