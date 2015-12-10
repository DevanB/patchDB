Template.resetPassword.onCreated(function(){
  Session.set('resetPasswordToken', this.params.token);
});

Template.resetPassword.onRendered(function(){
  $('#application-reset-password').validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: "[name='newPassword']"
      }
    },
    messages: {
      newPassword: {
        required: "Please enter a new password.",
        minlength: "Please use at least six characters."
      },
      repeatNewPassword: {
        required: "Please repeat your new password.",
        equalTo: "Your password do not match. Please try again."
      }
    },
    submitHandler: function(){
      var token    = Session.get('resetPasswordToken'),
          password = $('[name="newPassword"]').val();

      Accounts.resetPassword(token, password, function(error){
        if(error){
          alert(error.reason);
        } else {
          Session.set('resetPasswordToken', null);
        }
      });
    }
  });
});

Template.resetPassword.events({
  'submit form': function(e){
    e.preventDefault();
  }
});
