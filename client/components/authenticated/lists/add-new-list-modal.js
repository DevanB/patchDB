Template.addNewListModal.onRendered(function() {
  $("#new-list").validate({
    rules: {
      listName: {
        required: true
      }
    },
    messages: {
      listName: {
        required: "Woah there, slick. Add a name please."
      }
    },
    submitHandler: function() {
      var name = $("[name='listName']").val();
      Meteor.call('insertList', name, function(error,response){
        if (error) {
          alert(error.reason);
        } else {
          Router.go('/lists/' + response);
          $('#new-list-modal').modal('hide');
          $('.modal-backdrop').remove();
        }
      });
    }
  });
});

Template.addNewListModal.events({
  'submit form': function(event) {
    event.preventDefault();
  }
});
