var friends = require('friends')
  , restify = require('restify')
  , server = restify.createServer();


server.get('/', function(req, res) {
	res.send(200, 'Nothing to see here... move along.');
})

server.get('/friends', function(req, res) {
	friends.all(function(body) {
		res.send(200, body);
	});	
})

server.get('/friends/online/:online', function(req, res) {
	friends.getByPresence(req.uriParams.online, function(body) {
		res.send(200, body);
	});	
})

server.get('/friend/:gamertag', function(req, res) {
	friends.get(req.uriParams.gamertag, function(body) {
		res.send(200, body);
	});	
})

server.listen(4567);
