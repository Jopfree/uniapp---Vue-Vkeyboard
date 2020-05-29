1、先引入VKeyboard组件
<br/>
import vKeyboard from '@/components/VKeyboard/VKeyboard.vue'
<br/>
2、注册组件
<br/>
components: {
	vKeyboard
}
<br/>
3、在界面上放置组件并注册事件
<br/>
<v-keyboard ref="keyboard" :disorderly="false" @typing="typing" @enter="enter"></v-keyboard>
<br/>
4、显示虚拟安全键盘
<br/>
this.$refs.keyboard.activate();
<br/>
5、隐藏虚拟安全键盘
<br/>
this.$refs.keyboard.deactivate();
<br/>