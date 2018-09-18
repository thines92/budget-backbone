var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#transapp',

  events: {
    'click #add-trans': 'addTrans',
    'keypress #amount': 'createOnEnter'
  },

  initialize: function(initialTrans) {

    this.collection = new TransList(initialTrans);
    this.render();

    this.listenTo(this.collection, 'add', this.render);
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

  render: function() {
    this.collection.each(function(item) {
      this.renderTrans(item);
    }, this)
  },

  renderTrans: function(item) {
    var transView = new app.TransView({
      model: item
    });
    this.$el.append(transView.render().el);
  },
})