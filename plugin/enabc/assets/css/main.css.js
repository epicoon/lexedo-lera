#lx:use #lx:php(\lx::$app->assets->getCssColorSchema());
#lx:use lx.MainCssContext;

cssContext.addClass('leraenabc-box', {
	borderRadius: borderRadius,
	boxShadow: '0 0px '+shadowSize+'px rgba(0,0,0,0.5)',
	backgroundColor: 'mediumturquoise'
});

cssContext.addAbstractClass('letter', {
	textShadow: '0 1px 0 #CAC8C8,'
		+ '0 2px 0 #C7C5C5,'
		+ '0 3px 0 #BBBABA,'
		+ '0 4px 0 #B7B6B6,'
		+ '0 5px 0 #A9A6A6,'
		+ '0 6px 1px rgba(0,0,0,.2),'
		+ '0 0 5px rgba(0,0,0,.1),'
		+ '0 1px 3px rgba(0,0,0,.1),'
		+ '0 3px 5px rgba(0,0,0,.1),'
		+ '0 5px 10px rgba(0,0,0,.2),'
		+ '0 10px 10px rgba(0,0,0,.3),'
		+ '0 20px 20px rgba(0,0,0,.1)'
});

cssContext.inheritClass('leraenabc-vowel', 'letter', {
	color: 'red'
});
cssContext.inheritClass('leraenabc-consonant', 'letter', {
	color: 'blue'
});

function icon(code) {
	return [code, {fontSize: 10, paddingTop: '4px'}];
}
cssContext.inheritClasses({
	'leraenabc-box-rand' : { backgroundColor: checkedMainColor, '@icon': icon('\\21D1') },
	'leraenabc-box-chose': { backgroundColor: neutralMainColor, '@icon': icon('\\21BB') }
}, 'ActiveButton');

return cssContext.toString();
