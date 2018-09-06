var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#transApp',

  statsTemplate: _.template($('#stats-template').html());

  events: {
    'keypress #new-trans': 'createOnEnter',
  },

  initialize: function() {
    this.$input = this.$('#new-trans');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(app.Transactions, 'add', this.addOne);
    this.listenTo(app.Transactions, 'all', this.render);

    app.Transactions.fetch();
  },

  render: function() {
    if(app.Transactions.length) {
      this.$main.show();
      this.$footer.show();
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
  },

  addOne: function(transaction) {
    var view = new app.TransView({model: transaction});
    $('#trans-list').append(view.render().el);
  },

  addAll: function() {
    this.$('#trans-list').html('');
    app.Transactions.each(this.addOne, this);
  },

  newAttributes: function() {
    return {
      source: this.$input.val().trim(),
      category: '',
      amount: '',
      outflow: '',
    }
  },

  createOnEnter: function(event) {
    if(event.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }

    app.Transactions.create(this.newAttributes());
    this.$input.val('');
  }
})