const handleRedirect = (routes, redirect) => {
  let currentRoute = FlowRouter.getRouteName();
  if (routes.indexOf(currentRoute) > -1) {
    FlowRouter.go(redirect);
    return true;
  }
};

Template.layout.helpers({
  loggingIn() {
    return Meteor.loggingIn();
  },
  authenticated() {
    return !Meteor.loggingIn() && Meteor.user();
  },
  redirectAuthenticated() {
    return handleRedirect([
      'index', 'login', 'signup', 'recover-password', 'reset-password'
    ], '/lists');
  },
  redirectPublic() {
    return handleRedirect([
      'lists', 'list', 'billing'
    ], '/login');
  }
})
