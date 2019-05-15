'use strict';
/*
CHAT INFO SHOULD HAVE A BOOLEAN TO SAY IF ITS OVER OR NOT
IF OVER DONT ACCEPT messages


ASK FOR SIMILARITY
-->STORE USERS LIKES IN THEIR PRIVATE CHATS "ACTIVE CHATS" "INFO":DONE


-->AT 500 CHARACTERS GET ALL OF CURRENT USER AND DISPLAY THEM/ RETURN THEM INTO THE GRID
		on message/new ==> check if remaining characters - newmessagecharacter length < 500 CHARACTERS
				if so -> return list of random liked items from privatechats/uid/active_chats/chatid/likes
		ELSE
			just send the message




-->USER SELECTS ONE ITEM THEY THINK THEY HAVE IN COMMON
-->BACKEND CHECKS IF THIS ITEM IS THE ONE ASSIGNED TO THAT CHAT INSIDE CHAT SECRET
	app.post(theidofword)==>true or false if its the word under chat_secrets/chatid


--->IF MATCH GG DASIT -> return lobby
		CHANGE BOOLEAN GAME OVER TO TRUE;
		if(boolean IS true)
			dont send
		else check if check if remaining characters - newmessagecharacter length < 0 CHARACTERS
		modfiy message/new so that if message is sent after 0 characters or boolean game over is true, dont send




COMMING SOON ... UPDATE UI
MSKE LOGO


*/

var createError = require('http-errors');
var express = require('express');
var admin = require('firebase-admin');
require('dotenv').config();
const cors = require('cors');
const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://tintu-chat.herokuapp.com',
  'https://cryptic-peak-18479.herokuapp.com/'
];

var serviceAccount = {
  type: `${process.env.TYPE}`,
  project_id: `${process.env.PROJECT_ID}`,
  private_key_id: `${process.env.PRIVATE_KEY_ID}`,
  private_key: `${process.env.PRIVATE_KEY.replace(/\\n/g, '\n')}`,
  client_email: `${process.env.CLIENT_EMAIL}`,
  client_id: `${process.env.CLIENT_ID}`,
  auth_uri: `${process.env.AUTH_URI}`,
  token_uri: `${process.env.TOKEN_URI}`,
  auth_provider_x509_cert_url: `${process.env.AUTH_PROVIDER_X509_CERT_URL}`,
  client_x509_cert_url: `${process.env.CLIENT_X509_CERT_URL}`
};
//var serviceAccount = require("./project-bc489-firebase-adminsdk-wtzvz-75bb942342.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-bc489.firebaseio.com'
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
//var db = admin.database();

var app = express();
app.use(
  cors({
    origin: function(origin, callback) {
      console.log(origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function RandomzieWordChoices(words_list) {
  let words = words_list;

  let i = 0;

  let chosen_words = [];

  while (i < 10) {
    let current_word_indx = Math.floor(Math.random() * words.length);
    var rand = words[current_word_indx];
    words.splice(current_word_indx, 1);
    chosen_words.push(rand);
    i++;
  }

  return chosen_words;
}

async function getWordsFromWordBank() {
  console.log('starting getWordsFromWordBank');
  let wordB_res = await admin
    .database()
    .ref(`lilchat/wordbank`)
    .once('value');
  let result_words = [];
  let wordsBarr = [];

  for (let word in wordB_res.val()) {
    console.log('95', word);
    let tmp = wordB_res.val()[word];
    tmp['id'] = word;
    wordsBarr.push(tmp);
  }
  //console.log('inside wordbank', wordsBarr);

  let randomwords = RandomzieWordChoices(wordsBarr);
  //let randomwords = wordB_res.val();

  for (let word_id in randomwords) {
    let currentWord = randomwords[word_id];

    let currWordObj = {
      id: currentWord.id,
      img_url: currentWord.img_url,
      word: currentWord.word
    };

    result_words.push(currWordObj);
  }

  return result_words;
}

function createChat(uid_a, uid_b) {
  //console.log('starting createChat');

  let ref = `/lilchat/chats/`;
  let currentChatMembers = { [uid_a]: uid_a, [uid_b]: uid_b };

  let key = admin
    .database()
    .ref(ref)
    .push()
    .getKey();
  // console.log(key);
  admin
    .database()
    .ref(ref)
    .child(key)
    .set({
      chat_info: {
        characters: 500,
        color: 'blue',
        members: currentChatMembers
      }
    });

  // console.log('returning key');

  return key;
}

function tryMatch(uid_a, uid_b, lobbyID) {
  // console.log('starting tryMatch with '+ uid_a + " and " + uid_b + " and " + lobbyID);

  let key = createChat(uid_a, uid_b);

  admin
    .database()
    .ref(`lilchat/lobbies`)
    .child(lobbyID)
    .child(`users`)
    .child(uid_a)
    .child(`likes`)
    .once(`value`, snap => {
      // console.log('removing uid_a', uid_a);
      console.log(snap.val());
      for (let like in snap.val()) {
        // console.log("THE LIKE: " + like);
        admin
          .database()
          .ref(`lilchat/lobbies`)
          .child(lobbyID)
          .child('words')
          .child(like)
          .child('users')
          .child(uid_a)
          .remove();
      }
      admin
        .database()
        .ref(`lilchat/lobbies`)
        .child(lobbyID)
        .child('users')
        .child(uid_a)
        .remove();
    });

  admin
    .database()
    .ref(`lilchat/lobbies`)
    .child(lobbyID)
    .child(`users`)
    .child(uid_b)
    .child(`likes`)
    .once(`value`, snap => {
      // console.log('removing uid_b', uid_b);
      if (snap.val() != null) {
        for (let like in snap.val()) {
          admin
            .database()
            .ref(`lilchat/lobbies`)
            .child(lobbyID)
            .child('words')
            .child(like)
            .child('users')
            .child(uid_b)
            .remove();
        }
      }
      admin
        .database()
        .ref(`lilchat/lobbies`)
        .child(lobbyID)
        .child('users')
        .child(uid_b)
        .remove();
    });
  return key;
}
/*
async function createLobby(){
  let p = new Promise(function(res, rej){
    res(getWordsFromWordBank());
  });

  return(p.then(function(res){
    console.log(res)
    let wordsB = res;
    console.log(wordsB)
    let key = admin.database().ref('lobbies').push().key;
    console.log(key);
    for(let word in wordsB){
      console.log(word);
      admin.database().ref('lilchat/lobbies/').child(key).child("words").push().set(wordsB[word]);
    }
    return key;
  }));
}


function getLobby(){
  return "";
}
app.get('/lilchat/joinLobby', function(req,res){
  let key = getLobby();
  if(key === ""){
    key = createLobby();
  }
  addUser(key, "SISmwlC4SoNzmxsNUm1N0Wl5BhG2");
  res.send({"lobbyID":key});
});

*/
async function getChatSecretKeywordId(chatId) {
  let ref = `/lilchat/chat_secrets`;
  let keyRes = await admin.database
    .ref(ref)
    .child(chatId)
    .once(`value`);

  return keyRes.val();
}

async function getCurrentWords(uid, chatId) {
  //
  // let idToken = req.body.idToken;
  //verify(idToken, function(uid) {

  let chatId = req.params.chatid;
  let uid = 'SISmwlC4SoNzmxsNUm1N0Wl5BhG2';
  let reference = `/lilchat/private_users/${uid}/active_chats`;

  let words = await admin
    .database()
    .ref(reference)
    .child(chatId)
    .child('likes')
    .once('value');

  if (words.val() == null) {
    res.json(null);
  } else {
    res.json(snap.val());
  }
}
/*****************ANGEL********************************************************/

function createLobby() {
  let p = new Promise(function(res, rej) {
    res(getWordsFromWordBank());
  });

  return p.then(function(res) {
    let wordsB = res;
    let key = admin
      .database()
      .ref('lobbies')
      .push().key;
    for (let word in wordsB) {
      console.log(word);
      admin
        .database()
        .ref('lilchat/lobbies/')
        .child(key)
        .child('words')
        .push()
        .set(wordsB[word]);
    }
    return key;
  });
}

async function getLobby() {
  let lobbies = await admin
    .database()
    .ref('lilchat/lobbies')
    .once('value');

  //, function(snap){

  let tmpList = [];
  if (lobbies.val() != null) tmpList = Object.keys(lobbies.val());
  let randomPropertyName = tmpList[Math.floor(Math.random() * tmpList.length)];
  //console.log(randomPropertyName);
  console.log(286, randomPropertyName);
  return randomPropertyName;
  //})
}

app.get('/lilchat/joinLobby', function(req, res) {
  let p = new Promise(function(resp, rejp) {
    resp(getLobby());
  });
  p.then(function(resp) {
    console.log('325', resp);
    let key = resp;
    console.log('296', key);
    if (key === undefined || key === '') {
      let p = new Promise(function(resp, rej) {
        resp(createLobby());
      });
      p.then(function(resp) {
        key = resp;
        console.log('302', key);
        addUser(key, 'SISmwlC4SoNzmxsNUm1N0Wl5BhG2');
        admin
          .database()
          .ref('lilchat/lobbies')
          .child(key)
          .child('words')
          .once('value', function(snap) {
            let keywords = {};
            if (snap.val() != null) {
              keywords = snap.val();
            }
            res.send({ lobbyID: key, words: keywords });
          });
      });
    } else {
      console.log('313', key);
      addUser(key, 'SISmwlC4SoNzmxsNUm1N0Wl5BhG2');
      res.send({ lobbyID: key });
    }
  });
});

function addUser(key, uid) {
  admin
    .database()
    .ref('lilchat/lobbies')
    .child(key)
    .child('users')
    .child(uid)
    .set({ is_done: false });
}

/*
app.get("lilchat/:lobbyid/gamewords", function(req,res){
  admin.database().ref("lilchat/lobbies").child(req.params.lobbyid).child("words").once('value', function(snap){
    res.send(snap.val());
  })
})
*/

function randomizeUid(vals) {
  return '4kApik61uaZR6LlfSMTuCwVzRrG2';
}

async function addMyLikes(words, uid, lobbyID) {
  let i = 0;
  let found = false;
  let key = '';
  let res = {};

  while (!found && i < words.length) {
    res = await admin
      .database()
      .ref('lilchat/lobbies')
      .child(lobbyID)
      .child('words')
      .child(words[i])
      .child('users')
      .once('value');
    // console.log("284: ", res);
    if (res.val() == null) {
      admin
        .database()
        .ref('lilchat/lobbies')
        .child(lobbyID)
        .child('words')
        .child(words[i])
        .child('users')
        .child(uid)
        .set(uid);

      admin
        .database()
        .ref('lilchat/lobbies')
        .child(lobbyID)
        .child('users')
        .child(uid)
        .child('likes')
        .child(words[i])
        .set(words[i]);
    } else {
      // console.log(" the users are " + randomizeUid(res.val()['users']) +"  "+ uid );

      let other_user_uid = randomizeUid(res.val()['users']);
      console.log('The other user is: ' + other_user_uid + '\nYour user is: ' + uid);

      key = tryMatch(other_user_uid, uid, lobbyID);

      let other_user_uid_likes = await admin
        .database()
        .ref('lilchat/lobbies')
        .child(lobbyID)
        .child('users')
        .child(other_user_uid)
        .child('likes')
        .once('value');
      for (let like in other_user_uid_likes.val()) {
        admin
          .database()
          .ref(`lilchat/private_users/${other_user_uid}/active_chats`)
          .child(key)
          .child('likes')
          .child(other_user_uid_likes.val()[like])
          .set(other_user_uid_likes.val()[like]);
      }

      console.log('427:    ', words);
      console.log(`----------------------`);
      console.log('429:    ', uid);
      console.log(`----------------------`);
      console.log('431:    ', key);
      console.log(`----------------------`);
      console.log('432:    ', words.length);
      console.log(`*****************************************`);
      for (let i = 0; i < words.length; i++) {
        console.log('436:         ', words[i]);
        admin
          .database()
          .ref(`lilchat/private_users/${uid}/active_chats`)
          .child(key)
          .child('likes')
          .child(words[i])
          .set(words[i]);
      }

      admin
        .database()
        .ref('lilchat/lobbies/')
        .child(lobbyID)
        .child('words')
        .child(words[i])
        .child('id')
        .once('value', function(snap) {
          admin
            .database()
            .ref('lilchat/chat_secrets')
            .child(key)
            .set(snap.val());
        });

      console.log('Id for chat is ' + key + ' found match, changing true to false.');
      found = true;
    }
    i++;
  }
  //  console.log('while loop being called ' + i + ' times');
  return key;
}

app.post('/lilchat/:lobbyid/sendmylikes', function(req, res) {
  let likes_arr = req.body.words.split(',');
  ///->lobbies -> users -> uid -> likes -> set to like arr

  let uid = 'SISmwlC4SoNzmxsNUm1N0Wl5BhG2';
  let p = new Promise(function(resp, rej) {
    resp(addMyLikes(likes_arr, uid, req.params.lobbyid));
  });

  p.then(function(resp) {
    let key = resp;
    if (key === '') {
      res.json({
        status: 'Added likes but no match found please wait until someone matches with you.'
      });
    } else {
      console.log('Match found creating ChatID');

      //->go to lobbies users uid likes -> set it under private chats chat id -> likes
      res.json({ status: 'Match found..', ChatID: key });
    }
  });
});

function getDateTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;

  var min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;

  return hour + ':' + min;
}

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
  let idToken = req.header('Authorization');
  let profile_pic = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png';
  verify(idToken, function(uid) {
    let username = req.body.username;
    let bio = req.body.bio;

    let reference = 'lilchat/users/';
    let user = {
      user_info: {
        username: username,
        profile_pic: profile_pic,
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

app.get('/lilchat/validusername/:username', (req, res) => {
  let username = req.params.username;

  admin
    .database()
    .ref('/lilchat/users/')
    .orderByChild('user_info/username')
    .equalTo(`${username}`)
    .once('value')
    .then(snap => {
      if (snap.val()) {
        res.json({
          usernameAvailable: false
        });
      } else {
        res.json({
          usernameAvailable: true
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
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
  // let idToken = req.body.idToken;
  //verify(idToken, function(uid) {
  let reference = '/lilchat/chats/' + req.params.id + '/chat_info';
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
//});

app.get('/lilchat/chats/:id/chat_info/members', function(req, res) {
  //let idToken = req.body.idToken;
  //verify(idToken, function(uid) {
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
//});

app.get('/lilchat/chats/:id/messages', function(req, res) {
  //let idToken = req.body.idToken;
  //verify(idToken, function(uid) {
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
//});

app.post('/lilchat/chats/:id/messages/new', function(req, res) {
  let idToken = req.body.idToken;
  verify(idToken, function(uid) {
    let reference = '/lilchat/chats/' + req.params.id + '/messages';
    let reference_characters = '/lilchat/chats/' + req.params.id + '/chat_info/characters';

    let reference_members = '/lilchat/chats/' + req.params.id + '/chat_info/members/' + uid;

    let reference_time = '/lilchat/chats/' + req.params.id + '/chat_info/last_message_time/';

    admin
      .database()
      .ref(reference_members)
      .once('value', function(snap_m) {
        if (snap_m.val() == null) {
          res.json({ error: 'Cannot reference memebers' });
        } else {
          let referenceUN = 'lilchat/users/' + uid + '/user_info/username';
          admin
            .database()
            .ref(referenceUN)
            .once('value', function(un) {
              if (un.val() == null) {
                res.json({ error: 'Cannot reference username' });
              } else {
                let message_object = {
                  content: req.body.content,
                  username: un.val(),
                  time: getDateTime()
                };

                admin
                  .database()
                  .ref(reference_characters)
                  .once('value', function(snap) {
                    if (snap.val() == null) {
                      res.json({ error: 'Cannot reference characters' });
                    } else {
                      if (parseInt(snap.val()) <= 0) {
                        res.json({ status: 'success but you are out of characters!' });
                        return;
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
                        admin
                          .database()
                          .ref(reference_time)
                          .set(Date.now());

                        if (parseInt(snap.val()) - req.body.content.length <= 500) {
                          let p = new Promise(function(acc, rej) {
                            acc(getCurrentWords());
                          });
                          p.then(function(resp) {
                            res.json({ status: 'success', words: resp });
                          });
                        } else {
                          res.json({ status: 'success' });
                        }
                      }
                    }
                  });
              }
            });
        }
      });
  });
});

/*PROFILE/USERS*/
app.get('/lilchat/users/:id/user_info', function(req, res) {
  let idToken = req.header('Authorization');
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

/*PROFILE/USERS*/
app.get('/lilchat/users/currentuser', function(req, res) {
  let idToken = req.header('Authorization');
  verify(idToken, function(uid) {
    let reference = 'lilchat/users/' + uid + '/user_info';
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
  //let idToken = req.body.idToken;
  //verify(idToken, function(uid) {
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
//});

app.get('/lilchat/users/random_id', function(req, res) {
  //let idToken = req.body.idToken;
  //verify(idToken, function(uid) {
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
//});

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

app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));
module.exports = app;
