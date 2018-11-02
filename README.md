# San Francisco Transportation by Alfredo Bermúdez

San Francisco Transportation project for ThousandEyes

__Built with__
- [React.js](https://reactjs.org/)
- [D3.js](https://d3js.org/)

## Design Decisions & Project Issues

The most important design decision is that all the DOM manipulation and map rendering is done using React and not D3. D3 is used to parse GeoJSON data, project coordinates and create path data for the map. React renders the final map using SVG instead of Canvas. This was done to facilitate interactions like hovers and clicks with the elements in the map. At the moment their are no interactions but it would be useful in the future.

Using SVG instead of Canvas raises a possible Even though in my environment is not a big performance hit I haven't had the time to test it in different devices. If it does causes trouble the map rendering should be done in Canvas which would require changing my original approach.

Last thing, I didn't have time to comment the code correctly or make tests. Sorry.

## Getting Started

### Prerequisites

Node.js and npm are required to run the project. The versions tested are Node.js 9.0.0 and npm 5.5.1.

### Install and run

1. Download repository.
2. `npm install` - Install project dependencies.
3. `npm run start` - Starts server on port 3000. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
