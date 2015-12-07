Router.route('lists', {
  path: '/lists',
  template: 'lists',
  title: 'My Lists'
});

Router.route('list', {
  path: '/lists/:_id',
  template: 'list',
  parent: 'lists',
  title: 'List'
});

Router.route('billing', {
  path: '/billing',
  template: 'billing',
  title: 'Billing'
});

Router.route('billingPlan', {
  path: '/billing/plan',
  template: 'billingPlan',
  parent: 'billing',
  title: 'Plan'
});

Router.route('billingCard', {
  path: '/billing/card',
  template: 'billingCard',
  parent: 'billing',
  title: 'Card',
  onBeforeAction: function(){
    Session.set('addingNewCreditCard', false);
    this.next();
  }
});

Router.route('billingInvoice', {
  path: '/billing/invoice/:_id',
  template: 'billingInvoice',
  parent: 'billing',
  title: 'Invoice – :_id'
});

Router.route('billingResubscribe', {
  path: '/billing/resubscribe',
  template: 'billingResubscribe',
  parent: 'billing',
  title: 'Resubscribe',
  onBeforeAction: function(){
    Session.set('addingNewCreditCard', false);
    this.next();
  }
});
