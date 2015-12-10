Template.login.onRendered(function(){
  $('#application-login').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: "Please enter your email address to login.",
        email: "Please enter a valid email address."
      },
      password: {
        required: "Please enter your password to login."
      }
    },
    submitHandler: function(){
      user = {
        email: $('[name="emailAddress"]').val(),
        password: $('[name="password"]').val()
      }

      Meteor.loginWithPassword(user.email, user.password, function(error){
        if(error){
          alert(error.reason);
        }
      });
    }
  });
});

Template.login.events({
  'submit form': function(e){
    e.preventDefault();
  }
});
