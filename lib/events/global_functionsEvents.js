if (Meteor.isClient) {

  function catChoice(elem) {
    var search = $("." + elem).text();
    console.log(search);
    ListingSearch.search(search);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
  }

  function ipLocate() {

    HTTP.get("http://ipinfo.io", function(error, result) {
      var place = JSON.parse(result.content);
      // console.log(place);
      var city = place.city;
      var state = place.region;
      console.log(city, state);
    });

  }

  // Custom Functions
  // Add 'user_birthday' after facebook has reviewed app
  function fbLogin() {
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email', 'user_location']
    }, function(err) {
      if (err)
      // redirect to register if popup comes and user isn't on register
        Session.set('errorMessage', err.reason || 'Unknown Eror');
      console.log(Session.get('errorMessage'));
    });
  }

  function instLogin() {
    Meteor.loginWithInstagram(function(err, res) {
      if (err !== undefined) {
        console.log('success ' + res)
      } else {
        console.log('login failed ' + err)
      }
    });
  }

  function btnSearch() {
    search = $("#search").val();
    var options = {
      search: search
    }
    ListingSearch.search(search);
  }

  function navSearch() {
    search = $("#headerNavSearch").val();
    var options = {
      search: search
    }
    ListingSearch.search(search);
  }

}