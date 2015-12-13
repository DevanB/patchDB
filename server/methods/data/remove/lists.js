Meteor.methods({
  removeList: function(list){
    check(list, String);

    // If argument is valid, perform the removal. In the callback, we lookup the
    // user and make sure to decrement (--) their "lists" number in the profile.
    // This ensures that when a list is removed, the user gains back a list that
    // they can create.
    Lists.remove(list, function(error){
      if (error) console.log(error);
    });
  }
});
