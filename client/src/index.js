import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { startLoginOnAppStartup } from './actions/auth';
import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import AppRouter from './routes/AppRouter';

// create store with middleware
const store = applyMiddleware(thunk)(createStore)(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// TODO: Make use of a single Modal everywhere -> dashboard page remaining (Calendar modal & Notes Modal)
// TODO: add PropTypes everywhere!
// TODO: Connection checking and timeout for fetching, etc.

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

(() => {
  store.dispatch(startLoginOnAppStartup());
})();
