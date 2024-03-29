Template.billingPlan.helpers({
  plans: function(){
    var getPlans = Meteor.settings.public.plans;
    if (getPlans) {
      return getPlans;
    }
  },
  upgradeAvailable: function(iteratedPlanAmount){
    var currentUser = Meteor.userId();
    var getPlan     = Session.get('getUserPlan_' + currentUser);

    // Get our user's plan data by calling to our existing checkUserPlan method.
    Meteor.call('checkUserPlan', currentUser, function(error, response){
      if ( error ) {
        console.log(error);
      } else {
        Session.set('getUserPlan_' + currentUser, response);
      }
    });

    if (getPlan){
      // Because we're getting back our customer's plan cost back as a string
      // prefixed with a $ symbol, we need to strip this and convert it back to
      // a number using parseInt(). Afterward, we can multiply the value we get
      // by a hundred to get the correct numbers of cents (e.g. 10 * 100 cents
      // in a dollar = 1000). Note: we do a replace() on the $ symbol here
      // because if we pass the raw string to parseInt() it breaks.
      var currentPlanAmount = parseInt( getPlan.amount.replace("$", "") ) * 100;
      return currentPlanAmount < iteratedPlanAmount ? true : false;
    }
  }
});

Template.billingPlan.events({
  'click .downgrade-upgrade': function(e){
    var plan            = this.name;
    var downgradeUpgradeButton = $(e.target).button('loading');
    var confirmPlanChange = confirm("Are you sure you want to change your plan?");
    if (confirmPlanChange){
      Meteor.call('btUpdateSubscription', plan, function(error, response){
        if (error){
          downgradeUpgradeButton.button('reset');
          Bert.alert(error.reason, "danger");
        } else {
          if (response && response.error){
            downgradeUpgradeButton.button('reset');
            Bert.alert(response.error.message, "danger");
          } else {
            // If our method succeeds, we reset our button and then we update our
            // currentUserPlan_ session variable to be null. What? We do this here
            // because by default, our UI helper for marking the user's current plan
            // is NOT reactive. Here, we change the currentUserPlan_ session variable,
            // because know 1.) that it's a reactive data store, and 2.) that our UI
            // helper depends on it. So, by changing it to null, we force our UI helper
            // to rerun and pull down the updated information from the user. Woah smokies.
            downgradeUpgradeButton.button('reset');
            Session.set('currentUserPlan_' + Meteor.userId(), null);
            Bert.alert("Subscription successfully updated!", "success");
          }
        }
      });
    } else {
      downgradeUpgradeButton.button('reset');
    }
  }
});
