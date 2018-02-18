import { FETCH_ITEMS, CREATE_ITEM, RESET_NEW_ITEM } from '../types';

export const fetchItems = listName => ({ type: FETCH_ITEMS, listName });
export const createItem = (item, listName) => ({
  type: CREATE_ITEM,
  item,
  listName
});
export const resetNewItem = () => ({ type: RESET_NEW_ITEM });
