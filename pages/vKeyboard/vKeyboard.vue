<template>
	<view>
		<textarea @tap="activeKeyboard" disabled :value="input" placeholder="点击调起键盘输入"></textarea>
		<!-- 调起模拟键盘 -->
		<vKeyboard ref="keyboard" :disorderly="false" @typing="typing" @enter="enter"></vKeyboard>
	</view>
</template>

<script>

	import vKeyboard from '@/components/VKeyboard/VKeyboard.vue'//引入键盘
	export default {
		components: {
			vKeyboard	//注册键盘
		},
		data() {
			return {
				input: ''//键盘输入
			};
		},
		methods: {
			//键盘方法
			activeKeyboard() {
				this.$refs.keyboard.activate();
			},
			typing(e) {
				if (e.backspace) {
					if (this.input.length > 0) {
						this.input = this.input.substring(0, this.input.length - 1);
					}
				}
				else {
					this.input += e.char;
				}
			},
			enter() {
				this.$refs.keyboard.deactivate();
			},
			//键盘方法end
		}
	}
</script>

<style>	
	
</style>
