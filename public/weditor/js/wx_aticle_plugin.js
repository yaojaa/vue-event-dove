/***导入微信文章插件***/
(function() {
    // 获取 wangEditor 构造函数和 jquery
    var E = window.wangEditor;
    var $ = window.jQuery;
    var errorMessage = function(errStr){
        this.find('.wx_ErrorMessage').remove();
        this.find('.wx_url').after('<span class="wx_ErrorMessage" style="color:red">'+errStr+'</span>')
        setTimeout(()=>{
            this.find('.wx_ErrorMessage').remove();
        },3000)
    }
    // 通过 E.plugin 注入插件代码
    E.plugin(function() {
        // 此处的 this 指向 editor 对象本身
        var editor = this;
        var $toolbar = $('<a class="ui button teal mini waterRipple wechat WECHAT_BUTTON"><i class="wechat icon"></i>一键引用微信公众号文章</a>');
        var $openWindow = $('<div class="wx_pop ui" style="display:none">' +
            '<div class="content">' +
            '<div class="ui form">' +
            '<h3 class="ui icon header center aligned">' +
            '<i class="wechat teal icon circular inverted"></i>' +
            '<div class="content">' +
            '导入微信文章' +
            '<div class="sub header">将你在微信图文页的排版一键导入至会鸽</div>' +
            '</div>' +
            '</h3>' +
            '<div class="ui hidden divider"></div>' +
            '<div class="field">' +
            '<input type="text" class="wx_url"  name="" placeholder="请输入微信文章链接地址">' +
            '</div>' +
            '</div>' +
            '</div><br/>' +
            '<div class="actions text-center">' +
            '<div class="ui button deny">' +
            '取消' +
            '</div>' +
            '<div class="ui blue button ok import_btn">' +
            '确定' +
            '</div>' +
            '</div>' +
            '</div>');


        editor.$editorContainer.append($toolbar)
        editor.$editorContainer.append($openWindow)

        editor.$editorContainer.on('click', '.deny', function() {
            editor.$editorContainer.find('.wx_pop').hide()
        })

        editor.$editorContainer.on('click', '.import_btn', function() {
            var url = editor.$editorContainer.find('.wx_url').val();
            var JQparent = $(this).parents('.wx_pop')
            if (!url || !/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(url)) {
                return errorMessage.call(JQparent,'请输入正确的链接地址');
            }
            $.get('/importAticleFromWX', { url: url }, (res) => {
                if(res.html){
                    JQparent.find('.wx_url').val('')
                    editor.$txt.html(res.html)
                    editor.$editorContainer.focus()
                    editor.$editorContainer.find('.wx_pop').hide()
                }else{
                    errorMessage.call(JQparent,typeof res.error==='string'?res.error:'未知的错误');
                }
            }).error((err)=>{
                console.log(err)
            })
        })
        $toolbar.on('click', function() {
            editor.$editorContainer.find('.wx_pop').toggle()
        })
    })

})()
