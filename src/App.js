import React, { Component } from "react";
import LocList from "./LocList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alllocations: require("./bars.json"),
      map: "",
      infowindow: "",
      prevmarker: ""
    };

    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5bWcrbAiqpEi3q3GVgbkOYN3E8vQHKzQ&callback=initMap"
    );
  }

  initMap() {
    var self = this;

    var mapview = document.getElementById("map");
    mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: 37.956735, lng: 23.762951 },
      zoom: 15,
      mapTypeControl: true
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    var alllocations = [];
    this.state.alllocations.forEach(function(location) {
      var longname = location.name + " - " + location.type;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener("click", function() {
        self.openInfoWindow(marker);
      });

      location.longname = longname;
      location.marker = marker;
      location.display = true;
      alllocations.push(location);
    });
    this.setState({
      alllocations: alllocations
    });
  }

  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: marker
    });
    this.state.infowindow.setContent("Loading data..");
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);
  }

   // Foursquare api

  getMarkerInfo(marker) {
    var self = this;

    var clientId = "ITRSCD0ZDJADZGM0BD5MZRPA4ZTQTR2VKHWDDSPZWX0K42BG";
    var clientSecret = "S2N4OUJZRLP1FDEMNYLK4BEZPR1FJW4CHCGHTFMMDRFHP10U";

    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20171221&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1";
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          self.state.infowindow.setContent("Sorry data cannot be loaded");
          return;
        }

        response.json().then(function(data) {
          console.log(data);

          var location_data = data.response.venues[0];
          var place = `<h3>${location_data.name}</h3>`;
          var street = `<p>${location_data.location.formattedAddress[0]}</p>`;
          var contact = "";
          if (location_data.contact.phone)
            contact = `<p><small>${location_data.contact.phone}</small></p>`;
          var checkinsCount =
            "<b>Number of CheckIn: </b>" +
            location_data.stats.checkinsCount +
            "<br>";
          var readMore =
            '<a href="https://foursquare.com/v/' +
            location_data.id +
            '" target="_blank">Read More on <b>Foursquare Website</b></a>';
          self.state.infowindow.setContent(
            place + street + contact + checkinsCount + readMore
          );
        });
      })
      .catch(function(err) {
        self.state.infowindow.setContent("Sorry data cannot be loaded");
      });
    }

  closeInfoWindow() {
    if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
    }
    this.setState({
      prevmarker: ""
    });
    this.state.infowindow.close();
  }

  render() {
    return (
      <div>
        <LocList
          key="100"
          alllocations={this.state.alllocations}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
        />
        <div id="map" />
      </div>
    );
  }
}

export default App;

function loadMapJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Google Maps cannot be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}