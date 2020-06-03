<template>
	<view v-if="showKeyboard" :class="keyboardStyle" class="enl-size">
		<view class="digit-keyboard" v-if="mode === 'digit' || digital">
			<view class="digit-button-box">
				<template v-for="(digit, index) in digits">
					<!-- <view :key="index" class="enl-key-button enl-digit" @tap="typing('.')" v-if="index === 9">.</view> -->
					<view :key="index" class="enl-key-button enl-digit" @tap="typing(digit)">{{digit}}</view>
				</template>
				<view class="enl-key-button enl-digit">
					<i class="iconfont icon-shouqijianpan enl-middle" v-if="digital" @tap="deactivate"></i>
					<i class="iconfont icon-ABC enl-middle" v-else @tap="typingLetter"></i>
				</view>
			</view>
			<view class="special-button-box">
				<view class="enl-key-button special-button enl-gray" @tap="backspace"><i class="iconfont icon-backspace enl-large"></i></view>
				<view class="enl-key-button special-button enl-gray" @tap="enter"><i class="iconfont icon-huiche enl-large"></i></view>
			</view>
		</view>
		<view class="full-keyboard" v-else>
			<view class="line" v-for="(letters, index) in lines" :key="index">
				<view class="enl-letter enl-key-button special-key enl-gray" v-if="index === 3 && mode === 'letter'" @tap="toggleCase"><i
					 :class="'iconfont ' + (lowercase ? 'icon-xiaoxie' : 'icon-daxie')"></i></view>
				<view class="enl-letter enl-key-button normal" v-for="letter in letters" @tap="typing(letter)" :key="letter">{{letter}}</view>
				<view class="enl-letter enl-key-button special-key enl-gray" v-if="index === 3" @tap="backspace"><i class="iconfont icon-backspace"></i></view>
			</view>
			<view class="line special-line">
				<view class="enl-letter enl-key-button swith-key enl-gray">
					<i class="iconfont icon-fuhao" @tap="typingSymbol" v-if="mode === 'letter'"></i>
					<i class="iconfont icon-ABC" @tap="typingLetter" v-if="mode === 'symbol'"></i>
				</view>
				<view class="enl-letter enl-key-button space" @tap="typing(' ')"><text class="enl-logo">spacebar</text></view>
				<view class="enl-letter enl-key-button swith-key enl-gray" @tap="typingDigit"><i class="iconfont icon-shuzi"></i></view>
				<view class="enl-letter enl-key-button swith-key enl-gray" @tap="enter"><i class="iconfont icon-huiche"></i></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		natural,
		order,
		disorder,
		symbols,
		digits,
		KEYBOARD_MODE
	} from './utils'
	export default {
		props: {
			//是否为纯数字键盘
			digital: {
				type: [Boolean, String],
				default: false
			},
			//是否无序的排序键盘
			disorderly: {
				type: [Boolean, String],
				default: false
			}
			/* ,
						value: String */
		},
		//app中不生效，不知道为什么
		/* model: {
			prop: 'value',
			event: 'typing'
		}, */
		computed: {
			keyboardStyle() {
				return 'v-keyboard ' + this.cls;
			}
		},
		data() {
			return {
				cls: '',
				visible: false, //是否显示
				showKeyboard: false, //是否隐藏
				digits: [], //自然数数组
				lines: [], //字母+数字数组
				lowercase: true, //是否小写输入状态
				mode: KEYBOARD_MODE.LETTER, //键盘模式
				keys: [] //键入的键值
			}
		},
		methods: {
			//大小写转换
			toggleCase() {
				this.lowercase = !this.lowercase;
			},
			//输入符号
			typingSymbol() {
				this.mode = KEYBOARD_MODE.SYMBOL;
				this.lines = symbols;
			},
			//输入字母
			typingLetter() {
				this.mode = KEYBOARD_MODE.LETTER;
				this.lines = this.disorderly ? disorder() : order;
			},
			//键入数字
			typingDigit() {
				this.mode = KEYBOARD_MODE.DIGIT;
			},
			//键盘键入
			typing(input) {
				this.keys.push(input);
				//app中v-model不生效，改用事件方式在外处理
				//this.$emit('typing', this.keys.join(''));

				this.$emit('typing', {
					backspace: false,
					char: input
				})
			},
			//退格键
			backspace() {
				if (this.keys.length) {
					this.keys.pop()
				}
				//this.$emit('typing', this.keys.join(''));
				this.$emit('typing', {
					backspace: true
				})
			},
			//键入回车
			enter() {
				//this.deactivate();
				this.$emit('enter');
			},
			//激活键盘
			activate() {
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				// #endif
				this.showKeyboard = true
				this.$nextTick(() => {
					this.visible = true;
				})
			},
			//隐藏键盘
			deactivate() {
				this.visible = false;
				setTimeout(() => {
					this.showKeyboard = false
				}, 250)
			}
		},
		watch: {
			lowercase(val) {
				let [...temp] = this.lines;
				temp.forEach(line => {
					line.forEach((letter, index) => {
						line[index] = val ? letter.toLowerCase() : letter.toUpperCase();
					});
				});
				this.lines = temp;
			},
			visible(val) {
				this.cls = val ? 'slideup' : 'slidedown';
			}
		},
		created() {
			this.lines = this.disorderly ? disorder() : order;
			this.digits = this.disorderly ? digits() : natural;
		}
	}
</script>

<style lang="scss" scoped>
	@import './css.scss'; //引入键盘样式
	@import './icon.css'; //引入键盘icon

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 40upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.enl-size {
		font-size: 40rpx;
	}

	.enl-key-button {
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;
		border: 1px solid #e6e6e6;
		color: #333;
		background-color: #fff;
		box-shadow: 0 2px 2px rgba(230, 230, 230, .7);
		border-radius: 0.35em;
		text-align: center;
		white-space: nowrap;
		user-select: none;
		cursor: pointer;

		&:active {
			background: #d6d6d6;
			scale: 0.7;
		}
	}

	.v-keyboard {
		transform: translateY(100%);
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background: #f5f5f5;
		padding: .5em 0;
		z-index: 100;

		/*全键盘*/
		.full-keyboard {
			.line {
				text-align: center;

				&:not(:last-child) {
					margin-bottom: 0.5em;
				}

				.enl-letter {
					height: 1.7em;
					line-height: 1.7em;
					font-size: 1em;

					&:not(:last-child) {
						margin-right: 0.12em;
						// margin-right: 0.2em;
					}
				}

				.normal {
					// width: 1.73em;
					width: 1.65em;
				}

				.special-key {
					width: 2.6em;
				}
			}

			.special-line {
				padding: 0 0.35em;
				display: flex !important;
				justify-content: space-around;

				.space {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.swith-key {
					width: 2.6em;
				}

				.enl-logo {
					font-size: 30rpx;
				}
			}
		}

		/*数字键盘*/
		.digit-keyboard {
			display: flex;
			flex-direction: row;
			font-size: 38rpx;

			.digit-button-box {
				padding: 0 .35em;
				flex: 80;

				.enl-digit {
					width: 4.46em;
					height: 2.5em;
					line-height: 2.5em;
					margin-bottom: .35em;

					&:nth-child(10),
					&:nth-child(11),
					&:nth-child(12) {
						margin-bottom: 0;
					}

					&:not(:last-child) {
						margin-right: .35em;
					}
				}
			}

			.special-button-box {
				flex: 20;
				padding: 0 .35em 0 0;

				.special-button {
					display: block;
					line-height: 5.5em;
					height: 5.5em;
					width: 4em;

					&:not(:last-child) {
						margin-bottom: .35em;
					}
				}
			}
		}

		.enl-gray {
			background: #e1e1e1 !important;

			&:active {
				background: #fff !important;
			}
		}

		.enl-large {
			font-size: 2em !important;
		}

		.enl-middle {
			font-size: 1.2em !important;
			display: block;
		}
	}
</style>
