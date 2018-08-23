import React, { Component } from "react";
import Places from "./Places";

class LocList extends Component {


// * Constructor

  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      query: "",
      suggestions: true
    };

    this.filterLocations = this.filterLocations.bind(this);
  }

  // * Filter locations based on user query
  filterLocations(event) {
    this.props.closeInfoWindow();
    const { value } = event.target;
    var locations = [];
    this.props.alllocations.forEach(function(location) {
      if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.alllocations
    });
  }

  // * Render function of LocationList
  render() {
    var locationlist = this.state.locations.map(function(listItem, index) {
      return (
        <Places
          key={index}
          openInfoWindow={this.props.openInfoWindow.bind(this)}
          data={listItem}
        />
      );
    }, this);

    return (
      <div>
      <div className="search-area">
      <input
        role="search"
        aria-label="filter"
        id="search-field"
        className="search-input"
        type="text"
        placeholder="Filter"
        value={this.state.query}
        onChange={this.filterLocations}
      />
      <ul className="location-list" aria-label="Location List">
        {this.state.suggestions && locationlist}
      </ul>
    </div>
    <div className="App-header">
        <header aria-label="App-header">
          <h1 className="title"> Taverns & Bars in Vironas, Greece </h1>
    </header>
    </div>
    <footer
          className="Footer"
          aria-label="footer credits"
          >
          <span> Ioannis Dimitriou | Udacity P8 project</span>
        </footer>
    </div>
    );
  }
}

export default LocList;