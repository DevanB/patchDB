checkAdmin = function(){
  var user = Meteor.userId();
  if (Roles.userIsInRole(user, ['admin'])) {
    return true;
  } else {
    FlowRouter.go('/');
  }
}

const adminRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [checkAdmin]
});

adminRoutes.route('/admin', {
  name: 'admin',
  title: 'Administration',
  action() {
    BlazeLayout.render('layout', {yield: 'admin'});
  }
});
