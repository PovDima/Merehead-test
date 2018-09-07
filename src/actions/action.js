export  function nextPage(response) {
  return {
    type: 'NEXT_PAGE',
    currentPage: response,
  }
}
export function initPage(response) {
    return {
        type:'INIT_PAGE',
        payload: response.data
    };
}
export function isLoading(response) {
  return {
      type:'IS_LOADING',
      isLoad:response
  };
}