export const initialState = {
    data: [
        {
          id: 12,
          index:0,
          candidateItemData: {
            response: null
          }
        },
        {
          id: 23,
          index: 1,
          candidateItemData: {
            response: null
          }
        }
      ],
      currentItem: {},
      submitDisabled: false,
      loading: false
}

const AppReducer = (state = initialState, action= {}) => {
  console.log(state)
    switch(action.type) {
        case "UPDATE_CURRENT_DATA":
          console.log(action.payload)
            return {...state, currentItem: action.payload}
        case "UPDATE_DATA":
            return {...state, data: action.payload}
          case "DISABLE_SUBMIT":
            return {...state, submitDisabled: action.payload}
        case "IS_LOADING":
          return {...state, loading: action.payload}
        default:
            return {...state}
    }
}
 
export default AppReducer;