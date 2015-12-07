Meteor.publish('userLists', function(){
  var user     = this.userId,
      getLists = Lists.find({"owner": user});

  if (getLists){
    return getLists;
  }
});

Meteor.publish('list', function(id){
  check(id, String);
  var user     = this.userId,
      getList  = Lists.find({"_id": id, "owner": user});

  if (getList){
    return getList;
  }
});
