import React from 'react'

const RouteSelect = ({routes, routeSelection}) => 
  <fieldset className="routes-group-select">
    <legend>Routes</legend>
    {routes.map((route) => (
      <label 
        key={route.tag} 
        className='route-select'
        style={{borderLeftColor: `#${route.color}`}}>
        <input 
          type='checkbox'
          checked={route.checked}
          onChange={routeSelection}
          value={route.index} />
        {route.title}
      </label>
    ))}
  </fieldset>

export default RouteSelect
