import React, { Component } from 'react';
import { geoAlbers, geoPath } from 'd3-geo';
import { fetchJSON, nextBusApi } from './utilities.js';
import BaseMap from './BaseMap.js';
import Vehicles from './Vehicles.js';

const size = 900,
  interval = 15000;

class RoutesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streets: {},
      neighborhoods: [],
      vehicles: []
    };
    this.projection = () => {};
    this.pathGenerator = () => {};
    this.processVehicleResponse = this.processVehicleResponse.bind(this);
  }
  componentDidMount() {
    const getNeighborhoods = fetchJSON('/map-data/neighborhoods.json'),
      getStreets = fetchJSON('/map-data/streets.json'),
      getVehicles = nextBusApi.get('command=vehicleLocations&t=0');

    Promise.all([
      getNeighborhoods,
      getStreets,
      getVehicles
    ]).then(([allNeighborhoods, streets, allVehicles]) => {
      // generate d3 projection
      this.projection = geoAlbers().fitSize([size, size], allNeighborhoods);
      this.pathGenerator = geoPath().projection(this.projection);
      // Add maps to state
      this.setState({
        streets,
        neighborhoods: allNeighborhoods.features
      });
      // initial vehicle locations

      this.processVehicleResponse(allVehicles);
      this.intervalID = setInterval(() => {
        nextBusApi
          .get(`command=vehicleLocations&t=${Date.now() - interval}`)
          .then(response => {
            this.processVehicleResponse(response);
          });
      }, interval);
    });
  }
  render() {
    return (
      <svg viewBox={`0 0 ${size} ${size}`}>
        <BaseMap
          streets={this.state.streets}
          neighborhoods={this.state.neighborhoods}
          pathGenerator={this.pathGenerator}
        />
        <Vehicles
          vehicles={this.state.vehicles.filter(
            vehicle =>
              this.props.selectedRoutes.indexOf(vehicle.routeTag) !== -1
          )}
          routeColors={this.props.routes.reduce((allColors, route) => ({
            ...allColors,
            [route.tag]: `#${route.color}`
          }), {})}
        />
      </svg>
    );
  }
  processVehicleResponse(response) {
    let uniqueVehicles = response.vehicle.map(vehicle => ({
      ...vehicle,
      projection: this.projection([
        parseFloat(vehicle.lon),
        parseFloat(vehicle.lat)
      ])
    }));
    this.setState(prevState => {
      return {
        vehicles: uniqueVehicles.reduce(
          (vehicles, vehicle1) => {
            let vehicleIndex = vehicles.findIndex(
              vehicle2 => vehicle1.id === vehicle2.id
            );
            if (vehicleIndex === -1) {
              vehicles.push(vehicle1);
            } else {
              vehicles[vehicleIndex] = vehicle1;
            }
            return vehicles;
          },
          [...prevState.vehicles]
        )
      };
    });
  }
}
export default RoutesMap;
