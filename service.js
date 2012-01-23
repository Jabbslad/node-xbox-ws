var friends = require('friends')
  , restify = require('restify')
  , server = restify.createServer();

server.get('/friends', function(req, res) {
	friends.all(function(body) {
		res.send(200, body);
	});	
})

server.listen(8080);