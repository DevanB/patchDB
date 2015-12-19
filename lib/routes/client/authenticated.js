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
  name: 'authenticated'
});

authenticatedRoutes.route('/lists', {
  name: 'lists',
  triggersEnter: [checkSubscription],
  title: 'Lists',
  action() {
    BlazeLayout.render('layout', {yield: 'lists'});
  }
});

authenticatedRoutes.route('/lists/:_id', {
  name: 'list',
  triggersEnter: [checkSubscription],
  title: 'List :_id',
  parent: 'lists',
  action() {
    BlazeLayout.render('layout', {yield: 'list'});
  }
});

authenticatedRoutes.route('/billing', {
  name: 'billing',
  title: 'Billing',
  action() {
    BlazeLayout.render('layout', {yield: 'billing'});
  }
});

authenticatedRoutes.route('/billing/plan', {
  name: 'billingPlan',
  title: 'Plan',
  parent: 'billing',
  action() {
    BlazeLayout.render('layout', {yield: 'billingPlan'});
  }
});

authenticatedRoutes.route('/billing/card', {
  name: 'billingCard',
  title: 'Card Details',
  parent: 'billing',
  action() {
    BlazeLayout.render('layout', {yield: 'billingCard'});
  }
});

authenticatedRoutes.route('/billing/invoice/:_id', {
  name: 'billingInvoice',
  title: 'Invoice :_id',
  parent: 'billing',
  action() {
    BlazeLayout.render('layout', {yield: 'billingInvoice'});
  }
});

authenticatedRoutes.route('/billing/resubscribe', {
  name: 'billingResubscribe',
  title: 'Resubscribe',
  action() {
    BlazeLayout.render('layout', {yield: 'billingResubscribe'});
  }
});
