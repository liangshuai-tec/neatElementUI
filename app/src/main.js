import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vuex
import Vuex from 'vuex'
// import store from './vuex/store'
Vue.use(Vuex);

import '@/util/dialogDrag'

 /* eslint-disable */
import axios from 'axios'
Vue.prototype.$http = axios
// 引入mock文件
import "@/mock/index.js"; // mock 方式，正式发布时，注释掉该处即可




/**忽略eslint**/
// 重置css
// import 'minireset.css'

// Element 配置
Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
import {
  Loading,
  MessageBox,
  Notification,
  Message,
  Button,
  ButtonGroup
} from 'element-ui'
import { options } from 'less'
import "element-ui/lib/theme-chalk/index.css"

// 重复点击某个按钮，message消息弹窗单实例
let messageInstance = null;
const resetMessage = (options) => {
  if(messageInstance){
    messageInstance.close();
  }
  messageInstance = Message(options);
}
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    options = {
      message: options,
      type: type
    }
    return resetMessage(options);
  }
})

const message = resetMessage;

// plugins
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = message;

Vue.use(Button);
Vue.use(ButtonGroup);


// es6-promise
var Promise = require('es6-promise').Promise;

Vue.config.debug = false;
// 开发时  使用  vue-devtools 来调试 （true）
Vue.config.devtools = false;
Vue.config.productionTip = false;


// 模板代码
router.beforeEach((to, from, next) => {
  if(to.path && to.path.indexOf("/index.html") > -1){
    next({
      name:'login',
      query:to.query
    })
  }else{
    next()
  }
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if(isChunkLoadFailed){
    router.replace(targetPath);
  }
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')