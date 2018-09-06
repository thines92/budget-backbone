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

//Start server
var port = 4711;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

app.get('/', function(req, res) {
	res.send(application_root);
})

app.get('/', function(req, res) {
	return TransactionModel.find(function(err, transactions) {
		if(!err) {
			return res.send(transactions);
		} else {
			return console.log(err);
		}
	});
});

app.post('/', function(req, res) {
	var transaction = new TransactionModel({
		source: req.body.source,
		category: req.body.category,
		amount: req.body.amount,
		outflow: req.body.outflow
	});

	return transaction.save(function(err) {
		if(!err) {
			console.log('created');
			return res.send(transaction);
		} else {
			console.log(err);
		}
	})
})

mongoose.connect('mongodb://localhost/library_database');

var Transaction = new mongoose.Schema({
	source: String,
	category: String,
	amount: Number,
	outflow: Boolean
});

var TransactionModel = mongoose.model('Transaction', Transaction);

app.configure(function() {
	app.use(express.bodyParser());

	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express.static(path.join(application_root, '/site')));

	app.use(express.errorHandler({ dumbExceptions: true, showStack: true}));
})