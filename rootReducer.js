import { combineReducers } from 'redux';

const entityReducer = combineReducers({
  markupElements: (state = {}) => state,
  pages: (state = {}) => state,
  documents: (state = {}) => state,
  stamps: (state = {}) => state,
  project: (state = {}) => state,
  item: (state = {}) => state
});

export default combineReducers({
  entities: entityReducer,
  ui: (state = {}) => state,
  viewer: (state = {}) => state,
  permissions: (state = {}) => state,
  meta: (state = {}) => state
});
