mkApp.view('v01', function(ctrl) {
	var debug = mkApp.service('debug'),
	firebase = mkApp.service('firebase');
	firebase.authState(function(user) {
		debug.log(ctrl, 'authstate', user);
	});

	ctrl.onCreate(function(vo) {
		debug.log(ctrl, firebase);
		ctrl.bind();
	});

	ctrl.addEvent('google', function() {return{
		click: function(ob, ev) {
			firebase.google();
		}
	};}).addEvent('logout', function() {return{
		click: function(ob, ev) {
			firebase.signOut();
		}
	};});

	ctrl.addEvent('dbSet', function() {return{
		click: function(ob, ev) {
			firebase.dbSet('testApp/temp', {a:1, b:2}).then(function(vl) {
				debug.log(ctrl, 'set', vl);
			});
		}
	};}).addEvent('dbPush', function() {return{
		click: function(ob, ev) {
			firebase.dbPush('testApp/temp', {a:1, b:2}).then(function(vl) {
				debug.log(ctrl, 'dbPush', vl);
			});
		}
	};}).addEvent('dbOn', function() {return{
		click: function(ob, ev) {
			firebase.dbOn('testApp', function(vl) {
				debug.log(ctrl, 'dbOn', vl);
			});
		}
	};}).addEvent('dbOnce', function() {return{
		click: function(ob, ev) {
			firebase.dbOnce('testApp').then(function(vl) {
				debug.log(ctrl, 'dbOnce', vl);
			});
		}
	};});

	var msgTocken;
	ctrl.addEvent('msgSend', function() {return{
		click: function(ob, ev) {
			debug.log(ctrl, msgTocken);
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			// 참고자료...
			// Authorization 어떻게 받야야 하나?
			// 스크립트로 안되는거 같은 서버단에서 해야 되는 거 같음
			// https://firebase.google.com/docs/cloud-messaging/auth-server?hl=ko
			// 구글 api 사용을위한 라이브러리
			// https://developers.google.com/api-client-library/php/start/get_started?hl=ko
			// https://fcm.googleapis.com/v1/projects/rgttest-915b9/messages:send HTTP/1.1
			// myHeaders.append("Authorization", 'Bearer ' + );
			myHeaders.append("Authorization", 'key=AIzaSyAEmPHusKEIAF8CIh7FqUzrvuR62aRFVMI');
			
			fetch('https://fcm.googleapis.com/fcm/send', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Authorization": 'key=AIzaSyAEmPHusKEIAF8CIh7FqUzrvuR62aRFVMI'
				},
				body: JSON.stringify({
					"to" : msgTocken,
					"data" : {
						'title': 'Portugal vs. Denmark',
						'body': '5 to 1',
						'icon': 'firebase-logo.png',
						'click_action': 'http://localhost:9090/ko'
					}
				})
			}).then(function(res) {
				console.log(res);
				res.text().then(function(txt) {
					console.log('txt', txt);
				});
				// res.json().then(function(json) {
				// 	debug.log('rs', json);
				// });
			}).catch(function(err) {
				debug.err('fetch', err);
			});
		}
	};});


	ctrl.onLoad(function() {
		debug.log(ctrl, 'onload');
	});

	firebase.messaging.usePublicVapidKey("BKvsrTMM1ykn8oamrgOToUQJGNwVEBhiAjFdJ1gFOmyUVaukZkW8vnd-pYw3eDrL3qHiVmtgHCBMfFUW9slfIcE");


	// https://github.com/firebase/quickstart-js/tree/master/messaging

	// [START request_permission]
	firebase.messaging.requestPermission().then(function() {
		console.log('Notification permission granted.');
		// TODO(developer): Retrieve an Instance ID token for use with FCM.
		resetUI();
	}).catch(function(err) {
		console.log('Unable to get permission to notify.', err);
	});
	// [END request_permission]



	// [START refresh_token]
	firebase.messaging.onTokenRefresh(function() {
		console.log('onTokenRefresh');
		firebase.messaging.getToken().then(function(currentToken) {
			console.log('currentToken', currentToken);
			if (currentToken) {
			} else {
				// Show permission request.
				console.log('No Instance ID token available. Request permission to generate one.');
			}				
		}).catch(function(err) {
			console.log('An error occurred while retrieving token. ', err);
		});
	});
	// [END refresh_token]

	// [START receive_message]
	firebase.messaging.onMessage(function(payload) {
		console.log('Message received. ', payload);
	});
	// [END receive_message]


	function resetUI() {
		firebase.messaging.getToken().then(function(currentToken) {
			console.log('resetUI::currentToken', currentToken);
			console.log(currentToken);
			msgTocken = currentToken;
			if (currentToken) {
			} else {
			  // Show permission request.
			  console.log('resetUI', 'No Instance ID token available. Request permission to generate one.');
			  // Show permission UI.
			}
		}).catch(function(err) {
			console.log('resetUI', 'An error occurred while retrieving token. ', err);
		});
	}
});