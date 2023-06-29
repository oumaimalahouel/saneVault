export default (state = [], action) => {
    switch (action.type) {
     case 'HIERARCHY':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }