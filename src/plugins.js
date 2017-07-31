//插件
import Message from './components/message';
const components = [
  Message
  ]
const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$message = Message
}

/* 如果是非构建方式引用  */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
module.exports = {
  version: '1.1.0',
  install,
  Message
}