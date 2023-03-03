export const initialState = {
    loading: false,
    questions: [],
    errorMessage: null,
}

export const reducer = (state, action) => {
    switch(action.type){
        case "QUESTIONS_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "QUESTIONS_SUCCESS":
        return {
          ...state,
          loading: false,
          questions: action.payload
        };
      case "QUESTIONS_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;

    }
}