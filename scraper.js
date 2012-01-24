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
            var gamerpic = $('img.gamerpic').attribs.src;
            var status = $('.presence').text;
			var name = $('.name .value').text;
			var location = $('.location .value').text;
			var bio = $('.bio .value').text;
            var motto = '';
            try {
                motto = $('.motto').text;
            } catch (err) {/* motto class doesn't always exist */};
            var rep = 0;
            $('.reputation div').each(function(div) {
                rep += repCalc(div);
            });
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
            client.hset("friends:" + gamertag, "gamerpic", gamerpic, redis.print);
			client.hset("friends:" + gamertag, "name", name, redis.print);
			client.hset("friends:" + gamertag, "location", location, redis.print);
            client.hset("friends:" + gamertag, "rep", rep, redis.print);
			client.hset("friends:" + gamertag, "bio", bio, redis.print);
            client.hset("friends:" + gamertag, "motto", motto, redis.print);
            client.hset("friends:" + gamertag, "online", online, redis.print);
            client.hset("friends:" + gamertag, "status", status, redis.print);
            client.hset("friends:" + gamertag, "gamerscore", gamerscore, redis.print);
            this.emit(gamertag);
        });
    }
});

function repCalc(div) {
    var cls = div.attribs.class;
    var val = 0;
    switch(true) {
        case /Star Quarter/.test(cls):
            val += 0.25;
            break;
        case /Star Half/.test(cls):
            val += 0.50;
            break;
        case /Star ThreeQuarter/.test(cls):
            val += 0.75;
            break;
        case /Star Full/.test(cls):
            val += 1;
            break;
    }
    return val;
}
