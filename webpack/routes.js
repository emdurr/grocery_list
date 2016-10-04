import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Lists from './components/Lists';
import List from './components/List';
import ListIngs from './components/ListIngs';
import ListIng from './components/ListIng';
import Login from './components/auth/Login';
import Menu from './components/Menu';
import Menus from './components/Menus';
import NewRecipe from './components/NewRecipe';
import Pantry from './components/Pantry';
import Recipe from './components/Recipe';
import EditRecipe from './components/EditRecipe';
import EditPantryIngredient from './components/EditPantryIngredient';
import Recipes from './components/Recipes';
import RecipeSearch from './components/RecipeSearch'
import Signup from './components/auth/Signup';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { handleLogout } from './components/auth/actions';
import NoMatch from './components/NoMatch';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: history.push,
  wrapperDisplayName: 'UserIsAuthenticated'
});


export default (
  <Route>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
      <Route path='signup' component={Signup} />
      <Route path='login' component={Login} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
    	<Route path='/lists' component={Lists} />
    	<Route path='/lists/:id' component={List} />
    	<Route path='/lists/:id/ingrs' component={ListIngs} />
      <Route path='/list_ings/:id' component={ListIng} />
      <Route path='/recipes/new' component={NewRecipe} />
      <Route path='/pantry' component={Pantry} />
      <Route path='/pantry_ingredients/:id/edit' component={EditPantryIngredient} />
      <Route path='/recipes' component={Recipes} />
      <Route path='/recipes/:id' component={Recipe} />
      <Route path='/recipes/:id/edit' component={EditRecipe} />
    	<Route path='/menus' component={Menus} />
      <Route path='/menus/:id' component={Menu} />
    	<Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)
