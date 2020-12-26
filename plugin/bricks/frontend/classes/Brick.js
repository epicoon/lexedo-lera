class Brick extends lx.BindableModel #lx:namespace LeraGames.bricks {
	#lx:schema
		text,
		color;

	constructor(elem) {
		super();
		this.elem = elem;
		this.text = elem.text();
		this.color = elem.style('background-color');
	}
}

LeraGames.bricks.Brick.afterSet('text', function(value){
	this.elem.text(value);
});

LeraGames.bricks.Brick.afterSet('color', function(value){
	this.elem.fill(value);
});
