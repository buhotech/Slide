const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);
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

app.post('/lilchat/chats/create', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

app.post('/lilchat/chats/:id/join', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

app.get('/lilchat/chats/:id/chat_info', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

app.get('/lilchat/chats/:id/members', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

app.get('/lilchat/chats/:id/messages', (req, res) => {
  const reference = `/lilchat/chats/${req.params.id}/messages`;

  admin
    .database()
    .ref(reference)
    .on('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});
app.post('/lilchat/chats/:id/messages/new', (req, res) => {
  const reference = `/lilchat/chats/${req.params.id}/messages`;

  const message_object = {
    content: req.body.content,
    username: req.body.username,
    time: '0:00AM'
  };

  admin
    .database()
    .ref(reference)
    .push()
    .set(message_object);
  res.json({ status: 'success' });
});

/*PROFILE/USERS*/
app.get('/lilchat/users/:id/user_info/', (req, res) => {
  const reference = `lilchat/users/${req.params.id}/user_info`;
  admin
    .database()
    .ref(reference)
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

/*FRIENDS*/
app.get('/lilchat/users/:id/friends/', (req, res) => {
  const reference = `lilchat/users/${req.params.id}/friends`;

  admin
    .database()
    .ref(reference)
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});
app.get('/lilchat/users/:id/request_sent/new', (req, res) => {
  const my_user_id = req.params.id;

  const reference = `lilchat/users/${my_user_id}/request_sent`;
  const { other_user } = req.body;
  const other_user_reference = `/users/${other_user}/request_recieved`;

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
app.get('/lilchat/users/:id/request_recieved/', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});
app.post('/lilchat/users/:id/request_recieved/:other_user/accept', (req, res) => {
  //move from request_recieved to firneds list
  //from from request sent to friends

  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});
app.get('/lilchat/users/:id/request_recieved/:other_user/decline', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

app.get('/lilchat/users/:id/request_recieved/:other_user/block', (req, res) => {
  admin
    .database()
    .ref('')
    .once('value', snap => {
      if (snap.val() == null) {
        res.json(null);
      } else {
        res.json(snap.val());
      }
    });
});

exports.slide = functions.https.onRequest(app);
