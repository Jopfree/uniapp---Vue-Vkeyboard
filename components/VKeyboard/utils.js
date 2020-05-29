//所有自然数
export const natural = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];
//所有英文字母
export const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
	'v', 'w', 'x', 'y', 'z'
];

//顺序排序全键盘
export const order = [
	['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

//随机排序全键盘
export const disorder = () => {
	let lines = [10, 9, 7];
	let array = [];
	array.push(digits());

	let [...temp] = chars;

	const random = (length) => {
		let randoms = [];
		for (let i = 0; i < length; i++) {
			let index = Math.floor(Math.random() * temp.length);
			randoms.push(temp[index]);
			temp.splice(index, 1);
		}
		return randoms;
	};

	for (let i = 0; i < lines.length; i++) {
		array.push(random(lines[i]));
	}
	return array;
};

//所有符号
export const symbols = [
	['~', '`', '!', '@', '#', '$', '%', '^', '&', '*'],
	['(', ')', '-', '+', '=', '{', '}', '[', ']'],
	['_', '|', '\\', ':', ';', '\'', '<', ',', '>'],
	['"', '?', '.', '/', '€', '￡', '¥']
];

//所有数字
export const digits = () => {
	let [...temp] = natural;
	return temp.sort(function() {
		return Math.random() > 0.5 ? -1 : 1; //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
	});
};

//键盘模式
export const KEYBOARD_MODE = {
	SYMBOL: 'symbol', //符号键盘
	DIGIT: 'digit', //数字键盘
	LETTER: 'letter' //字母键盘
};
