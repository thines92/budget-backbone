var app = app{};

app.TransList = Backbone.Collection.extend({
	model: app.Transaction,

	localStorage: "?"
})

app.Transactions = new TransList();