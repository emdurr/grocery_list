import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import List from './components/List';
import Lists from './components/Lists';
import ListIngs from './components/ListIngs';
import Menus from './components/Menus';
import NoMatch from './components/NoMatch';


export default (
  <Route>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
    	<Route path='/lists' component={Lists} />
    	<Route path='/lists/:id' component={List} />
    	<Route path='/lists/:id/ingrs' component={ListIngs} />
    	<Route path='/menus' component={Menus} />
    	
    	<Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)

