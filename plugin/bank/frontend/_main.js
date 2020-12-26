/**
 * @const {lx.Plugin} Plugin
 * @const {lx.Snippet} Snippet
 */


var bank = new lx.Box({
	geom: [10, 10, 20, 20]
});
bank.picture('band-inf.jpg');


var bank2 = new lx.Box({
	geom: [70, 10, 20, 20]
});
bank2.picture('bank.png');

var bank3 = new lx.Box({
	geom: [70, 70, 20, 20]
});
bank3.picture('BANK.jpg');



var car = new lx.Box({
	geom: [5, 35, 10, 10]
});
car.picture('police.jpg');
car.move();
var car2 = new lx.Box({
	geom: [5, 50, 10, 10]
});
car2.picture('police2.jpg');
car2.move();
var car3 = new lx.Box({
	geom: [20, 50, 10, 10]
});
car3.picture('police_car.png');
car3.move();





var rog1 = new lx.Box({
	geom: [40, 20, 6, 10]
});
rog1.picture('rog.jpg');
rog1.move();

var rog3 = new lx.Box({
	geom: [40, 35, 6, 10]
});
rog3.picture('rog3.jpg');
rog3.move();

var rog2 = new lx.Box({
	geom: [40, 50, 6, 10]
});
rog2.picture('rog2.jpg');
rog2.move();




var shacle = new lx.Box({
	geom: [10, 70, 5, 5]
});
shacle.picture('shacle.png');
shacle.move();


var shacle2 = new lx.Box({
	geom: [10, 80, 5, 5]
});
shacle2.picture('shacle.png');
shacle2.move();


var shacle3 = new lx.Box({
	geom: [10, 90, 5, 5]
});
shacle3.picture('shacle.png');
shacle3.move();





var directions = [
	'up',
	'down',
	'left',
	'right',
	'up-left',
	'up-right',
	'down-left',
	'down-right'
];
function getRandDirection() {
	var rand = lx.Math.randomInteger(0, directions.len - 1);
	return directions[rand];
}

var step = 20;

class Mover extends lx.Timer {
	constructor(owner) {
		super();
		this.counterOn = false;
		this.periodDuration = 10;
		this.onCycleEnds(this.step);

		this.owner = owner;
		this.isMoving = false;
		this.owner.click(()=>{
			if (this.isMoving) this.__stop();
			else this.__move();
		});
	}

	step() {
		var dirs = getRandDirection().split('-');
		for (var i=0, l=dirs.len; i<l; i++) {
			var dir = dirs[i];

			switch (dir) {
				case 'up':
					this.owner.top( this.owner.top('px') - step + 'px' );
					break;
				case 'down':
					this.owner.top( this.owner.top('px') + step + 'px' );
					break;
				case 'left':
					this.owner.left( this.owner.left('px') - step + 'px' );
					break;
				case 'right':
					this.owner.left( this.owner.left('px') + step + 'px' );
					break;
			}
		}

		if (this.owner.isOutOfParentScreen()) this.owner.returnToParentScreen();
	}

	__stop() {
		this.stop();
		this.isMoving = false;
	}

	__move() {
		this.start();
		this.isMoving = true;
	}
}


var mover1 = new Mover(rog1);
var mover2 = new Mover(rog2);
var mover3 = new Mover(rog3);



