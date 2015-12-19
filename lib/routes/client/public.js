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
  title: 'Home',
  action() {
    BlazeLayout.render('layout', {yield: 'index'});
  }
});

publicRoutes.route('/signup', {
  name: 'signup',
  title: 'Signup',
  parent: 'index',
  action() {
    BlazeLayout.render('layout', {yield: 'signup'});
  }
});

publicRoutes.route('/login', {
  name: 'login',
  title: 'Login',
  parent: 'index',
  action() {
    BlazeLayout.render('layout', {yield: 'login'});
  }
});

publicRoutes.route('/recover-password', {
  name: 'recover-password',
  title: 'Recover Password',
  parent: 'index',
  action() {
    BlazeLayout.render('layout', {yield: 'recoverPassword'});
  }
});

publicRoutes.route('/reset-password/:token', {
  name: 'reset-password',
  title: 'Reset Password',
  parent: 'index',
  action() {
    BlazeLayout.render('layout', {yield: 'resetPassword'});
  }
});
