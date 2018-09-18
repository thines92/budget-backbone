// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Where to serve static content
app.use( express.static( path.join( application_root, 'site') ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Start server
var port = 27017;

var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/budget');
mongoose.connect('mongodb://localhost/budget');

var Transaction = new mongoose.Schema({
	source: String,
	category: String,
	amount: String,
});

var TransactionModel = connection.model('transaction', Transaction);

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

app.get('/api', function(req, res) {
	res.send('Transaction API is running');
})

// app.get('/api/transactions', function(req, res) {
// 	res.send(Transaction)
// 	console.log(res.domain);
// })

app.get('/api/transactions', function(req, res) {
	return TransactionModel.find(function(err, transactions) {
		if(!err) {
			return res.send(transactions);
		} else {
			return console.log(err);
		}
	});
});

app.post('/api/transactions', function(req, res) {
	var transaction = new TransactionModel({
		source: req.body.source,
		category: req.body.category,
		amount: req.body.amount,
	});

	transaction.save();

	// transaction.save(function(err) {
	// 	if(!err) {
	// 		console.log('created');
	// 		res.send('workinggggg');
	// 	} else {
	// 		console.log(err);
	// 	}
	// })
	

	// console.log("transaction: " + transaction);

	// transaction.save()
	// 			.then(item => {
	// 				res.status(201).json(item);
	// 			})
	// 			.catch(function(err) {
	// 				res.status(400).send('unable to save');
	// 			})

	

	// var myData = new TransactionModel(req.body);
	// myData.save()
	// 	  .then(item => {
	// 	  	res.send('item saved to database')
	// 	  })
	// 	  .catch(err => {
	// 		res.status(400).send("unable to save to database");
	// 	  })
})

app.configure(function() {
	app.use(express.bodyParser());

	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express.static(path.join(application_root, '/site')));

	app.use(express.errorHandler({ dumbExceptions: true, showStack: true}));
})