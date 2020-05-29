

## 转载说明

原插件来源于uniapp插件市场：开发者：Magician：[移动app端模拟全键盘 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=625)

## github Demo

```
https://github.com/Jopfree/uniapp---Vue-Vkeyboard
```


## 使用说明

1、先引入VKeyboard组件

```
import vKeyboard from '@/components/VKeyboard/VKeyboard.vue'
```
2、注册组件
```
components: {
	vKeyboard
}
```
3、在界面上放置组件并注册事件
```
<v-keyboard ref="keyboard" :disorderly="false" @typing="typing" @enter="enter"></v-keyboard>
```
4、显示虚拟安全键盘

```
this.$refs.keyboard.activate();
```
5、隐藏虚拟安全键盘

```
this.$refs.keyboard.deactivate();
```

