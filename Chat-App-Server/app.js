const express = require("express");
const app = express();
const port = 8082;
const mongoose = require("mongoose");
const usermodel = require('./models/users');
const chatmodel = require('./models/chat');
const connection = require('./config');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const server = app.listen(port, () => console.log('App listening on port ' + port));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/loginuser", (req, res) => {
	console.log(req.body)
	usermodel.loginUser(req.body).then(item => {
		if(item && item.length>0){
		res.status(200).send(item[0]);
	}	else {
		res.state(201).send({message:"Invalid email and password"});
	}
})
	.catch(err => {
		res.status(400).send("Unable to save to database");
	});
});

app.post("/registeruser", (req, res) => {
	console.log(req.body)
	usermodel.userRegistration(req.body).then(item => {
		if(item) {
			res.status(200).send(item);
		} else{
			res.status(201).send({message: "Can't Register"});
		}
	})
	.catch(err => {
		res.status(400).send("Unable to register");
	});
});

app.get("/userlist", (req, res) => {
	usermodel.userList().then(items => {
		if(items && items.length>0) {
			res.status(200).send(items);
		} else {
			res.status(201).send({message: "No records found"});
		}
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

// app.post("/chatinsert", (req, res) => {
// 	//console.log(req.body);
// 	chatmodel.chatInsert(req.body).then(items => {
// 		if(item) {
// 			res.status(200).send(item);
// 		} else {
// 			res.status(201).send({message: "No records found"});
// 		}
// 	})
// 	.catch(err => {
// 		res.status(400).send(err);
// 	});
// });
// app.post("/chatlist", (req, res) => {
// 	chatmodel.getChatList(res.body).then(item => {
// 		if(item && item.length>0) {
// 			res.status(200).send(item);
// 		} else {
// 			res.status(201).send({message: "No records found"});
// 		}
// 	})
// 	.catch(err => {
// 		res.status(400).send(err);
// 	});
// });

const websocket = socketio(server);

websocket.on('connection', function (socket) {
	socket.on('chatMessage', (data) => {
		chatmodel.chatInsert(data)
	});
	socket.on('getMessage', (data) => {
		let chatlist = chatmodel.getChatList(data).then(chatlist => {
			console.log(chatlist, "chatlist")
			socket.emit('receiveMessage', chatlist);
		});
	});
})


// app.listen(port, () => {
// 	console.log("Server listening on port" +port);
// });