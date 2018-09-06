var app = app || {};

var TransList = Backbone.Collection.extend({
	model: app.Transaction,
	url: "http://localhost:4711"
});

app.Transactions = new TransList();