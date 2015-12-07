Template.billingInvoice.onCreated(function(){
  this.subscribe('viewInvoice', Router.current().params._id);
});

Template.billingInvoice.helpers({
  invoice: function(){
    return Invoices.findOne();
  }
})
