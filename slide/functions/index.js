'use strict';
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

/*
app.get('/events/', function(req,res){
	let reference = "/events/";
	admin.database().ref(reference).once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
});
*/

function verify(idToken, do_this) {
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;

      console.log(uid);
      do_this(uid);

      // ...
    })
    .catch(function(error) {
      // Handle error
      console.log(error);
      res.status(400).json({ status: 'error' });
    });
}

app.post('/lilchat/users/new', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let username = req.body.username;
    let bio = req.body.bio;

    let reference = 'lilchat/users/';
    let user = {
      user_info: {
        username: username,
        bio: bio
      }
    };
    admin
      .database()
      .ref(reference)
      .child(uid)
      .set(user);
    res.json({ status: 'success' });
  });
});

app.post('/lilchat/chats/create', function(req, res) {
  admin
    .database()
    .ref('')
    .once('value', function(snap) {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

app.post('/lilchat/chats/:id/join', function(req, res) {
  let reference = '/lilchat/chats/' + req.params.id + '/';
  let u_ref_id = req.body.user_id;
  let uid = 'someuid';

  admin
    .database()
    .ref(reference)
    .child(uid)
    .set(req.body.u_ref_id);
  res.json({ status: 'success' });
});

app.get('/lilchat/chats/:id/chat_info', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    admin
      .database()
      .ref('')
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

app.get('/lilchat/chats/:id/chat_info/members', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = '/lilchat/chats/' + req.params.id + '/chat_info/members';
    admin
      .database()
      .ref(reference)
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

app.get('/lilchat/chats/:id/messages', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = '/lilchat/chats/' + req.params.id + '/messages';

    admin
      .database()
      .ref(reference)
      .on('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});
app.post('/lilchat/chats/:id/messages/new', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = '/lilchat/chats/' + req.params.id + '/messages';
    let reference_characters = '/lilchat/chats/' + req.params.id + '/chat_info/characters';

    let message_object = {
      content: req.body.content,
      username: req.body.username,
      time: '0:00AM'
    };
    admin
      .database()
      .ref(reference_characters)
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          admin
            .database()
            .ref(reference)
            .push()
            .set(message_object);
          admin
            .database()
            .ref(reference_characters)
            .set(snap.val() - req.body.content.length);
        }
      });

    res.json({ status: 'success' });
  });
});

/*PROFILE/USERS*/
app.get('/lilchat/users/:id/user_info/', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = 'lilchat/users/' + req.params.id + '/user_info';
    admin
      .database()
      .ref(reference)
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

/*FRIENDS*/
app.get('/lilchat/users/:id/friends/', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = 'lilchat/users/' + req.params.id + '/friends';

    admin
      .database()
      .ref(reference)
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

app.get('/lilchat/users/random_id', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = 'lilchat/users/';
    admin
      .database()
      .ref(reference)
      .once('value')
      .then(function(snap) {
        let count = snap.numChildren();
        let random = Math.floor(Math.random() * Math.floor(count));
        console.log(random);

        let users = Object.keys(snap.val())[random];
        res.json(users);
      });
  });
});

app.get('/lilchat/users/:id/request_sent/new', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let my_user_id = req.params.id;

    let reference = 'lilchat/users/' + my_user_id + '/request_sent';
    let other_user = req.body.other_user;
    let other_user_reference = '/users/' + other_user + '/request_recieved';

    admin
      .database()
      .ref(reference)
      .push()
      .set(req.body.other_user);
    admin
      .database()
      .ref(other_user_reference)
      .push()
      .set(my_user_id);
  });
});
app.get('/lilchat/users/:id/request_recieved/', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    admin
      .database()
      .ref('')
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});
app.post('/lilchat/users/:id/request_recieved/:other_user/accept', function(req, res) {
  //move from request_recieved to firneds list
  //from from request sent to friends
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    admin
      .database()
      .ref('')
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

app.get('/lilchat/users/:id/request_recieved/:other_user/decline', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    admin
      .database()
      .ref('')
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

app.get('/lilchat/users/:id/request_recieved/:other_user/block', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    admin
      .database()
      .ref('')
      .once('value', function(snap) {
        if (snap.val() == null) {
          res.json(null);
        } else {
          res.json(snap.val());
        }
      });
  });
});

exports.slide = functions.https.onRequest(app);
