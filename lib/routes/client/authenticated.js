const authenticatedRedirect = () => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.go('login');
  }
};

checkSubscription = function(){
  var user        = Meteor.userId(),
      userPlan    = Session.get("currentUserPlan_" + user);

  if (userPlan){
    var status            = userPlan.subscription.status,
        currentDate       = (new Date()).getTime() / 1000,
        braintreeDateUnix = moment(userPlan.subscription.ends).unix();
        validDate         = braintreeDateUnix > currentDate;

    if (status == "Trialing" || status == "Active") {
      return;
    } else if (status == "Canceled" && validDate) {
      return;
    } else if (status == "Canceled" && !validDate) {
      FlowRouter.go('/billing/resubscribe');
    } else {
      FlowRouter.go('/billing/resubscribe');
    }
  } else {
    return;
  }
}

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [authenticatedRedirect]
});

authenticatedRoutes.route('/lists', {
  name: 'lists',
  triggersEnter: [checkSubscription],
  action() {
    BlazeLayout.render('layout', {yield: 'lists'});
  }
});

authenticatedRoutes.route('/lists/:_id', {
  name: 'list',
  triggersEnter: [checkSubscription],
  action() {
    BlazeLayout.render('layout', {yield: 'list'});
  }
});

authenticatedRoutes.route('/billing', {
  name: 'billing',
  action() {
    BlazeLayout.render('layout', {yield: 'billing'});
  }
});

authenticatedRoutes.route('/billing/plan', {
  name: 'billingPlan',
  action() {
    BlazeLayout.render('layout', {yield: 'billingPlan'});
  }
});

authenticatedRoutes.route('/billing/card', {
  name: 'billingCard',
  action() {
    BlazeLayout.render('layout', {yield: 'billingCard'});
  }
});

authenticatedRoutes.route('/billing/invoice/:_id', {
  name: 'billingInvoice',
  action() {
    BlazeLayout.render('layout', {yield: 'billingInvoice'});
  }
});

authenticatedRoutes.route('/billing/resubscribe', {
  name: 'billingResubscribe',
  action() {
    BlazeLayout.render('layout', {yield: 'billingResubscribe'});
  }
});
