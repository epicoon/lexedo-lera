class RandCore #lx:namespace LeraGames.bricks {
	static getLetter() {
		var letters = [
			'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
			'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
		];
		var lettersCount = letters.len;
		return letters[lx.Math.randomInteger(0, lettersCount - 1)];
	}

	static getColor() {
		var colors = [
			'red',
			'yellow',
			'blue',
			'green',
			'lightgreen',
			'brown',
			'gray',
			'lightgray',
			'#FF1493'
		];
		var colorsCount = colors.len;
		return colors[lx.Math.randomInteger(0, colorsCount - 1)];
	}
}
