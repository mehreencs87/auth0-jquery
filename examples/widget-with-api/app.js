$(document).ready(function() {
    var widget = new Auth0Widget({
        // All this properties are set on auth0-variables.js
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        callbackURL: AUTH0_CALLBACK_URL,
        callbackOnLocationHash: true
    });

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      widget.signin({ popup: true} , null, function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback

          // Save the JWT token.
          localStorage.setItem('userToken', token);

          // Save the profile
          userProfile = profile;

          $('.login-box').hide();
          $('.logged-in-box').show();
          $('.nickname').text(profile.nickname);
        }
      });
    });

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });

    $('.btn-api').click(function(e) {
        // Just call your API here. The header will be sent
    })


});