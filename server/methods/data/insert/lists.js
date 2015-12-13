Meteor.methods({
  insertList: function(name, userId){
    check(name, String);
    var list = {
      name: name,
      owner: null,
      type: 'private',
      forTrade: false
    }

    // Because our method needs to operate with and without a userId, make sure
    // that if one is passed, we check it against our expected pattern. If not,
    // we just get the current logged in user.
    if (userId) {
      check(userId, String);
      list.owner = userId;
    } else {
      var user = Meteor.userId();
      list.owner = user;
    }

    // Once we've confirmed the insert is valid, push the list into the
    // collection. Note: we're setting this equal to a variable and returning
    // it from our method so that we can return the generate ID back to the
    // client. We'll then use this ID to route our user. Neat!
    var newList = Lists.insert(list, function(error){
      if (error) console.log(error);
    });
    return newList;
  },
  addItem: function(listId) {
    check(listId, String);
    Lists.update({"_id": listId}, {$push: {items: {_id: "a"+Math.floor((Math.random() * 100) + 1)+"z", order: Math.floor((Math.random() * 100) + 1), name: "Item Name " + Math.floor((Math.random() * 100) + 1)}}});
  }
});
