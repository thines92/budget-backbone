var TransRouter = Backbone.Router.extend({
	routes: {
		'transactions': 'showTransactions'
	},

	showTransactions: function() {
		console.log('still a success');
	}
})

var myTransRouter = new TransRouter();

// myTransRouter.on('route:transactions', function(actions) {
// 	console.log('success');
// })

Backbone.history.start();