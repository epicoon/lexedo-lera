/**
 * @const {lx.Plugin} Plugin
 * @const {lx.Snippet} Snippet
 */

#lx:require classes/;

#lx:use lx.Button;
#lx:use lx.Input;

document.oncontextmenu = function() { return false; };

var b = new lx.Button({
	geom: [3, 3, 10, 4],
	text: 'Next',
	click: function() {
		createBox('40px', '40px', LeraGames.bricks.RandCore.getLetter());
	}
});

var b = new lx.Button({
	geom: [3, 8, 10, 4],
	text: 'Next',
	click: function() {
		createBox('80px', '40px');
	}
});


var brickBox = new lx.ActiveBox({
	header: 'Brick',
	geom: [88, 2, 10, 12]
});
brickBox.border();
var grid = brickBox.add(lx.Box, {geom:true});
grid.gridProportional({indent:'10px', cols:1});
grid.add(lx.Input, {field:'text'});
grid.add(lx.Input, {field:'color'});
























/*
// Пожаротушение
var truck = new lx.Box({
	geom: [80, 40, 5, 7]
});
truck.picture('fire_truck.png');
truck.move();


var house = new lx.Box({
	geom: [20, 20, 15, 21]
});
house.picture('house.png');
var houseN = new lx.Box({
	geom: [35, 28, 6, 8]
});
houseN.fill('lightgray');



var fire = new lx.Box({
	geom: [0, 0, 7, 14]
});
fire.picture('fire.png');
var fireSize = 1;
var fireLimit = 7;

function locFire() {
	var hT = house.top('px');
	var hL = house.left('px');
	var hW = house.width('px');
	fire.top( (hT - fire.height('px') + 88) + 'px' );
	fire.left( (hL + (hW - fire.width('px'))*0.5) + 'px' );
}
locFire();


function checkTruck() {
	var tL = truck.left('px');
	var tT = truck.top('px');
	var tW = truck.width('px');
	var tH = truck.height('px');
	var hL = houseN.left('px');
	var hT = houseN.top('px');
	var hW = houseN.width('px');
	var hH = houseN.height('px');

	return (
		tL >= hL
		&& tT >= hT
		&& (tL + tW) <= (hL + hW)
		&& (tT + tH) <= (hT + hW)
	);
}

truck.on('move', ()=>{
	if (checkTruck()) houseN.fill('lightgreen');
	else houseN.fill('lightgray');
});


function salut() {
	var salut = new lx.Box({
		geom: [21, 10, 20, 40]
	});
	salut.picture('salut.gif');
}

fire.click(fixFire);
house.click(fixFire);

function fixFire() {
	if (!checkTruck()) return;

	fireSize *= 0.9;
	fireLimit--;
	if (fireLimit == 0) {
		salut();
		fire.del();
		return;
	}

	var w = Math.ceil(fire.width('px') * fireSize);
	var h = Math.ceil(fire.height('px') * fireSize);
	fire.width(w + 'px');
	fire.height(h + 'px');
	locFire();
}
/**/













//экспериментировал с изменением родителя, всё работает
// var ee = new lx.Box({
// 	geom: [40, 40, 40, 40]
// });
// ee.border();
// var el = createBox('40px', '40px');
// new lx.Button({
// 	geom: [3, 13, 10, 4],
// 	click: function() {
// 		el.setParent(ee);
// 		el.move(false);
// 	}
// });










function createBox(w, h, letter) {
	var el = new lx.Box({
		geom: [15, 3, w, h]
	});
	el.border();
	el.fill(LeraGames.bricks.RandCore.getColor());
	el.move({
		moveStep: 10
	});

	if (letter) el.text(letter);

	el.style({
		color: 'white',
		fontSize: '25px',
		fontWeight: 'bold',
		textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
	})
	el.align(lx.CENTER, lx.MIDDLE);
	el.style('cursor', 'move');

	el.brick = new LeraGames.bricks.Brick(el);
	el.click(function() {
		this.brick.bind(brickBox);
	});

	return el;
}




