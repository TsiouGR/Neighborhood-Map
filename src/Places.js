import React from "react";

class Places extends React.Component {
  
  render() {
    return (
      <li
        role="button"
        className="places"
        tabIndex="0"
        onKeyPress={this.props.openInfoWindow.bind(
          this,
          this.props.data.marker
        )}
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
      >
        {this.props.data.longname}
      </li>
    );
  }
}

export default Places;