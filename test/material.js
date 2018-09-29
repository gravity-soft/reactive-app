mk.main('/reactive-app/test/tpl/main.html', function(ctrl) {
	var mdc = mk.service('material');

	mk.loadComponent = [
		{name:'drawerSide', tpl:'/reactive-app/test/tpl/drawer-side.html'},
		{name:'drawerHeader', tpl:'/reactive-app/test/tpl/drawer-header.html'},
		{name:'drawerBottom', tpl:'/reactive-app/test/tpl/drawer-bottom.html'},
		{name:'v01', tpl:'/reactive-app/test/tpl/v01.html'}
	];
	ctrl.vo = {
		mobile: false
	};
	ctrl.onload = function(prm) {
		mk.config('alert', {
			tpl: '/reactive-app/test/tpl/_alert.html',
			btnOk: '확인'
		});
		mk.config('confirm', {
			tpl: '/reactive-app/test/tpl/_confirm.html',
			btnYes: '예',
			btnNo: '아니오'
		});
		mk.config('toast', {
			tpl: '/reactive-app/test/tpl/_toast.html',
			time: 3000
		});

		ctrl.vo.mobile = mdc.getMedia() == mdc.typePhone;
	};
});

mk.component('drawerSide', function(ctrl) {
	var mdc = mk.service('material');
	ctrl.vo = {
		media: 'mdc-drawer--dismissible'
	};
	ctrl.onload = function(prm) {
		if(mdc.getMedia() == mdc.typePhone) {
			ctrl.vo.media = 'mdc-drawer--modal';
		} else {
			ctrl.vo.media = 'mdc-drawer--dismissible'; 
		}
	};
});

mk.component('drawerHeader', function(ctrl) {
	var mdc = mk.service('material');

	ctrl.onload = function() {
		setTimeout(function() {
			setWidth();
			mdc.drawer('.mdc-drawer').open = !(mdc.getMedia() == mdc.typePhone);
		});
	};
	ctrl.on.menu = function(evt) {
		setWidth();
		var drawer = mdc.drawer('.mdc-drawer');
		drawer.open = !drawer.open;
	};
	ctrl.on.write = function(evt) {
		mk.sheet('detail').isOpen && mk.sheet('detail').close();
		mk.alert('글쓰기').then(function() {
			evt.target.focus();
		});
	};

	function setWidth() {
		if(!(mdc.getMedia() == mdc.typePhone)) {
			document.body.querySelector('.mdc-top-app-bar__row').style.cssText
			= mdc.drawer('.mdc-drawer').open ? 'width:100%;' : 'width:calc(100% - 255px);';
		}
	}
});

mk.component('drawerBottom', function(ctrl) {
	ctrl.onload = function() {
	};
});

mk.component('v01', function(ctrl) {
	var mdc = mk.service('material');

	ctrl.vo = {
		list: [
			{title: 'title1', name: 'name1', date: '2018.09.29'},
			{title: 'title2', name: 'name2', date: '2018.09.29'},
			{title: 'title3', name: 'name3', date: '2018.09.29'},
			{title: 'title4', name: 'name4', date: '2018.09.29'}
		],
	};
	ctrl.onload = function() {
		setTimeout(function() {
			mdc.autoInit();
			var list = mdc.list('#bbs-list');
			list.singleSelection = true;
		});
	};
	ctrl.on.alert = function(evt) {
		mk.alert('test alert').then(function() {
			evt.target.focus();
		});
	};
	ctrl.on.test = function(evt) {
		mk.sheet('detail').open('/reactive-app/test/tpl/s01.html');
	};
});

mk.sheet('detail', function(ctrl) {
	ctrl.onload = function(prm) {
	}
	ctrl.on.close = function() {
		ctrl.close();
	};
	ctrl.on.modify = function(evt) {
		mk.alert('수정').then(function() {
			evt.target.focus();
		});
	};
	ctrl.on.remove = function(evt) {
		mk.confirm('삭제?').then(function(yes) {
			yes && (mk.toast('삭제되었습니다.'), ctrl.close());
		});
	};
});