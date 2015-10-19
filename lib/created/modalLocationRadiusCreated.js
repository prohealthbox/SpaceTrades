if (Meteor.isClient) {
	Template.ModalLocationRadius.onCreated(function() {
		GoogleMaps.ready('locationRadiusMap', function(map) {
			var markers = [];
			var input = $("#pac-input")[0];
			var searchBox = new google.maps.places.SearchBox((input));
			var instance = GoogleMaps.maps.addListingImage.instance;
			// instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

			google.maps.event.addListener(searchBox, 'places_changed', function(m) {

				var places = searchBox.getPlaces();
				if (places.length == 0) {
					return;
				}
				for (var i = 0, marker; marker = markers[i]; i++) {
					marker.setMap(null);
					areaCircle.setMap(null);
				}

				// TASK - Remove remaining circles

				// For each place, get the icon, place name, and location.
				markers = [];
				// var bounds = new google.maps.LatLngBounds();
				for (var i = 0, place; place = places[i]; i++) {
					var image = {
						url: place.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25)
					};

					// Create a marker for each place.
					var marker = new google.maps.Marker({
						map: map.instance,
						icon: image,
						title: place.name,
						position: place.geometry.location,
						animation: google.maps.Animation.DROP
					});

					markers.push(marker);

					var areaCircle = new google.maps.Circle({
						map: map.instance,
						center: place.geometry.location,
						zoom: 7,
						radius: 8093.4,
						strokeColor: "#f8504b",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: "#f8504b",
						fillOpacity: 0.4
					});

					var offerlat = marker.getPosition().G;
					var offerlng = marker.getPosition().K;

					Session.set("offerlatlist", offerlat);
					Session.set("offerlnglist", offerlng);

					console.log(offerlat, offerlng);

					var mape = map.instance;
					mape.setCenter(marker.getPosition());

					// bounds.extend(place.geometry.location);
				}

				// map.fitBounds(bounds);
			});

		});
	});
}