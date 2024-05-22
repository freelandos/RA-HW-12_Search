import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  search: "",
  items: [],
  loading: false,
  error: null,
};

export default function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return { ...state, search: action.payload.search };
    case SEARCH_SKILLS_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_SKILLS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case SEARCH_SKILLS_SUCCESS:
      return { ...state, items: action.payload.items, loading: false, error: null };
    default:
      return state;
  }
}
