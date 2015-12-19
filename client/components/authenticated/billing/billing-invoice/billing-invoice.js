Template.billingInvoice.onCreated(function(){
  this.subscribe('viewInvoice', FlowRouter.getParam("_id"));
});

Template.billingInvoice.helpers({
  invoice: function(){
    return Invoices.findOne();
  }
})
