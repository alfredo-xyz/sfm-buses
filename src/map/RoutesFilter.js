import React from 'react'
import DebounceInput from 'react-debounce-input'

const Routes = ({ changeFilter, filter }) => (
  <label>
    Filter Routes
    <DebounceInput
      minLength={0}
      debounceTimeout={300}
      type="text"
      onChange={changeFilter}
      value={filter}
    />
  </label>
)

export default Routes
