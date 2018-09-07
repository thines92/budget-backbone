var app = app || {};

var TransList = Backbone.Collection.extend({
	model: app.Transaction,
	url: "/transactions"
});

// app.Transactions = new TransList();