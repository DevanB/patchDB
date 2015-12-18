delay = (function() {
  var timer = 0;
  var executeDelay = function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
  return executeDelay;
})();

let updateIndexes = (sortableClass) => {
  let items = [];
  $(`${sortableClass} li`).each((index, element) => {
    items.push({ _id: $(element).data('id'), order: index + 1 });
  });
  Meteor.call('updateListItemOrder', items, (error) => {
    if (error) {
      console.log(error.reason);
    }
  });
};

let initSortable = function(sortableClass){
  let sortableList = $( sortableClass );
  sortableList.sortable('destroy');
  sortableList.sortable();
  sortableList.sortable().off('sortupdate');
  sortableList.sortable().on('sortupdate', function() {
    updateIndexes('.sortable');
  });
};

Template.list.onCreated(function() {
  this.saveState = new ReactiveVar();
  this.subscribe('list', FlowRouter.getParam("_id"));
});

Template.list.onRendered(function(){
  Tracker.afterFlush(function(){
    initSortable('.sortable');
  });
});

Template.list.helpers({
  sortedByOrder: function(items) {
    return _.sortBy(items, function(item){ return item.order; });
  },
  list: function() {
    return Lists.findOne();
  },
  public: function(type) {
    return type == 'public' ? 'active' : '';
  },
  private: function(type) {
    return type == 'private' ? 'active' : '';
  },
  forTrade: function(forTrade, type) {
    if (type == 'private') {
      return 'disabled'
    } else if (forTrade === true) {
      return 'active'
    } else { return; }
  },
  notForTrade: function(forTrade) {
    return forTrade === false ? 'active' : '';
  },
  saving: function() {
    var saveState = Template.instance().saveState.get();
    return saveState;
  }
 });

Template.list.events({
  'click #deleteListBtn': function(event) {
    event.preventDefault();
    let listId = event.target.dataset.id;
    let confirmDelete = confirm('Are you sure you want to delete this list?');
    if (confirmDelete) {
      Meteor.call('removeList', listId, function(error){
        if (error) {
          return alert(error.reason);
        } else {
          FlowRouter.go('/lists');
        }
      });
    }
  },
  'click #typeBtnGroup label.btn-default': function(event) {
    event.preventDefault();
    let value = event.target.id;
    if (value === 'public' || value === 'private') {
      Meteor.call('updateListType', value, FlowRouter.getParam("_id"), (error, result) => {
        if (error) {
          return alert(error.reason);
        } else {
          if (value === 'private') {
            Meteor.call('updateListForTrade', false, FlowRouter.getParam("_id"), (error, result) => {
              if (error) {
                return alert(error.reason);
              }
            });
          }
          Bert.alert("List successfully changed to " + result, "success");
        }
      });
    }
    return;
  },
  'click #forTradeBtnGroup label.btn-default': function(event) {
    event.preventDefault();
    let value = event.target.id;
    if (value === 'forTrade' && !$("#private").hasClass("active")) {
      Meteor.call('updateListForTrade', true, FlowRouter.getParam("_id"), (error, result) => {
        if (error) {
          return alert(error.reason);
        }
        Bert.alert("List successfully changed to " + result, "success");
      });
    } else if (value === 'forTrade' && $("#private").hasClass("active")) {
      event.stopPropagation();
      return Bert.alert("List must be public to turn 'For Trade' on", "danger");
    } else if (value === 'notForTrade') {
      Meteor.call('updateListForTrade', false, FlowRouter.getParam("_id"), (error, result) => {
        if (error) {
          return alert(error.reason);
        }
        Bert.alert("List successfully changed to " + result, "success");
      });
    }
    return;
  },
  'keyup input[name="listName"]': function(event, template){
    let name = $("[name='listName']").val();
    template.saveState.set(true);

    if (name !== "") {
      Meteor.callPromise("updateListName", FlowRouter.getParam("_id"), name)
        .then(function() {
          delay(function() {
            template.saveState.set(false);
          }, 1000);
        })
        .catch(function(error) {
          Bert.alert(error, "danger");
          template.saveState.set(false);
        });
    }
  },
  'click #addItemBtn': function(event) {
    let listId = event.target.dataset.id;
    Meteor.callPromise('addItem', listId)
      .then(function() {
        initSortable('.sortable');
      });
  }
});
