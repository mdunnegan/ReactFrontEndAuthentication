import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Create from './components/create';
import Music from './components/music';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import '../style/main.css';

import RequireAuth from './components/auth/requireAuth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// we extracted createStoreWithMiddleware(reducers) from the Provider, 
// so we could make a store check (and potential update) before rendering the App
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if (token) {
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
    	<Route path='/' component={App}> // App is always shown, so we put the header there
    		<IndexRoute component={Welcome} />
    		<Route path='signin' component={Signin} />
    		<Route path='signup' component={Signup} />
    		<Route path='signout' component={Signout} />
    		<Route path='create' component={RequireAuth(Create)} />
        <Route path='music' component={RequireAuth(Music)} />
    	</Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
