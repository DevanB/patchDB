Template.header.events({
  'click .logout': function(){
    Meteor.logout(function(error){
      if(error){
        alert(error.reason);
      }
    });
  }
});
