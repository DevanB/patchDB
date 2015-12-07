Template.lists.onCreated(function(){
  this.subscribe('userLists');
});
Template.lists.helpers({
  lists: function(){
    var user  = Meteor.userId(),
        lists = Lists.find({"owner": user});

    if (lists) {
      return lists;
    }
  }
});
