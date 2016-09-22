import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Lists from './components/Lists';
import List from './components/List';
import NoMatch from './components/NoMatch';

export default (
  <Route>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
    	<Route path="/users/sign_up" component={SignUp} />
    	<Route path='/lists' component={Lists} />
    	<Route path='/lists/:id' component={List} />
    	<Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)

