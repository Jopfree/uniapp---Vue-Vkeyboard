import Vue from 'vue'
import vKeyboard from './VKeyboard'

//extend创建Vue组件类
const vKeyboardClass = Vue.extend(vKeyboard)

let instance;

export default {
  activate(options) {
    options = options || {};
    instance = new vKeyboardClass({propsData: options});
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    /*document.body.appendChild(instance.vm.$el);*/
    instance.activate();
    return instance;
  },
  deactivate() {
    instance.deactivate();
  }
}