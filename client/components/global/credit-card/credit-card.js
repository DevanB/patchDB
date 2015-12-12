Template.creditCard.helpers({
  isBilling: function(){
    var instance = Template.instance();
    if ( instance.data.search("billing") > -1 ) {
      return true;
    } else {
      return false;
    }
  },
  isBillingCard: function(state){
    var instance = Template.instance();
    if (instance.data == "billing-card") {
      return true;
    } else {
      // Assume that we're on the resubscribe view and hide the fields.
      return false;
    }
  },
  addNewCard: function(){
    let addnewcard = Temp.findOne({'_id': 'addingNewCreditCard'});
    return addnewcard.value;
  }
});

Template.creditCardDetails.helpers({
  isBilling: function(){
    var instance = Template.instance();
    if ( instance.data.search("billing") > -1 ) {
      return true;
    } else {
      return false;
    }
  },
  addNewCard: function(){
    let addnewcard = Temp.findOne({'_id': 'addingNewCreditCard'});
    return addnewcard.value;
  }
});

Template.creditCard.events({
  'click .add-new-card': function(){
    Temp.update({"_id": 'addingNewCreditCard'}, {$set: {"value": true}}, {upsert: true});
  },
  'click .cancel-new-card': function(){
    Temp.update({"_id": 'addingNewCreditCard'}, {$set: {"value": false}}, {upsert: true});
  }
});
