Meteor.methods({
  insertList: function(name){
    check(name, String);
    let user = Meteor.userId(),
        list = {
      name: name,
      owner: user,
      type: 'private',
      forTrade: false
    }
    let newList = Lists.insert(list, function(error){
      if (error) console.log(error);
    });
    return newList;
  },
  addItem: function(listId) {
    check(listId, String);
    Lists.update({"_id": listId}, {$push: {items: {_id: "a"+Math.floor((Math.random() * 100) + 1)+"z", order: Math.floor((Math.random() * 100) + 1), name: "Item Name " + Math.floor((Math.random() * 100) + 1)}}});
  }
});
