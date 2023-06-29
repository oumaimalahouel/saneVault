export default (state = {}, action) => {
    switch (action.type) {
     case 'SELECTED_ITEM':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }