var map;

// Lists a few peaks of 'The Himalyas' mountain range with their name and coordinates.
// Normally, these data passed to the application are stored in database instead.
var locations = [
    {
        title: "Mount Everest",
        position: {lat: 27.5917, lng: 86.5311},
        info: {
            otherNames: "Sagarmatha, Chomolungma",
            elevation: "8,848 m",
            coordinates: "27°59′17″N 86°55′31″E"
        }
    },{
        title: "Kangchenjunga",
        position: {lat: 27.4212, lng: 88.0851},
        info: {
            otherNames: "Five treasures of great snow",
            elevation: "8,586 m",
            coordinates: "27°42′12″N 88°08′51″E"
        }
    },{
        title: "Manaslu",
        position: {lat: 28.3300, lng: 84.3335},
        info: {
            otherNames: "Kutang, Mountain of the Spirit",
            elevation: "8,163 m",
            coordinates: "28°33′00″N 84°33′35″E"
        }
    },{
        title: "Annapurna I",
        position: {lat: 28.3544, lng: 84.4913},
        info: {
            otherNames: "Goddess of the Harvests",
            elevation: "8,091 m",
            coordinates: "28°35′44″N 83°49′13″E"
        }
    },{
        title: "Dhaulagiri I",
        position: {lat: 28.4148, lng: 83.2935},
        info: {
            otherNames: "White Mountain",
            elevation: "8,167 m",
            coordinates: "28°41′48″N 83°29′35″E"
        }
    },{
        title: "Cho Oyu",
        position: {lat: 28.0539, lng: 86.3939},
        info: {
            otherNames: "Turquoise Goddess",
            elevation: "8,188 m",
            coordinates: "28°05′39″N 86°39′39″E"
        }
    },{
        title: "Makalu",
        position: {lat: 27.5323, lng: 87.0520},
        info: {
            otherNames: "The Great Black",
            elevation: "8,485 m",
            coordinates: "27°53′23″N 87°05′20″E"
        }
    },{
        title: "Nanda Devi",
        position: {lat: 30.2233, lng: 79.5815},
        info: {
            otherNames: "Bliss-giving Goddess",
            elevation: "7,186 m",
            coordinates: "30°22′33″N 79°58′15″E"
        }
    },{
        title: "Machapuchare",
        position: {lat: 28.2942, lng: 83.5657},
        info: {
            otherNames: "Bliss-giving Goddess",
            elevation: "7,186 m",
            coordinates: "30°22′33″N 79°58′15″E"
        }
    },{
        title: "Gangkhar Puensum",
        position: {lat: 28.0520, lng: 90.2719},
        info: {
            otherNames: "Three Mountain Siblings",
            elevation: "7,570 m",
            coordinates: "28°02′50″N 90°27′19″E"
        }
    },{
        title: "Mount Kailash",
        position: {lat: 31.40, lng: 81.1845},
        info: {
            otherNames: "Kang Rinpoche (Precious Snow Peak)",
            elevation: "6,638 m",
            coordinates: "31°4′0″N 81°18′45″E"
        }
    },{
        title: "Ama Dablam",
        position: {lat: 27.5140, lng: 86.5140},
        info: {
            otherNames: "Mother And Her Necklace",
            elevation: "6,814 m",
            coordinates: "27°51′40″N 86°51′40″E"
        }
    }
];

// Error handling in case expected result is not returned by google map API
function mapLoadError() {
    alert("Sorry! Something went wrong. This page didn't load Google Maps correctly.");
}

// Ajax call to get information regarding location title from wikipedia.
function getWikiData(query, infoWindow, initialContent) {
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search="+query,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp"
    }).done(function(data_success) {
            // Append information to the initial content of infowindow after the wiki api
            // successfully returns data. Note: initialContent is used in place of infoWindow.getContent()
            // as multiple successive clicks will set the content of infowindow with redundant data.
            infoWindow.setContent(initialContent + "<div> <b>Wikipedia: </b>" + data_success[2][0] + "<a href=\"" + data_success[3][0] + "\">..Go to Wikipedia page</a></div>");
    }).fail(function(data_error) {
            alert("Error fetching wikipedia information");
    });
}

// Populate the infoWindow when the marker is clicked.
function populateInfoWindow(marker, infoWindow) {
    var contentString = "<div>" + "<span style=\"color: green; font-size: 14px; font-weight: bold\">" + marker.title + "</span>" + (marker.customInfo ? "<br>" + (marker.customInfo.otherNames ? ("<br><b>Other Names: </b>" + marker.customInfo.otherNames) : "") + (marker.customInfo.elevation ? ("<br><b>Elevation: </b>" + marker.customInfo.elevation) : "") + (marker.customInfo.coordinates ? ("<br><b>Coordinates: </b>" + marker.customInfo.coordinates) : "") : "") + "</div>";
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
    infoWindow.addListener("closeclick", function() {
        infoWindow.marker = null;
    });

    // Get wikipedia information about the place or location via API call.
    getWikiData(marker.title, infoWindow, contentString);
}

//Clicking on marker toggles the animation between a BOUNCE animation and no animation
function toggleBounce(marker) {
    if(marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    setTimeout(function() {
        marker.setAnimation(null);
    }, 1000);
}

// Callback function to initialize map
function initMap() {
    // There are two required options for every map: center and zoom.
    var mapOptions = {
          center: {lat: 28.3949, lng: 84.1240},
          zoom: 6
    };

    // Constructor 'Map' creates a new map inside of the given HTML container — DIV element.
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    ko.applyBindings(new ViewModel());
}

// View Model
var ViewModel = function() {
    var self = this;

    // The InfoWindow in which to render text information when a marker is clicked.
    self.locationInfoWindow = new google.maps.InfoWindow({maxWidth: 300});

    // Bounds used to bias results when searching for Places.
    // self.bounds = new google.maps.LatLngBounds();

    // A marker identifies a location on a map.
    // Create marker as property of location.
    locations.forEach(function(location) {
        location.marker = new google.maps.Marker({
            map: map,
            title: location.title,
            position: new google.maps.LatLng(location.position),
            animation: google.maps.Animation.DROP,
            customInfo: location.info,
            draggable: false
        });

        // Extends this bounds to contain the given point.
        // self.bounds.extend(marker.position);

        // Create an onClick event to open an infoWindow on clicking any marker.
        location.marker.addListener("click", function() {
            populateInfoWindow(this, self.locationInfoWindow);
            toggleBounce(this);
        });
    });

    // map.fitBounds(bounds);

    self.locationList = ko.observableArray(locations);

    self.searchQuery = ko.observable("");

    self.filteredItems = ko.computed(function() {
        // Close any opened infowindow.
        self.locationInfoWindow.close();
        var filter = self.searchQuery().toLowerCase();
        // Return all locations when search query is empty
        if (!filter) {
            self.locationList().forEach(function(location) {
                location.marker.setVisible(true);
            });
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(location) {
                // Check if current location should be returned as part of query result.
                var isFiltered = location.title ? location.title.toLowerCase().indexOf(filter) > -1 : false;
                location.marker.setVisible(isFiltered);
                return isFiltered;
            });
        }
    }, self);

    self.setCurrentLocation = function(location) {
        google.maps.event.trigger(location.marker, "click");
    };

    self.showSearchPanel = ko.observable(true);

    // Toggle search panel visibility on click of menu icon
    self.toggleSearchPanel = function() {
        self.showSearchPanel(!self.showSearchPanel());
    };

    // Adjust the center of map on resizing the window or container of map.
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
};