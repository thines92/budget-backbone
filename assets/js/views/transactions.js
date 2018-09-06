var app = app || {};

app.TransView = Backbone.View.extend({
	
	tagName: 'li',

	template: _.template($("#tran-template").html()),

	events: {
		'click .destroy': 'deleteTran',
		'dblclick label': 'editTran',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		this.$input = this.$('edit');
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
	}

})