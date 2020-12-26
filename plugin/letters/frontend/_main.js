/**
 * @const {lx.Plugin} Plugin
 * @const {lx.Snippet} Snippet
 */

const glas = [
	'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'
];
const soglas = [
	'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 
	'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 
	'Щ'//, 'Ъ', 'Ь'
];
const soglasForSyllable = [
	'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'К', 'Л', 'М', 'Н',
	'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ',
];

var stream = new lx.Box({geom:true});
stream.streamProportional({indent: '10px'});
stream.begin();
	var agreg = new lx.Box({ height:1  });
	var work = new lx.Box({ height:10 });
	var gl   = new lx.Box({ height:1  });
	var sogl = new lx.Box({ height:2  });
stream.end();
stream.getChildren().each(child=>{
	child.addClass('area');
});

agreg.streamProportional({
	direction: lx.HORIZONTAL,
	indent: '10px'
});
agreg.begin();
	var play = new lx.Box({ width:1 });
	var agregText = new lx.Box({ width:15 });
	var clear = new lx.Box({ width:1 });
agreg.end();
play.fill('green');
clear.fill('red');
agregText.fill('white');
agregText.align(lx.CENTER, lx.MIDDLE);
clear.click(()=>{
	agregText.text('');
});
play.click(()=>{
	say(agregText.text());
});

gl.slot({
	indent: '10px',
	cols: 10,
	rows: 1
});
gl.getChildren().each((child, i)=>{
	child.text(glas[i]);
	child->text.adapt();
	child.addClass('glas');
	child.click(clickGlas);
});

sogl.slot({
	indent: '10px',
	cols: 12,
	rows: 2
});
sogl.getChildren().each((child, i)=>{
	if (i < soglas.len) {
		child.text(soglas[i]);
		child->text.adapt();
		child.addClass('soglas');
		child.click(clickSoglas);
	}
});


function clickGlas() {
	var letter = this.text();
	var syllables = [];
	for (var i=0, l=soglasForSyllable.len; i<l; i++)
		syllables.push(soglasForSyllable[i] + letter);
	renewSyllablesField(syllables);
}

function clickSoglas() {
	var letter = this.text();
	var syllables = [];
	for (var i=0, l=glas.len; i<l; i++)
		syllables.push(letter + glas[i]);
	renewSyllablesField(syllables);
}

function renewSyllablesField(syllables) {
	if (work.contains('syllablesField'))
		work.del('syllablesField');

	var rowsCount = Math.round(syllables.len / 5);
	var field = new lx.Box({
		parent: work,
		key: 'syllablesField',
		geom: true
	});
	field.slot({
		indent: '10px',
		cols: 5,
		rows: rowsCount
	});
	field.getChildren().each((child, i)=>{
		var textBox = child.add(lx.Box, {geom: true, key: 'textBox'});
		textBox.text(syllables[i]);
		textBox.align(lx.CENTER, lx.MIDDLE);
		textBox.addClass('syllable');
		textBox.click(clickSyllable);
		var butBox = child.add(lx.Box, {geom: [60, 0, 40, 100], key: 'butBox'});
		var but = butBox.add(lx.Box, {size: ['25px', '25px'], key: 'textBut'});
		butBox.align(lx.CENTER, lx.MIDDLE);
		but.fill('blue');
		but.style('cursor', 'pointer');
		but.click(clickSyllableBut);
	});
}

function clickSyllableBut() {
	var syllable = this~>textBox.text();
	say(syllable);
	agregText.text( agregText.text() + ' ' + syllable );
}

function clickSyllable() {
	var syllable = this.text();
	say(syllable);
}


var voices = window.speechSynthesis.getVoices();
setTimeout(function() { voices = speechSynthesis.getVoices(); }, 1000);

function say(text) {
	var utterance = new SpeechSynthesisUtterance();
	utterance.lang = 'ru-RU';  
	utterance.text = text;
	utterance.volume = 10;
	utterance.pitch = 1;
	utterance.rate = 0.3;

	utterance.voice = speechSynthesis.getVoices().filter(function(voice) {
		return voice.name == 'Google русский';
	})[0];

	speechSynthesis.cancel();
	speechSynthesis.speak(utterance);
}

