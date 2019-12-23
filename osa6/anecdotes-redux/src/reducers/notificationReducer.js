const initialState = {
  notify: 0,
  message: ''
}
const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        message: action.message,
        notify: action.notify
      }
    default:
      return state
  }
}

export const showNotification = (message, notify) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      message
    })
  }
}

export default notifyReducer
