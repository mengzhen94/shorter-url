module.exports = function(app, db){

  	function getRandomInt() {
 		var min = Math.ceil(1000)
  		var max = Math.floor(9999)
  		return Math.floor(Math.random() * (max - min)) + min
	}

	function isURL(str) {
     	var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
     	var url = new RegExp(urlRegex, 'i');
     	return str.length < 2083 && url.test(str);
	}

	app.get('/:num', function(req, res){
		var num = req.params.num
		db.collection('sites').findOne({
			"short_url" : +num
		},function(err, data){
			if(err) throw err
			if(data){
				console.log("data: " + data)
				console.log("url: " + data.original_url)
				res.redirect(data.original_url)
			}else{
				res.send("No such Site")
			}
		})
	})

	app.get('/new/:url*', function(req, res){
		var url = req.url.slice(5)
		if(isURL(url)){
			var number = getRandomInt()
			var shortUrl = {
				"original_url" : url,
				"short_url" : number
			}
			console.log(shortUrl)
			res.send(shortUrl)
			db.collection('sites').save(shortUrl,function(err, data) {
				if(err) throw err
				console.log("Saved" + data)
    		})
		}else{
			res.send("Sorry, it is not a valid url!")
		}	
	})
}



