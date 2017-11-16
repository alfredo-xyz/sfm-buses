import React, { Component } from 'react';

class Vehicles extends Component {
  render() {
    return (
      <g className="vehicle-group">
        {this.props.vehicles.map((vehicle) => (
          <circle
            className="vehicle"
            key={vehicle.id}
            cx="0"
            cy="0"
            r="5"
            fill={this.props.routeColors[vehicle.routeTag]}
            transform={`translate(${vehicle.projection[0]}, ${vehicle
              .projection[1]})`}
          />
        ))}
      </g>
    );
  }
}

export default Vehicles;
