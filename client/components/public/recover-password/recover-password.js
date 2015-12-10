Template.recoverPassword.onRendered(function(){
  $('#application-recover-password').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: "Please enter your email address to recover your password.",
        email: "Please enter a valid email address."
      }
    },
    submitHandler: function(){
      var email = $('[name="emailAddress"]').val();

      Accounts.forgotPassword({email: email}, function(error){
        if(error){
          alert(error.reason);
        }
      });
    }
  });
});

Template.recoverPassword.events({
  'submit form': function(e){
    e.preventDefault();
  }
});
