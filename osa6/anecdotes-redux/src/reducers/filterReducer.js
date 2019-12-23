const initialstate = {
  filter: ''
}
const filterReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'FILTER':
      const toFilterThrough = {
        filter: action.filter.toLowerCase()
      }
      return toFilterThrough
    default:
      return state
  }
}

export const filter = filter => {
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer
