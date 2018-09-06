// assets/js/transaction.j

var app = app || {};

app.Transaction = Backbone.Model.extend({
	defaults: {
		source: '',
		category: '',
		amount: '',
		outflow: true
	},

	urlRoot: "/transactions"
})