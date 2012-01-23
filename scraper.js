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
		  , 'PUNISHERlaw'],
    run: function (gamertag) {
        this.getHtml('http://live.xbox.com/en-US/Profile?gamertag=' + encodeURIComponent(gamertag), function (err, $) {
            var friend = {'name': gamertag};
            var status = $('.presence').text;
            switch(true) {
            	case /Online Status Unavailable/.test(status):
            		friend.status = 'Hiding!'
            		break;
            	default:
            		friend.status = status;
            }
            client.hset("friends:" + gamertag, "status", friend.status, redis.print);
            client.hset("friends:" + gamertag, "last_update", new Date(), redis.print);     
            this.emit(friend);
        });
    }
});