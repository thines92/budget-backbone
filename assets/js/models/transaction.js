// assets/js/transaction.js

var app = app || {};

app.Transaction = Backbone.Model.extend({
	defaults: {
		source: '',
		category: '',
		amount: '',
		outflow: true
	},

	toggle: function() {
		this.save({
			outflow: !this.get('outflow')
		})
	}
})