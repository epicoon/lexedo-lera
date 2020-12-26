/**
 * @const {lx.Plugin} Plugin
 * @const {lx.Snippet} Snippet
 */


#lx:use lx.Image;



var voices = window.speechSynthesis.getVoices();
setTimeout(function() { voices = speechSynthesis.getVoices(); }, 1000);


var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var vowels = 'AEIOUY'.split('');


var box = new lx.Box({
    geom: true
});


box.streamProportional({
    indent: '10px'
});

var numbers = box.add(lx.Box, {key:'numbers', css:'leraenabc-box'});
var letters = box.add(lx.Box, {key:'letters', css:'leraenabc-box', height: 6});

numbers.slot({
    indent: '10px',
    cols: 10,
    rows: 1
});

var numbersList = #lx:load(schemas/numbers.yaml);
numbersList.list.each((item, i)=>{
	var box = numbers.child(i);
	box.addClass('lx-Button');

	box.gridProportional();
	var num = box.add(lx.Box, {geom: [0, 0, 5, 5]});
	var numName = box.add(lx.Box, {geom: [5, 0, 7, 5]});
	var colorName = box.add(lx.Box, {geom: [0, 5, 12, 1]});

	num.text(item.number).align(lx.CENTER, lx.MIDDLE);
	num->text.style('fontSize', '40px');
	numName.text(item.word).align(lx.LEFT, lx.MIDDLE);
	colorName.text(item.color).align(lx.CENTER, lx.MIDDLE);

	box.style({
		backgroundColor: item.color,
		color: item.textColor
	});
});







letters.slot({
    indent: '10px',
    cols: 6,
    k: 1.5
});
letters.add(lx.Box, 26, {});


class Dictonary #lx:namespace lera.enabc {
	constructor(context) {
		this.context = context;
		this.dict = {};
	}

	add(data) {
		if (!(data.letter in this.dict)) {
			this.dict[data.letter] = [];
			this.context.tablet.set(data.letter, data);
		}

		this.dict[data.letter].push(data);
	}

	getRand(currentModel) {
		var letter = currentModel.letter;
		if (this.dict[letter].len == 1) return this.dict[letter];

		var arr = [];
		this.dict[letter].each(item=>{
			if (item.word == currentModel.word) return;
			arr.push(item);
		});

		if (arr.len == 1) return arr[0];

		var i = lx.Math.randomInteger(0, arr.len - 1);
		return arr[i];
	}
}

class Word extends lx.BindableModel #lx:namespace lera.enabc {
	#lx:schema
		letter,
		word,
		translation,
		picture;
}

class Tablet #lx:namespace lera.enabc {
	constructor(context) {
		this.context = context;
		this.map = {};
	}

	set(letter, data) {
		if (letter in this.map) {
			this.map[letter].letter = data.letter;
			this.map[letter].word = data.word;
			this.map[letter].translation = data.translation;
			this.map[letter].picture = data.picture;
		} else {
			this.map[letter] = new lera.enabc.Word(data);
		}
	}

	get(letter) {
		return this.map[letter];
	}
}


const context = {};
context.dict = new lera.enabc.Dictonary(context);
context.tablet = new lera.enabc.Tablet(context);


var wordsList = #lx:load(schemas/words.yaml);
wordsList.list.each(item=>{
	var data = {
		letter: item[0][0].toUpperCase(),
		word: item[0],
		translation: item[1],
		picture: item[2]
	};

	context.dict.add(data);
});




letters.getChildren().each((c, i)=>{
	var letter = abc[i];
	var model = context.tablet.get(letter);

	c.addClass('lx-Button');
	c.gridProportional({indent: '2px'});

	var l = c.add(lx.Box, {geom:[0, 0, 5, 2]});
	l.align(lx.CENTER, lx.MIDDLE);

	var pWrap = c.add(lx.Box, {geom:[5, 0, 7, 3]});
	pWrap.align(lx.CENTER, lx.MIDDLE);

	var buts = c.add(lx.Box, {geom:[0, 2, 5, 1]});
	buts.slot({cols: 2, rows: 1, step:'5px'});
	buts.child(0).addClass('leraenabc-box-rand');
	buts.child(1).addClass('leraenabc-box-chose');
	initButs(buts.child(0), buts.child(1), letter);

	// Bind
	l.setField('letter', function(letter) {
		this.text(letter);
		this->text.style('fontSize', '50px');
		this.addClass(vowels.contains(letter) ? 'leraenabc-vowel' : 'leraenabc-consonant');
	});
	pWrap.setField('picture', function(pic) {
		this.del('pic');
		var p = this.add(lx.Image, {key:'pic', filename:pic});
		p.adapt();
	});
	c.bind(model);

	l.click(()=>sayEn(model.letter));
	pWrap.click(()=>sayEn(model.word));
});



function sayEn(text) {
	var utterance = new SpeechSynthesisUtterance();
	utterance.lang = 'en-UK';
	utterance.text = text;
	utterance.volume = 10;
	utterance.pitch = 1;
	utterance.rate = 0.3;

	utterance.voice = speechSynthesis.getVoices().filter(function(voice) {
		return voice.name == 'Google UK English Male';
	})[0];

	speechSynthesis.cancel();
	speechSynthesis.speak(utterance);
}





class ChoseForm #lx:namespace lera.enabc {
	constructor() {
		this.box = new lx.Box({geom:true});
		this.box.hide();

		this.box.add(lx.Box, {geom:true, style:{fill:'black', opacity:0.5}, click:()=>this.close()});
		this.formWrapper = this.box.add(lx.Box, {geom:[20, 15, 60, 60], key:'form'});
		this.formWrapper.addClass('lx-Box');
		this.formWrapper.style('overflow', 'auto');
		this.form = this.formWrapper.add(lx.Box, {geom:[0, 0, 100, 'auto']});
		this.form.grid({
			indent: '10px',
			cols: 4,
			height: '200px'
		});
	}

	open(list) {
		list.each(item=>{
			let box = this.form.add(lx.Box);
			box.addClass('lx-Button');
			var p = box.add(lx.Image, {filename:item.picture});
			p.adapt();
			box.align(lx.CENTER, lx.MIDDLE);
			box.data = item;
			box.click(()=>{
				context.tablet.set(box.data.letter, box.data);
				this.close();
			});
		});
		this.box.show();
	}

	close() {
		this.box.hide();		
		this.form.clear();
	}
}

context.choseForm = new lera.enabc.ChoseForm();




function initButs(randBut, choseBut, letter) {
	if (context.dict.dict[letter].len == 1) {
		randBut.disabled(true);
		choseBut.disabled(true);
		return;
	}

	randBut.letter = letter;
	choseBut.letter = letter;
	randBut.click(function() {
		var currentModel = context.tablet.get(this.letter);
		var newData = context.dict.getRand(currentModel);
		context.tablet.set(this.letter, newData);
	});

	choseBut.click(function() {
		var list = context.dict.dict[this.letter];
		context.choseForm.open(list);
	});
}


