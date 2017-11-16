import React, { Component } from 'react';
import './App.css';
import RoutesFilter from './map/RoutesFilter.js';
import RoutesSelect from './map/RoutesSelect.js';
import RoutesMap from './map/RoutesMap.js';
import { nextBusApi } from './map/utilities.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      routes: []
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.routeSelection = this.routeSelection.bind(this);
  }
  render() {
    const filteredRoutes = App.filterRoutes(
      this.state.routes,
      this.state.filter
    );
    return (
      <div className='app'>
        <form className='routes-form'>
          <RoutesFilter
            changeFilter={this.changeFilter}
            filter={this.state.filter}
          />
          <RoutesSelect
            routeSelection={this.routeSelection}
            routes={filteredRoutes}
          />
        </form>
        <div className='routes-map'>
          <RoutesMap
            routes={this.state.routes}
            selectedRoutes={filteredRoutes.reduce(
              (allRoutes, route) =>
                route.checked ? [...allRoutes, route.tag] : allRoutes,
              []
            )}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    // Get routes
    nextBusApi.get(`command=routeConfig`).then(r => {
      this.setState({
        routes: r.route.map((route, index) => ({
          ...route,
          checked: false,
          index
        }))
      });
    });
  }
  routeSelection(e) {
    const index = e.target.value,
      val = e.target.checked,
      routes = [...this.state.routes];

    routes[index].checked = val;

    this.setState({ routes });
  }
  changeFilter(e) {
    this.setState(prevState => ({
      filter: e.target.value
    }));
  }
  static filterRoutes(routes, filter) {
    return filter.length < 1
      ? routes
      : routes.filter(route =>
          route.title.toLowerCase().includes(filter.toLowerCase())
        );
  }
}

export default App;
