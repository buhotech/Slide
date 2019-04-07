const functions = require('firebase-functions');
const express = require('express');const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);const cors = require('cors');const app = express();
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


app.post('/lilchat/chats/create',function(req,res){
	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})

app.post('/lilchat/chats/:id/join',function(req,res){
	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})

app.get('/lilchat/chats/:id/chat_info',function(req,res){
	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})

app.get('/lilchat/chats/:id/members',function(req,res){
	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})

app.get('/lilchat/chats/:id/messages',function(req,res){
	let reference = "/lilchat/chats/" + req.params.id +"/messages";

	admin.database().ref(reference).on("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})
app.post('/lilchat/chats/:id/messages/new',function(req,res){
	let reference = "/lilchat/chats/" + req.params.id +  "/messages";

	let message_object = {
		"content":req.body.content,
		"username":req.body.username,
		"time":"0:00AM"
	}

	admin.database().ref(reference).push().set(message_object);
	res.json({"status":"success"});
})




/*PROFILE/USERS*/
app.get('/lilchat/users/:id/user_info/',function(req,res){
	let reference = "lilchat/users/"+req.params.id +"/user_info";
	admin.database().ref(reference).once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})




/*FRIENDS*/
app.get('/lilchat/users/:id/friends/',function(req,res){
	let reference = "lilchat/users/"+req.params.id +"/friends";


	admin.database().ref(reference).once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})
app.get('/lilchat/users/:id/request_sent/new',function(req,res){
	let my_user_id = req.params.id;

	let reference = "lilchat/users/"+my_user_id+ "/request_sent";
	let other_user = req.body.other_user;
	let other_user_reference = "/users/"+other_user + "/request_recieved";

	admin.database().ref(reference).push().set(req.body.other_user);
	admin.database().ref(other_user_reference).push().set(my_user_id);
})
app.get('/lilchat/users/:id/request_recieved/',function(req,res){

	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})
app.post('/lilchat/users/:id/request_recieved/:other_user/accept',function(req,res){
		//move from request_recieved to firneds list
		//from from request sent to friends

	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})
app.get('/lilchat/users/:id/request_recieved/:other_user/decline',function(req,res){
	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})

app.get('/lilchat/users/:id/request_recieved/:other_user/block',function(req,res){
	admin.database().ref("").once("value", function(snap){
		if(snap.val() == null){
			res.json(null);
		}else{
			res.json(snap.val());
		}
	})
})







exports.slide = functions.https.onRequest(app);
