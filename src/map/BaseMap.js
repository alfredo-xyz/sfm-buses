import React, { Component } from 'react';
import { Color } from './utilities.js';

const color1 = 'dddddd',
  color2 = '999999';

class BaseMap extends Component {
  render() {
    return (
      <g className="base-map">
        <g className="neighborhoods-group">
          {this.props.neighborhoods.map((n, index) => (
            <path
              key={index}
              fill={Color.mix(
                color1,
                color2,
                (index + 1) / this.props.neighborhoods.length * 100
              ).toHex()}
              stroke={Color.mix(
                color1,
                color2,
                (this.props.neighborhoods.length - index - 1) /
                  this.props.neighborhoods.length *
                  100
              ).toHex()}
              d={this.props.pathGenerator(n)}
            />
          ))}
        </g>
        <path
          className="streets"
          fill="none"
          stroke="rgba(20, 20, 20, 0.8)"
          d={this.props.pathGenerator(this.props.streets)}
        />
      </g>
    );
  }
}

export default BaseMap;
