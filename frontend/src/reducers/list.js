import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS,
  CREATE_ITEM,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE,
  RESET_NEW_ITEM
} from '../types';

const initialState = {
  name: '',
  items: [],
  loading: false,
  newItem: { item: null, error: null, loading: false }
};

const list = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, loading: true };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        name: action.name,
        items: action.items
      };
    case CREATE_ITEM:
      return {
        ...state,
        newItem: { error: null, item: null, loading: true }
      };
    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        newItem: { item: action.item, error: null, loading: false }
      };
    case CREATE_ITEM_FAILURE:
      return {
        ...state,
        newItem: {
          item: null,
          loading: false,
          error: action.error.message
        }
      };
    case RESET_NEW_ITEM:
      return {
        ...state,
        newItem: {
          item: null,
          loading: false,
          error: null
        }
      };
    default:
      return state;
  }
};

export default list;
