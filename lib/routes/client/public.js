const publicRedirect = () => {
  if (Meteor.userId()) {
    FlowRouter.go('index');
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [publicRedirect]
});

publicRoutes.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('layout', {yield: 'index'});
  }
});

publicRoutes.route('/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render('layout', {yield: 'signup'});
  }
});

publicRoutes.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('layout', {yield: 'login'});
  }
});

publicRoutes.route('/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render('layout', {yield: 'recoverPassword'});
  }
});

publicRoutes.route('/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render('layout', {yield: 'resetPassword'});
  }
});
