Router.configure({
  notFoundTemplate: 'notFound',
  layoutTemplate: 'layout',
  defaultBreadcrumbTitle: 'PatchDB',
  defaultBreadcrumbLastLink: false
});

Router.route('index', {
  path: '/',
  template: 'index'
});

Router.route('signup', {
  path: '/signup',
  template: 'signup'
});

Router.route('login', {
  path: '/login',
  template: 'login'
});

Router.route('recover-password', {
  path: '/recover-password',
  template: 'recoverPassword'
});

Router.route('reset-password', {
  path: '/reset-password/:token',
  template: 'resetPassword',
  onBeforeAction: function() {
    Session.set('resetPasswordToken', this.params.token);
    this.next();
  }
});
