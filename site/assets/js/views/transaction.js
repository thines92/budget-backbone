var app = app || {};

app.TransView = Backbone.View.extend({
	
	tagName: 'li',

	template: _.template($("#trans-template").html()),
	
	events: {},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		// this.$input = this.$('edit');
		return this;
	},

	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function() {
		var value = this.$input.val().trim();

		if(value) {
			this.model.save({title: value});
		};

		this.$el.removeClass('editing');
	},

	remove: function() {
		this.model.destroy();
	}

})