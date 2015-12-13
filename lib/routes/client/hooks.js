checkUserLoggedIn = function(){
  if(!Meteor.loggingIn() && !Meteor.user()) {
    Router.go('/login');
  } else {
    this.next();
  }
}

userAuthenticated = function(){
  if(!Meteor.loggingIn() && Meteor.user()){
    Router.go('/lists');
  } else {
    this.next();
  }
}

/*
* Hook: Check Subscription
* Verify that a customer is currently subscribed. If not, re-route them so that
* they can reactivate their subscription.
*/

checkSubscription = function(){
  var user        = Meteor.userId(),
      userPlan    = Session.get("currentUserPlan_" + user);

  if (userPlan){
    var status            = userPlan.subscription.status,
        currentDate       = (new Date()).getTime() / 1000,
        braintreeDateUnix = moment(userPlan.subscription.ends).unix();
        validDate         = braintreeDateUnix > currentDate;

    // Next, we need to check their current accounts status and when their plan
    // is due to expire. Notice above, we're comparing the current date/time to
    // when the user's plan is set to end. What this is saying is, if the plan's
    // expiration date is greater than right now (meaning, past today), return true
    // or, "the plan has not expired yet."
    if ( status == "Trialing" || status == "Active" ) {
      this.next();
    } else if ( status == "Canceled" && validDate ) {
      this.next();
    } else if ( status == "Canceled" && !validDate ) {
      Router.go('/billing/resubscribe');
    } else {
      Router.go('/billing/resubscribe');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(checkUserLoggedIn, {
  except: ['index','signup','login','recover-password','reset-password']
});

Router.onBeforeAction(userAuthenticated, {
  only: ['index','signup','login','recover-password','reset-password']
});

Router.onBeforeAction(checkSubscription, {
  except: ['index','signup','login','recover-password','reset-password','billing',
            'billingPlan','billingCard','billingInvoice','billingResubscribe']
});
