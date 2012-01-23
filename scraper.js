var nodeio = require('node.io')
  , util = require('util')
  , redis = require('redis')
  , client = redis.createClient()
  , options = {timeout: 10};

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.job = new nodeio.Job(options, {
	input: ['BanxStar'
		  , 'Huxxster'
		  , 'Zammalad'
		  , 'Waggzi'
		  , 'BlondeWeMo'
		  , 'Zimmmmy'
		  , 'iCOBRA 360i'
		  , 'chrjs255'
		  , 'Korrdorr'
		  , 'Dolchenko'
		  , 'Papey82'
		  , 'PUNISHERlaw'
          , 'DCulture'],
    run: function (gamertag) {
        this.getHtml('http://live.xbox.com/en-US/Profile?gamertag=' + encodeURIComponent(gamertag), function (err, $) {
            var status = $('.presence').text;
            var gamerscore = $('.gamerscore').text;
            var online = false;
            switch(true) {
            	case /Online Status Unavailable/.test(status):
            		// Catch this
            		break;
            	case /^Online/.test(status):
            		online = true;
            		break;
            }
            client.hset("friends:" + gamertag, "online", online, redis.print);
            client.hset("friends:" + gamertag, "status", status, redis.print);
            client.hset("friends:" + gamertag, "gamerscore", gamerscore, redis.print);
            this.emit(gamertag);
        });
    }
});
