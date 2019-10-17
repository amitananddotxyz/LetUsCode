# Neighborhood Map Project
This is a single page application featuring a map of one's favourite places.

## Features
This project implements Google Map API and uses knockoutJS to handle features subject to changing state. Some more information about the place is retrieved dynamically via call to [Wikipedia API](https://en.wikipedia.org/w/api.php). Several functionality of the application are that each location has associated map markers which identify particular location on the map, a search box helpful in discovering those locations, a list view to support simple browsing of all locations. The application has been made keeping responsive design in mind and it works correctly and smoothly on all devices.
![map][map]
![reponsive][reponsive]

## How to run
   - Clone repository or download the zip file. Extract all files and open index.html. If everything works fine, list of locations and google map will load in browser. All locations will be marked by icons (markers).
    - Click on marker to open a small window showing some information about the place.
    - Click on any location in the list to highlight the corresponding marker on the map which in turns open the small information window.
    ![markers-along-with-information][markers]
    - The search function is also provided by means of search box. You may search for a particular location by typing in search box. The search works by filtering the locations in the list as well as the markers.
    ![search-feature][search]
    - Click on hamburger/menu icon to show or hide the search navigation panel.
    ![navigation-menu-toggle][navigation-menu]

## Attributions
- [Google Maps API](https://developers.google.com/maps/)
- [KnockoutJS](http://knockoutjs.com/)
- [Wikipedia API](https://en.wikipedia.org/w/api.php)
- [Jquery](https://jquery.com/)

[map]: https://github.com/amitananddotxyz/Front-End-Web-Development-Projects/blob/master/Neighborhood-Map/images/1.png "Overall view of the application"
[responsive]: https://github.com/amitananddotxyz/Front-End-Web-Development-Projects/blob/master/Neighborhood-Map/images/4.png "The application is reponsive. This is how it looks on a mobile device."
[[navigation-menu-toggle]: https://github.com/amitananddotxyz/Front-End-Web-Development-Projects/blob/master/Neighborhood-Map/images/5.png "The menu icon is visible at the top-right of screen. Clicking on it toggles the visibility of location search navigation panel."
[markers-along-with-information]: https://github.com/amitananddotxyz/Front-End-Web-Development-Projects/blob/master/Neighborhood-Map/images/2.png "Opening of info window"
[search]: https://github.com/amitananddotxyz/Front-End-Web-Development-Projects/blob/master/Neighborhood-Map/images/3.png "Filtering Location based on search box input"
