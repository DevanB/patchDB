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
  },
  publicLists: function(){
    var user  = Meteor.userId(),
        lists = Lists.find({$and: [{"owner": user}, {"type": "public"}]});

    if (lists) {
      return lists;
    }
  },
  privateLists: function(){
    var user  = Meteor.userId(),
        lists = Lists.find({$and: [{"owner": user}, {"type": "private"}]});

    if (lists) {
      return lists;
    }
  },
  forTradeLists: function(){
    var user  = Meteor.userId(),
        lists = Lists.find({$and: [{"owner": user}, {"forTrade": true}]});

    if (lists) {
      return lists;
    }
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  forTrade: function(list) {
    return list.forTrade === true ? "For Trade" : "Not For Trade"
  }
});
