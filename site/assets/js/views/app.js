var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#transapp',

  events: {
    'click #add-trans': 'addTrans',
    'keypress #new-amount': 'createOnEnter'
  },

  addTrans: function(e) {
    e.preventDefault();

    var formData = {};

    $("#addTrans").children('input').each(function(i, el) {
      if($(el).val() !== '') {
        formData[el.id] = $(el).val();
      }
    });

    this.collection.add(new app.Transaction(formData));
  },

  initialize: function(initialTrans) {

    this.collection = new TransList(initialTrans);
    this.render();

    this.listenTo(this.collection, 'add', this.renderTrans);
  },

  render: function() {
    this.collection.each(function( item) {
      this.renderTrans(item);
    }, this)
  },

  renderTrans: function(item) {
    var transView = new app.TransView({
      model: item
    });
    this.$el.append(transView.render().el);
  },

  // addOne: function(transaction) {
  //   var view = new app.TransView({model: transaction});
  //   $('#trans-list').append(view.render().el);
  // },

  // addAll: function() {
  //   this.$('#trans-list').html('');
  //   app.Transactions.each(this.addOne, this);
  // },

  // newAttributes: function() {
  //   return {
  //     source: this.$source.val().trim(),
  //     category: this.$category.val().trim(),
  //     amount: this.$amount.val().trim(),
  //     outflow: function() {
  //       if(this.$inflow.prop('checked')) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }
  //   }
  // },

  // create: function() {
  //   app.Transactions.create(this.newAttributes());
  //   this.$source.val('');
  //   this.$category.val('');
  //   this.$amount.val('');
  //   this.$allRadio.prop('checked', false);
  // },

  // createOnEnter: function(event) {
  //   if(event.which !== ENTER_KEY || !this.$amount.val().trim()) {
  //     return;
  //   }

  //   this.addTrans();
  // }
})