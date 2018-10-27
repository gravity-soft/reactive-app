mkApp.init(function() {
	var config = {};
	config.style = [
		'body {color:#111;}',
		'[data-app-modal] {position:absolute; width:100%;}',
		'[data-app-modal-layout] {width:80%; margin-left:10%; margin-top:10%; background:#fff;}',
		'[data-app-modaless] {position:fixed; bottom:0; width:100%; max-height:50vh;}',
		'[data-app-modaless-layout] {width:100%; background:#ffa;}',
		'@keyframes modalopen {0%{margin-top:-20%; opacity:0;}}',
		'@keyframes modalclose {100%{margin-top:-20%; opacity:0;}}',
		'@keyframes modalessopen {0%{max-height:0;}}',
		'@keyframes modalessclose {100%{margin-top:-20%; opacity:0;}}',
		'@media (min-width: 780px) {',
			'[data-app-modal-layout] {margin-left: calc((100% - 800px) / 2); width:750px;}',
			'[data-app-modaless-layout] {margin-top:-30px; margin-left:calc(100% - 765px); width:750px;}',
		'}'
	];
	config.popup = {
		modal: {
			open: 'animation:modalopen 1s 1;',
			close: 'animation:modalclose 1s 1;',
			bgStyle: 'position:absolute; width:100%; height:100vh; background:#000; opacity:.8;',
			bgHtml: ''
		},
		modaless: {
			open: 'animation:modalessopen 1s 1;',
			close: 'animation:modalessclose 1s 1;'
		}
	};
	config.alert = {
		html: ['<div data-app-modal-layout>',
			'<div data-bind="html:vo.msg">msg</div>',
			'<button data-bind="text:vo.ok, event:on.ok, focus">ok</button>',
		'</div>'],
		btnOk: '확인'
	};
	config.confirm = {
		html: ['<div data-app-modal-layout>',
			'<div data-bind="html:vo.msg">msg</div>',
			'<button data-bind="text:vo.yes, event:on.yes, focus">yes</button>',
			'<button data-bind="text:vo.no, event:on.no">no</button>',
		'</div>'],
		btnYes: '예',
		btnNo: '아니오'
	};
	config.toast = {
		html: ['<div data-app-modaless-layout>',
			'<div data-bind="html:vo.msg"></div>',
		'</div>'],
		time: 3000
	};

	return config;
});
