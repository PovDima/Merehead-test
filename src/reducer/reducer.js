const initialState = {
  users: [],
  currentPage: 1,
  userPerPage: 5,
  isLoad: true
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case 'INIT_PAGE':
      return {
        ...state,
        users: action.payload.users,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoad: action.isLoad
      };
    default:
      return state
  }
}

export default reducer