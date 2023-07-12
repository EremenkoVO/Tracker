import {combineReducers, createStore} from 'redux';

const initialState = {
  trackersName: '',
  trackers: [],
};

const rootReduces = combineReducers({
  trackers: (state = initialState, action) => {
    switch (action.type) {
      case ADD_TRACK: {
        return {
          ...state,
          trackers: state.trackers.concat({
            value: action.payload,
          }),
        };
      }
    }
  },
});

const configureStore = () => {
  return createStore(rootReduces);
};

export default configureStore;
