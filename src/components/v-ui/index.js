/***注册指令***/

function Directive(Vue, options) {
    Vue.directive('ui', {
        bind: function(el, binding, vnode) {
            let autoPlayname = ['checkbox', 'dropdown', 'modal','popup'];
            var vm = vnode.context; //当前组件实例
            var vui = binding.value;
            // console.log(el, binding, vnode)
            // console.log('------------bind------------')
            autoPlayname.forEach((item) => {
                vm.$nextTick(() => {
                    let jqThis = $(vnode.elm)
                    let isThis = jqThis.is('.' + item);
                    if (vui && item == 'modal') {
                        isThis ? jqThis[item]('attach events', vui) : '';
                    } else if(vui && item == 'popup'){
                        isThis ? jqThis[item]({popup: $(vui)}) : '';
                    }else {
                        isThis ? jqThis[item]() : ''
                    }
                })

            })

        },
        unbind: function(el, binding, vnode, oldVnode) {
            // console.log(el, binding, vnode, oldVnode)
            // console.log('----------unbind-----------')
        },
        update: function(el, binding, vnode, oldVnode) {
            // var vm = vnode.context; //当前组件实例
            // let autoPlayname = ['dropdown'];
            // console.log(el, binding, vnode, oldVnode)
            // console.log('----------update-----------')
            // if ($(vnode.elm).parent().is('.dropdown')) {

            // }

        }

    })
}


var install = function(Vue, options) {
    Directive(Vue, options)
}

module.exports = install;
