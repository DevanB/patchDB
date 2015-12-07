Meteor.methods({
  updateListName(listId, newlistName) {
    check(listId, String);
    check(newlistName, String);

    try {
      let list = Lists.update( {owner: Meteor.userId(), _id: listId}, {$set: {name: newlistName}} );
      return list;
    } catch(exception) {
      return exception;
    }
  },
  updateListType(type, listId) {
    check(type, String);
    check(listId, String);

    let list = Lists.update({ owner: Meteor.userId(), _id: listId}, {$set: {type: type}});
    if (list) return type;
  },
  updateListForTrade(forTrade, listId) {
    check(forTrade, Boolean);
    check(listId, String);

    let list = Lists.update({ owner: Meteor.userId(), _id: listId}, {$set: {forTrade: forTrade}});
    if (list) {
      return forTrade === true ? 'for trade' : 'not for trade';
    }
  },
  updateListItemOrder(items) {
    check(items, [{
      _id: String,
      order: Number
    }]);

    for (let item of items) {
      Lists.update({ "items._id": item._id }, { $set: { "items.$.order": item.order } } );
    }
  }
});
