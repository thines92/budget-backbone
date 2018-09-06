var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#transapp',

  statsTemplate: _.template($('#trans-template').html()),

  events: {
    'click #add-trans': 'create',
    'keypress #new-amount': 'createOnEnter'
  },

  initialize: function() {
    this.$source = this.$('#new-source');
    this.$category = this.$('#new-category');
    this.$amount = this.$('#new-amount');
    this.$outflow = this.$('#new-outflow');
    this.$inflow = this.$('#new-inflow');
    this.$allRadio = this.$('input[name="new-outflow"]');
    this.$addtrans = this.$('#add-trans');
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
      source: this.$source.val().trim(),
      category: this.$category.val().trim(),
      amount: this.$amount.val().trim(),
      outflow: function() {
        if(this.$inflow.prop('checked')) {
          return false;
        } else {
          return true;
        }
      }
    }
  },

  create: function() {
    app.Transactions.create(this.newAttributes());
    this.$source.val('');
    this.$category.val('');
    this.$amount.val('');
    this.$allRadio.prop('checked', false);
  },

  createOnEnter: function(event) {
    if(event.which !== ENTER_KEY || !this.$amount.val().trim()) {
      return;
    }

    this.create();
  }
})