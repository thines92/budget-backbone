var app = app || {};

var TransList = Backbone.Collection.extend({
	model: app.Transaction,

	localStorage: "?"
});

app.Transactions = new TransList();