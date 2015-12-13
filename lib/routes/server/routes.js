if (Meteor.isServer) {
  var gateway;

  Meteor.startup(function () {
    var braintree = Meteor.npmRequire('braintree');
    gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      publicKey: Meteor.settings.public.braintree.BT_PUBLIC_KEY,
      privateKey: Meteor.settings.private.braintree.BT_PRIVATE_KEY,
      merchantId: Meteor.settings.public.braintree.BT_MERCHANT_ID
    });
  });

  var bodyParser = Meteor.npmRequire('body-parser');
  Picker.middleware(bodyParser.json());
  Picker.middleware(bodyParser.urlencoded({extended: false}));

  var POST = Picker.filter(function (request, response) {
      return request.method == 'POST';
  });
  var GET = Picker.filter(function (request, response) {
      return request.method == 'GET';
  });

  GET.route('/webhooks/braintree', function(params, request, response, next) {
    var bt_challenge = "";
    response.statusCode = 200;
    response.end(gateway.webhookNotification.verify(request.query.bt_challenge));
  });

  POST.route('/webhooks/braintree', function(params, request, response, next) {
      var btSignatureParam = request.body.bt_signature;
      var btPayloadParam   = request.body.bt_payload;

      gateway.webhookNotification.parse(
        btSignatureParam,
        btPayloadParam,
        function (err, webhookNotification) {
          console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind + " | Subscription: " + webhookNotification.subscription.id);

          switch(webhookNotification.kind){
            case "subscription_canceled":
              // TODO: Function below needs testing.
              // btUpdateSubscription(webhookNotification.subscription);

              // Send HTTP 200 status code to let Braintree know
              // that we received webhook notification
              response.statusCode = 200;
              response.end("Hi Braintree!");
              break;
            case "subscription_charged_successfully":
              btCreateInvoice(webhookNotification.subscription);

              // Send HTTP 200 status code to let Braintree know
              // that we received webhook notification
              response.statusCode = 200;
              response.end("Hi Braintree!");
              break;
          }
        }
      );
      response.statusCode = 200;
      response.end("Hi Braintree!");
  });
}
