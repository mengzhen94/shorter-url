var path = require('path')

module.exports = function(app){
	app.engine('html', require('ejs').renderFile)
	app.set("views", path.join(__dirname, '../../views'))
	app.set('view engine', 'html')
	app.get('/', function(req, res) {
    	res.render('index')
	})	
}

